<template>
  <task-form :task="task" />
</template>

<script setup>
import { useRoute } from "vue-router";
import { useTasksStore } from "@/stores";
import TaskForm from "@/modules/tasks/components/TaskForm.vue";

const route = useRoute();
const tasksStore = useTasksStore();

const task = tasksStore.tasks.find(
  (task) => String(task.id) === route.params.id,
);
</script>
