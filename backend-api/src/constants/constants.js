const VALID_STATUSES = {
  pending: "pending",
  completed: "completed",
};
const VALID_STATUSES_LIST = Object.values(VALID_STATUSES);

const PRIORITIES = {
  low: "low",
  medium: "medium",
  high: "high",
};
const PRIORITY_LIST = Object.values(PRIORITIES);

module.exports = {
  VALID_STATUSES,
  VALID_STATUSES_LIST,
  PRIORITIES,
  PRIORITY_LIST,
};
