<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { useUsersStore, useTasksStore, useColumnsStore } from "@/stores";
import { AppLayout } from "@/layouts";

const usersStore = useUsersStore();
const tasksStore = useTasksStore();
const columnsStore = useColumnsStore();

usersStore.fetchUsers();
tasksStore.fetchTasks();
columnsStore.fetchColumns();
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/app.scss";
</style>
