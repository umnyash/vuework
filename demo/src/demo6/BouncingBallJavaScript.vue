<template>
  <demo-container>
    <demo-button @click="show = !show">Показать</demo-button>
    <br />
    <transition @enter="enterAnimation" @leave="leaveAnimation" :css="false">
      <img v-if="show" src="@/assets/ball.png" alt="img" />
    </transition>
  </demo-container>
</template>

<script setup>
import DemoContainer from "../components/DemoContainer.vue";
import DemoButton from "./DemoButton.vue";
import { ref } from "vue";

const show = ref(true);

function clearAnimations(element, done) {
  element.addEventListener("animationend", () => {
    element.className = "";
    done();
  });
}

function enterAnimation(element, done) {
  element.className = "bounce";
  clearAnimations(element, done);
}

function leaveAnimation(element, done) {
  element.className = "bounce-reverse";
  clearAnimations(element, done);
}
</script>

<style scoped>
.bounce {
  animation: bounce 0.5s;
}

.bounce-reverse {
  animation: bounce 0.5s reverse;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
