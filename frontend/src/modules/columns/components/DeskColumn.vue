<template>
  <div class="column">
    <h2 class="column__name">{{ column.title }}</h2>
    <div class="column__target-area">
      <!-- Задачи -->
      <div v-for="task in tasks" :key="task.id" class="column__task">
        <task-card :task="task" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCard from "@/modules/tasks/components/TaskCard.vue";

defineProps({
  column: {
    type: Object,
    required: true,
  },
  tasks: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.column {
  $bl: &;

  display: flex;
  flex-direction: column;

  padding-top: 15px;

  border-left: 1px solid $blue-gray-200;

  &__name {
    @include m-s14-h21;

    display: flex;
    align-items: center;

    margin: 0 8px;

    color: $blue-gray-600;

    &:hover {
      #{$bl}__button {
        opacity: 1;
      }
    }
  }

  &__target-area {
    overflow-y: auto;
    flex-grow: 1;

    min-width: 224px;
    max-width: 380px;
    height: 1px;
    padding-right: 8px;
    padding-bottom: 30px;
    padding-left: 8px;

    @media (min-width: 1500px) {
      min-width: 244px;
    }
  }

  &__task {
    display: block;

    width: 100%;
    margin-top: 16px;
  }

  &__button {
    margin: 0;
    padding: 0;

    transition: opacity 0.3s;
    transform: scale(0.8);

    opacity: 0;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &__update {
    margin-right: 5px;
    margin-left: 5px;
  }
}
</style>
