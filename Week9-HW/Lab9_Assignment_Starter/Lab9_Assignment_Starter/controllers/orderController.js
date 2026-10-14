const pool = require('../db');

// GET /customers/:id/orders  (done for you)
exports.listForCustomer = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT o.id AS order_id, b.id AS book_id, b.title, o.quantity
         FROM orders o JOIN books b ON b.id = o.book_id
        WHERE o.customer_id = ? ORDER BY o.id`,
      [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------------------
// Q2 + Q3 + Q4 : Transactional order
// POST /customers/:id/orders        body: { "book_id": 1, "quantity": 2 }
//
// This version works, but it is NOT atomic and NOT safe:
//   * the two statements run on the pool, outside any transaction;
//   * if the INSERT fails, the stock has already been reduced;
//   * nothing checks that enough stock is available.
//
// TODO (Q2): first reject a book_id / quantity that is not a positive whole
//            number with 400. Then:
//            getConnection -> beginTransaction -> UPDATE + INSERT -> commit,
//            rollback in catch, release in finally.   201 on success.
// TODO (Q3): guard the UPDATE with  AND stock >= ?  - if it affects no rows,
//            roll back and return 409 with a clear message.
// TODO (Q4): force the INSERT to fail and show the stock change is undone.
// ---------------------------------------------------------------------
exports.placeOrder = async (req, res) => {
  const customerId = req.params.id;
  const { book_id, quantity } = req.body;
  try {
    await pool.execute('UPDATE books SET stock = stock - ? WHERE id = ?', [quantity, book_id]);
    const [r] = await pool.execute(
      'INSERT INTO orders (customer_id, book_id, quantity) VALUES (?, ?, ?)',
      [customerId, book_id, quantity]);
    res.status(201).json({ ok: true, order_id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------------------
// Q5 : Transactional cancel
// DELETE /customers/:id/orders/:orderId
//
// This version is NOT atomic, and it never gives the stock back.
//
// TODO (Q5): inside ONE transaction
//   1. look up the order's book_id and quantity (it must belong to customer :id)
//   2. if there is no such order -> roll back and return 404
//   3. delete the order
//   4. add the quantity back to the book's stock
//   5. commit and return 200
// ---------------------------------------------------------------------
exports.cancelOrder = async (req, res) => {
  try {
    const [d] = await pool.execute(
      'DELETE FROM orders WHERE id = ? AND customer_id = ?',
      [req.params.orderId, req.params.id]);
    if (d.affectedRows === 0) return res.status(404).json({ error: 'order not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
