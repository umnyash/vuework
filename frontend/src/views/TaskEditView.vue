<template>
  <task-form :task="task" @submit="emit('taskFormSubmit', $event)" />
</template>

<script setup>
import { useRoute } from "vue-router";
import TaskForm from "@/modules/tasks/components/TaskForm.vue";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["taskFormSubmit"]);

const route = useRoute();
const task = props.tasks.find((task) => String(task.id) === route.params.id);
</script>
