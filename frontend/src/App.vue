<template>
  <app-layout>
    <home-view :tasks="tasks" />
  </app-layout>
</template>

<script setup>
import { reactive } from "vue";
import tasksJSON from "@/mocks/tasks.json";
import { normalizeTask } from "@/common/helpers";
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";

const { tasks } = reactive({
  tasks: tasksJSON.map(normalizeTask),
});
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/app.scss";
</style>
