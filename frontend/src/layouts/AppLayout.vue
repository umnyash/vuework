<template>
  <div class="app-layout">
    <app-layout-header />
    <slot />
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
</style>
