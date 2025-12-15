import { defineStore } from "pinia";
import { usersService } from "@/services";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUserById() {
      return (id) => this.users.find((user) => user.id === id);
    },
  },
  actions: {
    async fetchUsers() {
      this.users = await usersService.fetchUsers();
    },
  },
});
