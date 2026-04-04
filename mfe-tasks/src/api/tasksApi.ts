import axios from "axios";
import type { ITaskModule } from "../types/ITask";
import { API_TASKS_PREFIX, VALID_STATUSES } from "common_remote/constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getTasks = async (
  filter: ITaskModule.ITaskFilter
): Promise<ITaskModule.ITask[]> => {
  const query =
    filter === VALID_STATUSES.all
      ? API_TASKS_PREFIX
      : `${API_TASKS_PREFIX}?status=${encodeURIComponent(filter)}`;

  const response =
    await api.get<ITaskModule.IApiSuccessResponse<ITaskModule.ITask[]>>(query);
  return response.data.data;
};

export const createTask = async (
  payload: ITaskModule.ICreateTaskPayload
): Promise<ITaskModule.ITask> => {
  const response = await api.post<
    ITaskModule.IApiSuccessResponse<ITaskModule.ITask>
  >(API_TASKS_PREFIX, payload);
  return response.data.data;
};

export const toggleTaskStatus = async (
  taskId: string
): Promise<ITaskModule.ITask> => {
  const response = await api.patch<
    ITaskModule.IApiSuccessResponse<ITaskModule.ITask>
  >(`${API_TASKS_PREFIX}/${taskId}/status`);
  return response.data.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await api.delete(`${API_TASKS_PREFIX}/${taskId}`);
};
