import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api/tasks";

class TasksService extends HttpClient {
  async fetchTasks() {
    try {
      return await this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }

  async createTask(task) {
    try {
      return await this.post("/", { data: task });
    } catch (err) {
      throw Error(err);
    }
  }

  async updateTask(task) {
    try {
      await this.put(`/${task.id}`, { data: task });
    } catch (err) {
      throw Error(err);
    }
  }

  async deleteTask(id) {
    try {
      await this.delete(`/${id}`);
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new TasksService({
  baseURL: BASE_URL,
  httpProvider,
  getToken,
});
