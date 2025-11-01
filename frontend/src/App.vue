<template>
  <app-layout @update-filter="updateFilter">
    <home-view
      :tasks="filteredTasks"
      :filter="filter"
      @update-filter="updateFilter"
      @update-tasks="updateTasks"
    />
  </app-layout>
</template>

<script setup>
import { reactive, computed } from "vue";
import tasksJSON from "@/mocks/tasks.json";
import { TasksFilter } from "@/common/enums";
import { normalizeTask } from "@/common/helpers";
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";

const { tasks, filter } = reactive({
  tasks: tasksJSON.map(normalizeTask),
  filter: {
    [TasksFilter.SEARCH_QUERY]: "",
    [TasksFilter.USER_IDS]: [],
    [TasksFilter.PRIORITY_STATUSES]: [],
    [TasksFilter.TIME_STATUSES]: [],
  },
});

const isTaskMatchingSearchQuery = (task) =>
  task.title.toLowerCase().includes(filter[TasksFilter.SEARCH_QUERY]);

const isTaskMatchingUserIds = (task) =>
  filter[TasksFilter.USER_IDS].some((userId) => userId === task.userId);

const isTaskMatchingPriorityStatuses = (task) =>
  filter[TasksFilter.PRIORITY_STATUSES].some(
    (status) => status === task.priority,
  );

const isTaskMatchingTimeStatuses = (task) =>
  filter[TasksFilter.TIME_STATUSES].some(
    (status) => status === task.timeStatus,
  );

const filteredTasks = computed(() => {
  const activeMatchers = [
    filter[TasksFilter.SEARCH_QUERY] && isTaskMatchingSearchQuery,
    filter[TasksFilter.USER_IDS].length && isTaskMatchingUserIds,
    filter[TasksFilter.PRIORITY_STATUSES].length &&
      isTaskMatchingPriorityStatuses,
    filter[TasksFilter.TIME_STATUSES].length && isTaskMatchingTimeStatuses,
  ].filter(Boolean);

  return tasks.filter((task) =>
    activeMatchers.every((matcher) => matcher(task)),
  );
});

const updateFilter = ({ key, value }) => {
  const currentValue = filter[key];

  if (Array.isArray(currentValue)) {
    const itemIndex = currentValue.findIndex((item) => item === value);

    if (itemIndex === -1) {
      currentValue.push(value);
    } else {
      currentValue.splice(itemIndex, 1);
    }
  } else {
    filter[key] = value.trim().toLowerCase();
  }
};

const updateTasks = (updatedTasks) => {
  updatedTasks.forEach((updatedTask) => {
    const taskIndex = tasks.findIndex((task) => updatedTask.id === task.id);
    tasks.splice(taskIndex, 1, updatedTask);
  });
};
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/app.scss";
</style>
