import { defineStore } from "pinia";
import { PriorityStatus, TasksFilter } from "@/common/enums";
import { determineTimeStatus } from "@/common/helpers";
import { tasksService } from "@/services";
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
    adaptTaskToClient(task) {
      return {
        ...task,
        priority: PriorityStatus[task.statusId] ?? "",
        timeStatus: determineTimeStatus(task.dueDate),
      };
    },
    adaptTaskToServer(task) {
      delete task.priority;
      delete task.timeStatus;
      delete task.user;
      delete task.subtasks;
      delete task.comments;

      return task;
    },
    async fetchTasks() {
      const tasks = await tasksService.fetchTasks();
      this.tasks = tasks.map(this.adaptTaskToClient);
    },
    async updateTasks(updatedTasks) {
      updatedTasks.forEach(async (task) => {
        await tasksService.updateTask(this.adaptTaskToServer(task));
        const taskIndex = this.tasks.findIndex(({ id }) => id === task.id);
        this.tasks.splice(taskIndex, 1, task);
      });
    },
    async addTask(taskData) {
      taskData.sortOrder = this.tasks.filter((task) => !task.columnId).length;

      const task = await tasksService.createTask(
        this.adaptTaskToServer(taskData),
      );

      this.tasks.push(this.adaptTaskToClient(task));
    },
    async deleteTask(id) {
      await tasksService.deleteTask(id);
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(taskIndex, 1);
    },
  },
});
