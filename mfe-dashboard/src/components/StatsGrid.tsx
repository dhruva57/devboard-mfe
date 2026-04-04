import type { IDashboard } from "../types/IDashboard";
import { StatsCard } from "./StatsCard";

export const StatsGrid = ({ stats }: IDashboard.IStatsGridProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        label="Total Tasks"
        value={stats.total}
        helperText="All tasks in the system"
      />
      <StatsCard
        label="Completed"
        value={stats.completed}
        helperText="Tasks marked as done"
      />
      <StatsCard
        label="Pending"
        value={stats.pending}
        helperText="Tasks still in progress"
      />
      <StatsCard
        label="Overdue"
        value={stats.overdue}
        helperText="Past due and incomplete"
      />
    </div>
  );
};
