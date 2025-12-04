<template>
  <demo-container>
    <div class="counter">
      <demo-counter-button
        @action="counterStore.decrement"
        :disabled="counterStore.isMinimum"
      >
        -
      </demo-counter-button>

      <demo-counter-value :value="counterStore.code" />

      <demo-counter-button @action="counterStore.increment">
        +
      </demo-counter-button>
    </div>
  </demo-container>
</template>

<script setup>
import { useCounterStore } from "./store";
import DemoContainer from "../components/DemoContainer.vue";
import DemoCounterButton from "./DemoCounterButton.vue";
import DemoCounterValue from "./DemoCounterValue.vue";

const counterStore = useCounterStore();
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
}
</style>
