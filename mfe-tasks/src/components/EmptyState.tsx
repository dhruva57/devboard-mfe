import { useMemo } from "react";
import { useTaskStore } from "../store/useTaskStore";

export const EmptyState = () => {
  const activeFilter = useTaskStore((state) => state.activeFilter);

  const filterLabel = useMemo(() => {
    if (activeFilter === "all") return "available";
    return activeFilter;
  }, [activeFilter]);

  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">No tasks found</h3>
      <p className="mt-2 text-sm text-gray-500">
        There are no {filterLabel} tasks yet.
      </p>
    </div>
  );
};
