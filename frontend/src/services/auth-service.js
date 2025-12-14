import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";

const BASE_URL = "/api";

class AuthService extends HttpClient {
  async login(email, password) {
    try {
      return await this.post("/login", {
        data: { email, password },
      });
    } catch (err) {
      throw Error(err);
    }
  }

  async whoAmI() {
    try {
      return await this.get("/whoAmI");
    } catch (err) {
      throw Error(err);
    }
  }

  async logout() {
    try {
      await this.delete("/logout");
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new AuthService({
  baseURL: BASE_URL,
  httpProvider,
  getToken,
});
