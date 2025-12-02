<template>
  <task-form @submit="emit('taskFormSubmit', $event)" />
</template>

<script setup>
import TaskForm from "@/modules/tasks/components/TaskForm.vue";

const emit = defineEmits(["taskFormSubmit"]);
</script>
