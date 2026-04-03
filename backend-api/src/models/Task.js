const mongoose = require("mongoose");
const {
  VALID_STATUSES_LIST,
  PRIORITY_LIST,
} = require("../constants/constants");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: VALID_STATUSES_LIST,
      default: "pending",
    },
    priority: {
      type: String,
      enum: PRIORITY_LIST,
      default: "medium",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

module.exports = mongoose.model("Task", taskSchema);
