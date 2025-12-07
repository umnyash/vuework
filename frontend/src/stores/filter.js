import { defineStore } from "pinia";
import { TasksFilter } from "@/common/enums";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    [TasksFilter.SEARCH_QUERY]: "",
    [TasksFilter.USER_IDS]: [],
    [TasksFilter.PRIORITY_STATUSES]: [],
    [TasksFilter.TIME_STATUSES]: [],
  }),
  getters: {},
  actions: {
    update({ key, value }) {
      const currentValue = this[key];

      if (Array.isArray(currentValue)) {
        const itemIndex = currentValue.findIndex((item) => item === value);

        if (itemIndex === -1) {
          currentValue.push(value);
        } else {
          currentValue.splice(itemIndex, 1);
        }
      } else {
        this[key] = value.trim().toLowerCase();
      }
    },
  },
});
