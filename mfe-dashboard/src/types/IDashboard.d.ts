export namespace IDashboard {
  export interface ITaskStats {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  }

  export interface IApiSuccessResponse<T> {
    success: true;
    message?: string;
    data: T;
  }

  export interface IApiErrorResponse {
    success: false;
    message: string;
  }

  export interface IStatsGridProps {
    stats: IDashboard.ITaskStats;
  }

  export interface IStatsCardProps {
    label: string;
    value: number;
    helperText?: string;
  }

  export interface ISimpleBarChartProps {
    stats: IDashboard.ITaskStats;
  }

  export interface IRefreshButtonProps {
    onRefresh: () => void;
    isRefreshing: boolean;
  }
}
