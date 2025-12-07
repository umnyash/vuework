import { defineStore } from "pinia";
import tasksJSON from "@/mocks/tasks.json";
import { TasksFilter } from "@/common/enums";
import { normalizeTask } from "@/common/helpers";
import { useUsersStore } from "./users";
import { useFilterStore } from "./filter";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    filteredTasks(state) {
      const filterStore = useFilterStore();

      const isTaskMatchingSearchQuery = (task) =>
        task.title
          .toLowerCase()
          .includes(filterStore[TasksFilter.SEARCH_QUERY]);

      const isTaskMatchingUserIds = (task) =>
        filterStore[TasksFilter.USER_IDS].some(
          (userId) => userId === task.userId,
        );

      const isTaskMatchingPriorityStatuses = (task) =>
        filterStore[TasksFilter.PRIORITY_STATUSES].some(
          (status) => status === task.priority,
        );

      const isTaskMatchingTimeStatuses = (task) =>
        filterStore[TasksFilter.TIME_STATUSES].some(
          (status) => status === task.timeStatus,
        );

      const activeMatchers = [
        filterStore[TasksFilter.SEARCH_QUERY] && isTaskMatchingSearchQuery,
        filterStore[TasksFilter.USER_IDS].length && isTaskMatchingUserIds,
        filterStore[TasksFilter.PRIORITY_STATUSES].length &&
          isTaskMatchingPriorityStatuses,
        filterStore[TasksFilter.TIME_STATUSES].length &&
          isTaskMatchingTimeStatuses,
      ].filter(Boolean);

      return state.tasks.filter((task) =>
        activeMatchers.every((matcher) => matcher(task)),
      );
    },
    taskGroupedByColumn() {
      return this.filteredTasks.reduce((accumulator, task) => {
        if (!task.columnId) {
          return accumulator;
        }

        if (!accumulator[task.columnId]) {
          accumulator[task.columnId] = [];
        }

        accumulator[task.columnId].push(task);

        return accumulator;
      }, {});
    },
    backlogTasks() {
      return this.filteredTasks
        .filter(({ columnId }) => !columnId)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    },
  },
  actions: {
    async fetchTasks() {
      this.tasks = tasksJSON.map(normalizeTask);
    },
    updateTasks(updatedTasks) {
      updatedTasks.forEach((task) => {
        const taskIndex = this.tasks.findIndex(({ id }) => id === task.id);

        const normalizedTask = normalizeTask(task);

        if (task.userId) {
          const usersStore = useUsersStore();
          normalizedTask.user = { ...usersStore.getUserById(task.userId) };
        }

        this.tasks.splice(taskIndex, 1, normalizedTask);
      });
    },
    addTask(task) {
      const normalizedTask = normalizeTask(task);

      if (task.userId) {
        const usersStore = useUsersStore();
        normalizedTask.user = { ...usersStore.getUserById(task.userId) };
      }

      normalizedTask.id = this.tasks.length + 1;
      normalizedTask.createdAt = new Date().toISOString();
      normalizedTask.sortOrder = this.tasks.filter(
        (task) => !task.columnId,
      ).length;

      this.tasks.push(normalizedTask);
    },
    deleteTask(id) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(taskIndex, 1);
    },
  },
});
