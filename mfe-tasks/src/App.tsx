import { useEffect } from "react";
import { TaskForm } from "./components/TaskForm";
import { FilterBar } from "./components/FilterBar";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { EmptyState } from "./components/EmptyState";
import { TaskList } from "./components/TaskList";
import { useTasks } from "./utils/useTasks";

export const App = () => {
  const { loadTasks, errorMsg, isLoading, tasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            DevBoard
          </p>
          <div className="my-2 text-3xl font-bold tracking-tight text-gray-900">
            Tasks
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Create, track, filter, and update your work items from this
            independently deployed micro frontend.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div>
            <TaskForm />
          </div>

          <section className="space-y-4">
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  Task List
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  View all tasks or filter by current status.
                </p>
              </div>

              <FilterBar />
            </div>

            {errorMsg && !isLoading ? <ErrorState /> : null}

            {isLoading ? (
              <LoadingState />
            ) : tasks.length === 0 ? (
              <EmptyState />
            ) : (
              <TaskList />
            )}
          </section>
        </div>
      </div>
    </main>
  );
};
