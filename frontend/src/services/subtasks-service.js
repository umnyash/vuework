import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api/ticks";

class SubtasksService extends HttpClient {
  async fetchSubtasks() {
    try {
      return await this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }

  async createSubtask(subtask) {
    try {
      return await this.post("/", { data: subtask });
    } catch (err) {
      throw Error(err);
    }
  }

  async updateSubtask(subtask) {
    try {
      await this.put(`/${subtask.id}`, { data: subtask });
    } catch (err) {
      throw Error(err);
    }
  }

  async deleteSubtask(id) {
    try {
      await this.delete(`/${id}`);
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new SubtasksService({
  baseURL: BASE_URL,
  httpProvider,
  getToken,
});
