import { useTasks } from "../utils/useTasks";

export const ErrorState = () => {
  const { errorMsg, loadTasks } = useTasks();

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-red-700">
        Something went wrong
      </h3>
      <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
      <button
        type="button"
        onClick={() => loadTasks()}
        className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};
