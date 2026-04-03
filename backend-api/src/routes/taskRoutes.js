const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  getTaskStats,
  getTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/stats", getTaskStats);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.patch("/:id/status", toggleTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;
