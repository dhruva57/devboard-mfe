import { useCallback, useEffect, useState } from "react";
import { getTaskStats } from "./api/dashboardApi";
import { ErrorState } from "common_remote/ErrorState";
import { LoadingState } from "common_remote/LoadingState";
import type { IDashboard } from "./types/IDashboard";
import { RefreshButton } from "./components/RefreshButton";
import { StatsGrid } from "./components/StatsGrid";
// import { SimpleBarChart } from "./components/SimpleBarChart";

const App = () => {
  const [stats, setStats] = useState<IDashboard.ITaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const loadStats = useCallback(async (isManualRefresh = false) => {
    try {
      setErrorMessage("");

      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const data = await getTaskStats();
      setStats(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load dashboard stats"
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              DevBoard
            </p>
            <div className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              View task totals, completion progress, pending work, and overdue
              items from this independently deployed micro frontend.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {lastUpdated ? (
              <span className="text-sm text-gray-500">
                Last updated: {lastUpdated}
              </span>
            ) : null}
            <RefreshButton
              onRefresh={() => loadStats(true)}
              isRefreshing={isRefreshing}
            />
          </div>
        </header>

        {errorMessage && !isLoading ? (
          <ErrorState
            errorMsg={errorMessage}
            onRetry={() => void loadStats()}
          />
        ) : null}

        {isLoading || !stats ? (
          <LoadingState />
        ) : (
          <div className="space-y-6">
            <StatsGrid stats={stats} />
            {/* <SimpleBarChart stats={stats} /> */}
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
