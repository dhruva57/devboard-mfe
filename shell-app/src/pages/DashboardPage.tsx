import { lazy, Suspense } from "react";
import { LoadingState } from "common_remote/LoadingState";
import RemoteErrorBoundary from "../components/RemoteErrorBoundary";

const DashboardRemoteApp = lazy(() => import("mfeDashboard/App"));

export const DashboardPage = () => {
  return (
    <RemoteErrorBoundary>
      <Suspense fallback={<LoadingState />}>
        <DashboardRemoteApp />
      </Suspense>
    </RemoteErrorBoundary>
  );
};
