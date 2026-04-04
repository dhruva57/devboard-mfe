import type { ITaskModule } from "../types/ITask";
import { formatDate, isTaskOverdue } from "../utils/utils";
import { PriorityBadge } from "./PriorityBadge";

export const TaskCard = ({
  task,
  onToggleStatus,
  onDelete,
  isProcessing = false,
}: ITaskModule.ITaskCardProps) => {
  const overdue = isTaskOverdue(task);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-lg font-semibold ${
                task.status === "completed"
                  ? "text-gray-500 line-through"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            <PriorityBadge priority={task.priority} />

            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                task.status === "completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status}
            </span>

            {overdue && (
              <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Overdue
              </span>
            )}
          </div>

          {task.description && (
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {task.description}
            </p>
          )}

          <p className="mt-3 text-sm text-gray-500">
            Due:{" "}
            <span className="font-medium text-gray-700">
              {formatDate(task.dueDate)}
            </span>
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onToggleStatus(task._id)}
            disabled={isProcessing}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {task.status === "pending" ? "Mark Complete" : "Mark Pending"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(task._id)}
            disabled={isProcessing}
            className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};
