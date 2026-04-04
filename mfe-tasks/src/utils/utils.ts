import type { ITaskModule } from "../types/ITask";
import { VALID_STATUSES } from "common_remote/constants";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const isTaskOverdue = (task: ITaskModule.ITask): boolean => {
  if (task.status === VALID_STATUSES.completed) {
    return false;
  }

  const dueDate = new Date(task.dueDate);
  const now = new Date();

  return dueDate.getTime() < now.getTime();
};
