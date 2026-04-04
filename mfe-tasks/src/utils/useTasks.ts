import { useCallback } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTaskStatus,
} from "../api/tasksApi";
import { useTaskStore } from "../store/useTaskStore";
import type { ITaskModule } from "../types/ITask";
import { VALID_STATUSES } from "common_remote/constants";

export const useTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const setErrorMsg = useTaskStore((state) => state.setErrorMsg);
  const errorMsg = useTaskStore((state) => state.errorMsg);
  const activeFilter = useTaskStore((state) => state.activeFilter);
  const setActiveFilter = useTaskStore((state) => state.setActiveFilter);
  const setIsLoading = useTaskStore((state) => state.setIsLoading);
  const isLoading = useTaskStore((state) => state.isLoading);
  const processingTaskId = useTaskStore((state) => state.processingTaskId);
  const setProcessingTaskId = useTaskStore(
    (state) => state.setProcessingTaskId
  );

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      console.log("loadTasks");

      const data = await getTasks(activeFilter);
      console.log({ data });

      setTasks(data);
    } catch (error) {
      console.log({ error });
      setErrorMsg(
        error instanceof Error ? error.message : "Failed to load tasks"
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter]);

  const handleCreateTask = async (payload: ITaskModule.ICreateTaskPayload) => {
    try {
      setErrorMsg("");
      const newTask = await createTask(payload);

      if (
        activeFilter === VALID_STATUSES.all ||
        activeFilter === newTask.status
      ) {
        setTasks([newTask, ...tasks]);
      } else {
        await loadTasks();
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to create task"
      );
    }
  };

  const handleToggleStatus = async (taskId: string) => {
    try {
      setProcessingTaskId(taskId);
      setErrorMsg("");

      const updatedTask = await toggleTaskStatus(taskId);

      if (
        activeFilter !== VALID_STATUSES.all &&
        updatedTask.status !== activeFilter
      ) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        setTasks(
          tasks.map((task) => (task._id === taskId ? updatedTask : task))
        );
      }
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Failed to update task status"
      );
    } finally {
      setProcessingTaskId(null);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      setProcessingTaskId(taskId);
      setErrorMsg("");

      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Failed to delete task"
      );
    } finally {
      setProcessingTaskId(null);
    }
  };

  return {
    handleCreateTask,
    handleToggleStatus,
    handleDelete,
    loadTasks,
    activeFilter,
    setActiveFilter,
    errorMsg,
    isLoading,
    tasks,
    processingTaskId,
  };
};
