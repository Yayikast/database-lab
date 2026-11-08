const pool = require('../db');

// GET /customers/:id/orders
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

const isPosInt = (v) => Number.isInteger(v) && v > 0;

// ---------------------------------------------------------------------
// POST /customers/:id/orders        body: { "book_id": 1, "quantity": 2 }
//
// This is the Lab 9 transactional order: Node reduces the stock itself
// (guarded UPDATE) and then inserts the order. It works today.
//
// But after Q3 your AFTER INSERT trigger ALSO reduces the stock, so one
// order costs the quantity TWICE - try it and watch the log.
//
// TODO (Q5): keep the 400 validation, then replace the transaction with ONE
// call to your stored procedure:
//     await pool.execute('CALL place_order(?, ?, ?)', [customerId, bookId, quantity]);
// and answer 201. Map the errors:
//     err.sqlState === '45000'          -> 409 with err.sqlMessage ('not enough stock')
//     err.code === 'ER_NO_REFERENCED_ROW_2' -> 404 (no such customer or book)
//     anything else                     -> 500
// ---------------------------------------------------------------------
exports.placeOrder = async (req, res) => {
  const customerId = Number(req.params.id);
  const bookId = Number(req.body.book_id);
  const quantity = Number(req.body.quantity);

  // Validate BEFORE borrowing a connection. A negative quantity would
  // otherwise pass the guard (stock >= -2 is always true) and ADD stock.
  if (!isPosInt(customerId) || !isPosInt(bookId) || !isPosInt(quantity)) {
    return res.status(400).json({
      error: 'customer id, book_id and quantity must be positive integers' });
  }

  try {
    await pool.execute('CALL place_order(?, ?, ?)', [customerId, bookId, quantity]);
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err.sqlState === '45000') {
      return res.status(409).json({ error: err.sqlMessage });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ error: 'customer or book not found' });
    }
    res.status(500).json({ error: err.message });
  }

};

// ---------------------------------------------------------------------
// DELETE /customers/:id/orders/:orderId
//
// The Lab 9 transactional cancel: read the order, delete it, give the
// stock back. After Q4 your AFTER DELETE trigger also gives the stock
// back, so one cancel would return the quantity TWICE.
//
// TODO (Q5): keep the 400 validation and only the DELETE
//     DELETE FROM orders WHERE id = ? AND customer_id = ?
// (no transaction needed - the trigger does the rest). Return 404 when
// affectedRows is 0, otherwise 200.
// ---------------------------------------------------------------------
exports.cancelOrder = async (req, res) => {
  const customerId = Number(req.params.id);
  const orderId = Number(req.params.orderId);
  if (!isPosInt(customerId) || !isPosInt(orderId)) {
    return res.status(400).json({ error: 'ids must be positive integers' });
  }

  try {
    const [r] = await pool.execute(
      'DELETE FROM orders WHERE id = ? AND customer_id = ?',
      [orderId, customerId]);
    if (r.affectedRows === 0) {
      return res.status(404).json({ error: 'order not found' });
    }
    res.json({ ok: true, order_id: orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
