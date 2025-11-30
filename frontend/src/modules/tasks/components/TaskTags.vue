<template>
  <ul class="task__tags">
    <li v-for="(tag, index) in parsedTags" :key="index">
      <span class="tag tag--blue">{{ tag }}</span>
    </li>
  </ul>
</template>

<script setup>
import { parseTags } from "@/common/helpers";

const { tags } = defineProps({
  tags: {
    type: String,
    default: "",
  },
});

const parsedTags = parseTags(tags);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task__tags {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;

  width: 100%;
  margin-top: 5px;

  li {
    margin-top: 4px;
    margin-right: 4px;
  }
}

.tag {
  @include r-s10-h12;

  padding: 4px 8px;

  border-radius: 100px;

  &--pink {
    background-color: $pink-300;
  }

  &--orange {
    background-color: $yellow-300;
  }

  &--green {
    background-color: $green-100;
  }

  &--yellow {
    background-color: $yellow-100;
  }

  &--blue {
    background-color: $blue-300;
  }

  &--violet {
    background-color: $pink-200;
  }
}
</style>
