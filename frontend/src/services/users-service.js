import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api/users";

class UsersService extends HttpClient {
  async fetchUsers() {
    try {
      return await this.get("/");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new UsersService({
  baseURL: BASE_URL,
  httpProvider,
  getToken,
});
