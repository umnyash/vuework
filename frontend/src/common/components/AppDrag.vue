<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDragStart"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "../constants";

const props = defineProps({
  draggable: {
    type: Boolean,
    default: true,
  },
  transferData: {
    type: Object,
    required: true,
  },
});

function onDragStart({ dataTransfer }) {
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData),
  );
}
</script>
