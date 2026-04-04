import axios from "axios";
import type { IDashboard } from "../types/IDashboard";
import { API_TASKS_PREFIX } from "common_remote/constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getTaskStats = async (): Promise<IDashboard.ITaskStats> => {
  const response = await api.get<
    IDashboard.IApiSuccessResponse<IDashboard.ITaskStats>
  >(`${API_TASKS_PREFIX}/stats`);
  return response.data.data;
};
