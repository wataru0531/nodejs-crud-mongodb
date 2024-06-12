
// tasksのルーティング設計
// ルート設計のためだけに作られたファイル
// → アルゴリズムは、controllersフォルダで管理

const express = require("express");

const router = express.Router();
// 英語で「ルーター」。データを適切な宛先に転送する役割を持つ装置や機能を指す

const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// http://localhost:8000/api/v1/tasks/
router.get("/", getAllTasks)

// POST
router.post("/", createTask);

// 特定のタスクを取得
router.get("/:id", getSingleTask);

// PATCH
router.patch("/:id", updateTask)

// DELETE
router.delete("/:id", deleteTask)

module.exports = router;