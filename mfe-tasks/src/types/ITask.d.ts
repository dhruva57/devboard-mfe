export namespace ITaskModule {
  export type ITaskStatus = "pending" | "completed";
  export type ITaskPriority = "low" | "medium" | "high";
  export type ITaskFilter = "all" | "pending" | "completed";

  export interface ITask {
    _id: string;
    title: string;
    description?: string;
    status: ITaskStatus;
    priority: ITaskPriority;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface ICreateTaskPayload {
    title: string;
    description?: string;
    priority: ITaskPriority;
    dueDate: string;
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

  export interface IPriorityBadgeProps {
    priority: ITaskPriority;
  }

  export interface ITaskCardProps {
    task: ITask;
    onToggleStatus: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    isProcessing?: boolean;
  }

  export interface ITasksStore {
    tasks: ITask[];
    setTasks: (value: ITasksStore["tasks"]) => void;

    errorMsg: string;
    setErrorMsg: (value: ITasksStore["errorMsg"]) => void;

    activeFilter: ITaskFilter;
    setActiveFilter: (value: ITasksStore["activeFilter"]) => void;

    isLoading: boolean;
    setIsLoading: (value: ITasksStore["isLoading"]) => void;

    processingTaskId: string | null;
    setProcessingTaskId: (value: ITasksStore["processingTaskId"]) => void;
  }
}
