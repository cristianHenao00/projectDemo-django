import axios from "axios";

const tasksApi = axios.create({
  baseURL: "http://127.0.0.1:8000/tasks/api/tasks/",
});

export const getTasksAll = () => tasksApi.get("/");
export const getTask = (id) => tasksApi.get(`/${id}/`);
export const createTask = (task) => tasksApi.post("/", task);
export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
export const deleteTask = (id) => tasksApi.delete(`/${id}/`);
