<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import {
  useUsersStore,
  useTasksStore,
  useColumnsStore,
  useSubtasksStore,
  useCommentsStore,
} from "@/stores";
import { AppLayout } from "@/layouts";

const usersStore = useUsersStore();
const tasksStore = useTasksStore();
const columnsStore = useColumnsStore();
const subtasksStore = useSubtasksStore();
const commentsStore = useCommentsStore();

usersStore.fetchUsers();
tasksStore.fetchTasks();
columnsStore.fetchColumns();
subtasksStore.fetchSubtasks();
commentsStore.fetchComments();
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/app.scss";
</style>
