import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api/comments";

class CommentsService extends HttpClient {
  async fetchComments() {
    try {
      return await this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }

  async createComment(comment) {
    try {
      return await this.post("/", { data: comment });
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new CommentsService({
  baseURL: BASE_URL,
  httpProvider,
  getToken,
});
