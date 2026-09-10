// routes/students.routes.js
const router = require("express").Router();
const c = require("../controllers/students.controller");

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", c.create);
// router.delete("/:id", c.remove);
router.post("/:id", c.remove);

module.exports = router;

// app.js: app.use('/students', studentsRouter);
