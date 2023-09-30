const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
  try {
    const { id, email } = req.userInfo;
    const todos = await Todo.find({
      $and: [{ userEmail: email }, { userId: id }, { isDeleted: false }],
    });
    return res.status(200).json({ ok: true, todos });
  } catch (err) {
    return res.status(500).json({ message: `Unexpected Error : ${err}` });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Todo id is required" });
    }
    const todo = await Todo.findById(id).exec();
    if (!todo) {
      return res
        .status(400)
        .json({ ok: true, message: "Todo not found", todo });
    }

    return res.status(200).json({ ok: true, todo });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Unexpected err : ${err}` });
  }
};

const addTodo = async (req, res) => {
  try {
    const { id, email } = req.userInfo;
    const { title, description, isChecked, isPinned, labels } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Title, description are required fields",
      });
    }

    if (!id) {
      return res.status(400).json({
        message: "Unauthorized : User id invalid",
      });
    }

    const todoObj = {
      userId: id,
      title,
      description,
      isPinned,
      labels,
      isChecked: !!isChecked,
      userEmail: email,
    };

    const todo = await Todo.create(todoObj);
    if (todo)
      res
        .status(201)
        .json({ ok: true, message: `Todo created successfully`, todo });
    else res.status(400).json({ message: "Invalid data found" });
  } catch (ex) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// To be updated
const updateTodo = async (req, res) => {
  try {
    console.log("updateTodo called");
    const { title, description, id, isPinned, labels } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Todo Id is required" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title, description are required fields" });
    }

    const todo = await Todo.findById(id).exec();

    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    title ? (todo.title = title) : (todo.title = todo.title);
    description
      ? (todo.description = description)
      : (todo.description = todo.description);
    isPinned ? (todo.isPinned = isPinned) : (todo.isPinned = todo.isPinned);
    labels ? (todo.labels = labels) : (todo.labels = todo.labels);
    todo.updatedAt = new Date().toUTCString();
    console.log(todo);
    const newTodo = await todo.save();

    return res
      .status(201)
      .json({ ok: true, message: `Todo updated successfully`, todo: newTodo });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong in updateTodo" });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.json(400).json({ message: "Todo id is required" });

    const todo = await Todo.findById(id).exec();

    if (!todo) return res.json(400).json({ message: "Todo not found" });

    todo.isDeleted = true;
    const deletedTodo = await todo.save();
    return res.status(200).json({
      ok: true,
      message: `Todo deleted successfully`,
      todo: deletedTodo,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong in deleteTodoById" });
  }
};

module.exports = {
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodoById,
  getAllTodos,
};
