import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api/columns";

class ColumnsService extends HttpClient {
  async fetchColumns() {
    try {
      return await this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }

  async createColumn(column) {
    try {
      return await this.post("/", { data: column });
    } catch (err) {
      throw Error(err);
    }
  }

  async updateColumn(column) {
    const { id, ...columnData } = column;

    try {
      await this.put(`/${id}`, { data: columnData });
    } catch (err) {
      throw Error(err);
    }
  }

  async deleteColumn(id) {
    try {
      await this.delete(`/${id}`);
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new ColumnsService({
  baseURL: BASE_URL,
  httpProvider,
  getToken,
});
