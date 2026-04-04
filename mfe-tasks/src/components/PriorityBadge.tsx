import type { ITaskModule } from "../types/ITask";

const priorityStyles: Record<ITaskModule.ITaskPriority, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-700",
};

export const PriorityBadge = ({ priority }: ITaskModule.IPriorityBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
};
