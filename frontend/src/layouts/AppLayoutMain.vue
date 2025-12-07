<template>
  <div class="app-layout">
    <app-layout-header />
    <main class="content">
      <app-layout-sidebar
        :tasks="tasks"
        @update-tasks="$emit('updateTasks', $event)"
      />
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppLayoutHeader from "./AppLayoutHeader.vue";
import AppLayoutSidebar from "./AppLayoutSidebar.vue";

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

defineEmits(["updateTasks"]);
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.content {
  display: flex;
  flex-grow: 1;
}
</style>
