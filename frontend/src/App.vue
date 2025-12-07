<template>
  <app-layout :tasks="filteredTasks" @update-tasks="updateTasks">
    <router-view
      :tasks="filteredTasks"
      @update-tasks="updateTasks"
      @task-form-submit="handleTaskFormSubmit"
      @task-remove="handleTaskRemove"
    />
  </app-layout>
</template>

<script setup>
import { reactive, computed } from "vue";
import tasksJSON from "@/mocks/tasks.json";
import { TasksFilter } from "@/common/enums";
import { normalizeTask } from "@/common/helpers";
import { useUsersStore, useFilterStore, useColumnsStore } from "@/stores";
import { AppLayout } from "@/layouts";

const usersStore = useUsersStore();
const filterStore = useFilterStore();
const columnsStore = useColumnsStore();

usersStore.fetchUsers();
columnsStore.fetchColumns();

const { tasks } = reactive({
  tasks: tasksJSON.map(normalizeTask),
});

const isTaskMatchingSearchQuery = (task) =>
  task.title.toLowerCase().includes(filterStore[TasksFilter.SEARCH_QUERY]);

const isTaskMatchingUserIds = (task) =>
  filterStore[TasksFilter.USER_IDS].some((userId) => userId === task.userId);

const isTaskMatchingPriorityStatuses = (task) =>
  filterStore[TasksFilter.PRIORITY_STATUSES].some(
    (status) => status === task.priority,
  );

const isTaskMatchingTimeStatuses = (task) =>
  filterStore[TasksFilter.TIME_STATUSES].some(
    (status) => status === task.timeStatus,
  );

const filteredTasks = computed(() => {
  const activeMatchers = [
    filterStore[TasksFilter.SEARCH_QUERY] && isTaskMatchingSearchQuery,
    filterStore[TasksFilter.USER_IDS].length && isTaskMatchingUserIds,
    filterStore[TasksFilter.PRIORITY_STATUSES].length &&
      isTaskMatchingPriorityStatuses,
    filterStore[TasksFilter.TIME_STATUSES].length && isTaskMatchingTimeStatuses,
  ].filter(Boolean);

  return tasks.filter((task) =>
    activeMatchers.every((matcher) => matcher(task)),
  );
});

const updateTasks = (updatedTasks) => {
  updatedTasks.forEach((updatedTask) => {
    const taskIndex = tasks.findIndex((task) => updatedTask.id === task.id);
    tasks.splice(taskIndex, 1, updatedTask);
  });
};

const handleTaskFormSubmit = (task) => {
  const normalizedTask = normalizeTask(task);

  if (task.userId) {
    normalizedTask.user = usersStore.getUserById(task.userId);
  }

  if (task.id) {
    updateTasks([normalizedTask]);
  } else {
    normalizedTask.id = tasks.length + 1;
    normalizedTask.createdAt = new Date().toISOString();
    normalizedTask.sortOrder = tasks.filter((task) => !task.columnId).length;
    tasks.push(normalizedTask);
  }
};

const handleTaskRemove = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks.splice(taskIndex, 1);
};
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/app.scss";
</style>
