<template>
  <render />
</template>

<script setup>
import { h } from "vue";
import { uniq } from "lodash";
import { TAG_SEPARATOR } from "@/common/constants";
import { isEnterEvent } from "@/common/helpers";

const props = defineProps({
  tags: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["change"]);

const normalizeTags = (tags) => {
  const uniqueTags = uniq(
    tags
      .split(TAG_SEPARATOR)
      .map((tag) => `${TAG_SEPARATOR}${tag.trim()}`)
      .filter((tag) => tag.length > TAG_SEPARATOR.length),
  );

  return uniqueTags.join(" ");
};

const setCaretAtEnd = (element) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  const selection = getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

const handleControlFocus = (evt) => {
  requestAnimationFrame(() => {
    const isCaretAtEnd =
      getSelection().getRangeAt(0).endOffset === evt.target.textContent.length;

    if (isCaretAtEnd) {
      emit("change", `${props.tags} ${TAG_SEPARATOR}`);

      requestAnimationFrame(() => {
        setCaretAtEnd(evt.target);
      });
    }
  });
};

const handleControlBlur = (evt) => {
  emit("change", normalizeTags(evt.target.textContent));
};

const handleControlKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    emit("change", normalizeTags(evt.target.textContent));
    evt.target.blur();
  }
};

const render = () => {
  return h(
    "div",
    {
      class: "task-tags-control",
      contentEditable: true,
      onFocus: handleControlFocus,
      onBlur: handleControlBlur,
      onKeydown: handleControlKeydown,
    },
    props.tags,
  );
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-tags-control {
  box-sizing: border-box;
  padding: 8px;
  margin-top: 16px;

  color: $blue-gray-600;
  border: 1px solid $gray-100;
  border-radius: 6px;
  outline: none;

  @include r-s14-h21;
}
</style>
