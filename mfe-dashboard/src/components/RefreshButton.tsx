import type { IDashboard } from "../types/IDashboard";

export const RefreshButton = ({
  onRefresh,
  isRefreshing,
}: IDashboard.IRefreshButtonProps) => {
  return (
    <button
      type="button"
      onClick={onRefresh}
      disabled={isRefreshing}
      className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isRefreshing ? "Refreshing..." : "Refresh"}
    </button>
  );
};
