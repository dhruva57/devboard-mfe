const { VALID_STATUSES } = require("../constants/constants");
const Task = require("../models/Task");
const { isValidStatus, isValidPriority } = require("../utils/utils");

const getTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      if (!isValidStatus(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status filter.",
        });
      }
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    if (!dueDate) {
      return res.status(400).json({
        success: false,
        message: "Due date is required.",
      });
    }

    const parsedDueDate = new Date(dueDate);
    if (Number.isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Due date must be a valid date.",
      });
    }

    if (priority && !isValidPriority(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority.",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      priority: priority,
      dueDate: parsedDueDate,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, status } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty.",
      });
    }

    if (priority !== undefined && !isValidPriority(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority. Use low, medium, or high.",
      });
    }

    if (status !== undefined && !isValidStatus(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use pending or completed.",
      });
    }

    if (dueDate !== undefined) {
      const parsedDueDate = new Date(dueDate);
      if (Number.isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Due date must be a valid date.",
        });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(description !== undefined
          ? { description: description.trim() }
          : {}),
        ...(priority !== undefined ? { priority } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(dueDate !== undefined ? { dueDate: new Date(dueDate) } : {}),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const toggleTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    task.status =
      task.status === VALID_STATUSES.pending
        ? VALID_STATUSES.completed
        : VALID_STATUSES.pending;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getTaskStats = async (req, res, next) => {
  try {
    const now = new Date();

    const [total, completed, pending, overdue] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: "completed" }),
      Task.countDocuments({ status: "pending" }),
      Task.countDocuments({
        status: "pending",
        dueDate: { $lt: now },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        pending,
        overdue,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  getTaskStats,
  getTask,
};
