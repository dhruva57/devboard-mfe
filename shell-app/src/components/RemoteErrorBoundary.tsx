import { Component, type ErrorInfo, type ReactNode } from "react";

interface RemoteErrorBoundaryProps {
  children: ReactNode;
}

interface RemoteErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  constructor(props: RemoteErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      message: ""
    };
  }

  static getDerivedStateFromError(error: Error): RemoteErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || "Failed to load remote module"
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Remote module failed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-red-700">Module load failed</h3>
          <p className="mt-2 text-sm text-red-600">{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RemoteErrorBoundary;