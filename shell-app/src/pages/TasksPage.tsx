import { lazy, Suspense } from "react";
import RemoteErrorBoundary from "../components/RemoteErrorBoundary";
import { LoadingState } from "common_remote/LoadingState";

const TasksRemoteApp = lazy(() => import("mfeTasks/App"));

export const TasksPage = () => {
  return (
    <RemoteErrorBoundary>
      <Suspense fallback={<LoadingState />}>
        <TasksRemoteApp />
      </Suspense>
    </RemoteErrorBoundary>
  );
};
