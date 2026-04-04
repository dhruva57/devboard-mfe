import { VALID_STATUSES_LIST } from "common_remote/constants";
import type { ITaskModule } from "../types/ITask";
import { useTaskStore } from "../store/useTaskStore";

export const FilterBar = () => {
  const activeFilter = useTaskStore((state) => state.activeFilter);
  const setActiveFilter = useTaskStore((state) => state.setActiveFilter);

  return (
    <div className="flex flex-wrap gap-2">
      {VALID_STATUSES_LIST.map((filter: ITaskModule.ITaskFilter) => {
        const isActive = filter === activeFilter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-gray-900 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        );
      })}
    </div>
  );
};
