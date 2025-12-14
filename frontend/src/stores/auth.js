import { defineStore } from "pinia";
import { authService } from "@/services";
import { setToken, removeToken } from "@/services/token-manager";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated(state) {
      return Boolean(state.user);
    },
    getUserProperty(state) {
      return (property) => state.user?.[property];
    },
  },
  actions: {
    async login(email, password) {
      try {
        const data = await authService.login(email, password);
        setToken(data.token);
        return "ok";
      } catch (err) {
        return err.message;
      }
    },
    async getMe() {
      this.user = await authService.whoAmI();
    },
    async logout() {
      await authService.logout();
      this.user = null;
      removeToken();
    },
  },
});
