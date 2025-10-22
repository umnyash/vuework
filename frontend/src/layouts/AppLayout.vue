<template>
  <div class="app-layout">
    <app-layout-header />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppLayoutHeader from "./AppLayoutHeader.vue";
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
