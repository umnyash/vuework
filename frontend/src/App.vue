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
  useCommentsStore,
} from "@/stores";
import { AppLayout } from "@/layouts";

const usersStore = useUsersStore();
const tasksStore = useTasksStore();
const columnsStore = useColumnsStore();
const commentsStore = useCommentsStore();

usersStore.fetchUsers();
tasksStore.fetchTasks();
columnsStore.fetchColumns();
commentsStore.fetchComments();
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/app.scss";
</style>
