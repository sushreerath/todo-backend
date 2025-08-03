const express = require("express");
const {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create todo
router.post("/create", authMiddleware, createTodoController);

// ✅ GET TODO (use GET method here)
router.get("/getAll", authMiddleware, getTodoController);

// Delete TODO
router.delete("/delete/:id", authMiddleware, deleteTodoController);

// Update TODO
router.patch("/update/:id", authMiddleware, updateTodoController);

module.exports = router;
