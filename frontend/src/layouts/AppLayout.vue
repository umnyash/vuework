<template>
  <div class="app-layout">
    <app-layout-header @update-filter="$emit('updateFilter', $event)" />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppLayoutHeader from "./AppLayoutHeader.vue";

defineEmits(["updateFilter"]);
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
