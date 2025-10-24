<template>
  <demo-container>
    <div class="counter">
      <demo-counter-button @action="decrement">-</demo-counter-button>

      <demo-counter-value :value="count" />

      <demo-counter-button @action="increment">+</demo-counter-button>
    </div>
  </demo-container>
</template>

<script setup>
import { ref } from "vue";
import DemoContainer from "../components/DemoContainer.vue";
import DemoCounterButton from "./DemoCounterButton.vue";
import DemoCounterValue from "./DemoCounterValue.vue";

const count = ref(0);

const decrement = () => count.value--;
const increment = () => count.value++;
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
}
</style>
