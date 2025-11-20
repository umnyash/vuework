<template>
  <div class="task-card__check-list">
    <h2 class="task-card__title">
      Чеклист <button type="button" class="task-card__plus"></button>
    </h2>

    <ul v-if="subtasks.length" class="task-card__list">
      <task-checklist-item
        v-for="subtask of subtasks"
        :key="subtask.id"
        :subtask="subtask"
      />
    </ul>
  </div>
</template>

<script setup>
import TaskChecklistItem from "./TaskChecklistItem.vue";

defineProps({
  subtasks: {
    type: Array,
    default: () => [],
  },
});
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
