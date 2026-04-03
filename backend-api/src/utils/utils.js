const {
  PRIORITY_LIST,
  VALID_STATUSES_LIST,
} = require("../constants/constants");

const isValidStatus = (status) => VALID_STATUSES_LIST.includes(status);

const isValidPriority = (priority) => PRIORITY_LIST.includes(priority);

const validateTaskPayload = (body) => {
  const { title, priority, dueDate, status } = body;
  if (title !== undefined && !title.trim()) {
    return {
      success: false,
      message: "Title cannot be empty.",
    };
  }

  if (priority !== undefined && !isValidPriority(priority)) {
    return {
      success: false,
      message: "Invalid priority. Use low, medium, or high.",
    };
  }

  if (status !== undefined && !isValidStatus(status)) {
    return {
      success: false,
      message: "Invalid status. Use pending or completed.",
    };
  }

  if (dueDate !== undefined) {
    const parsedDueDate = new Date(dueDate);
    if (Number.isNaN(parsedDueDate.getTime())) {
      return {
        success: false,
        message: "Due date must be a valid date.",
      };
    }
  }

  return undefined;
};

module.exports = {
  isValidStatus,
  isValidPriority,
  validateTaskPayload,
};
