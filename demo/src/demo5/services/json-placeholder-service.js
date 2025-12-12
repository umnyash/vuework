import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

class JsonPlaceholderService extends HttpClient {
  async fetchPosts() {
    try {
      return this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }

  async getById(id) {
    try {
      return this.get(`/${id}`);
    } catch (err) {
      throw Error(err);
    }
  }

  async createPost(post) {
    try {
      return this.post("/", { data: post });
    } catch (err) {
      throw Error(err);
    }
  }

  async updatePost(post) {
    try {
      return this.put(`/${post.id}`, { data: post });
    } catch (err) {
      throw Error(err);
    }
  }

  async deletePost(id) {
    try {
      await this.delete(`/${id}`);
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new JsonPlaceholderService({
  httpProvider,
  baseURL: BASE_URL,
});
