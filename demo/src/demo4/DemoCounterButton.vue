<template>
  <button class="counter-button" @click="$emit('action')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.counter-button {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  margin: 0 10px;
  font-size: 1.5rem;
  background: #dd0000;
  color: white;
  cursor: pointer;

  &:hover {
    background: #ff0000;
  }

  &[disabled] {
    background: #999999;
    cursor: not-allowed;
  }
}
</style>
