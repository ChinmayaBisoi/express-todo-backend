const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);
router.get("/all", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.addTodo);
router.patch("/", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodoById);

module.exports = router;
