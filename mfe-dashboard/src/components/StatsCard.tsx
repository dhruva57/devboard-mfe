import type { IDashboard } from "../types/IDashboard";

export const StatsCard = ({
  label,
  value,
  helperText,
}: IDashboard.IStatsCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
      {helperText ? (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};
