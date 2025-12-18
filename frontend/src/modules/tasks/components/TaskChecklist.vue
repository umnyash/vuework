<template>
  <div class="task-card__check-list">
    <h2 class="task-card__title">
      Чеклист
      <button
        v-if="authStore.isAdmin"
        type="button"
        class="task-card__plus"
        @click="emit('addSubtaskButtonClick')"
      />
    </h2>

    <ul v-if="subtasks.length" class="task-card__list">
      <task-checklist-item
        v-for="subtask of subtasks"
        :key="subtask.id"
        :subtask="subtask"
        :disabled="disabled"
        @change="emit('subtaskChange', $event)"
        @remove-button-click="emit('removeSubtaskButtonClick', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores";
import TaskChecklistItem from "./TaskChecklistItem.vue";

defineProps({
  subtasks: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "subtaskChange",
  "addSubtaskButtonClick",
  "removeSubtaskButtonClick",
]);

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card {
  &__list {
    @include clear-list;

    margin-top: 15px;
  }
}
</style>
