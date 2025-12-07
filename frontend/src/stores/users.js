import { defineStore } from "pinia";
import usersJSON from "@/mocks/users.json";

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
      this.users = usersJSON;
    },
  },
});
