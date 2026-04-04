import { create } from "zustand";
import type { ITaskModule } from "../types/ITask";
import { VALID_STATUSES } from "common_remote/constants";

export const useTaskStore = create<ITaskModule.ITasksStore>((set) => ({
  tasks: [],
  setTasks: (value) => set({ tasks: value }),

  errorMsg: "",
  setErrorMsg: (value) => set({ errorMsg: value }),

  activeFilter: VALID_STATUSES.all,
  setActiveFilter: (value) => set({ activeFilter: value }),

  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  processingTaskId: null,
  setProcessingTaskId: (value) => set({ processingTaskId: value }),
}));
