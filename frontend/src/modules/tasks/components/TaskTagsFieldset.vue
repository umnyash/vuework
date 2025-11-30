<template>
  <div class="task-card__tags">
    <h2 class="task-card__title">Теги</h2>

    <task-tags-control
      :tags="modelValue"
      @change="emit('update:modelValue', $event)"
    />

    <div class="task-card__tags--text">
      Добавьте теги, разделённые символом {{ TAG_SEPARATOR }}
    </div>
  </div>
</template>

<script setup>
import { TAG_SEPARATOR } from "@/common/constants";
import TaskTagsControl from "./TaskTagsControl.vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card__tags {
  &--text {
    padding: 8px 0 0;

    color: $blue-gray-600;

    @include r-s14-h16;
  }
}
</style>
