<template>
  <div class="task-card__comments">
    <h2 class="task-card__title">Комментарии</h2>
    <div class="comments">
      <ul v-if="comments.length" class="comments__list">
        <li
          v-for="comment of comments"
          :key="comment.id"
          class="comments__item"
        >
          <div class="comments__user">
            <img
              :src="getImage(comment.user.avatar)"
              :alt="comment.user.name"
              width="30"
              height="30"
            />
            {{ comment.user.name }}
          </div>
          <p>{{ comment.text }}</p>
        </li>
      </ul>

      <form
        action="#"
        class="comments__form"
        method="post"
        @submit.prevent="handleFormSubmit"
      >
        <app-text-area
          v-model="newComment"
          name="comment_text"
          placeholder="Введите текст комментария"
          :error-text="validations.newComment.error"
        />

        <button type="submit">Написать комментарий</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { getImage } from "@/common/helpers";

import {
  ValidationRule,
  validateFields,
  clearValidationErrors,
} from "@/common/validator";

import AppTextArea from "@/common/components/AppTextArea.vue";

defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
});

const newComment = ref("");

const validations = reactive({
  newComment: {
    error: "",
    rules: [ValidationRule.Required],
  },
});

watch(newComment, () => {
  if (validations.newComment.error) {
    clearValidationErrors(validations);
  }
});

const handleFormSubmit = () => {
  const isValid = validateFields({ newComment }, validations);

  if (!isValid) {
    return;
  }

  newComment.value = "";
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card__comments {
  margin-top: 30px;
}

.comments {
  &__list {
    @include clear-list;
  }

  &__item {
    margin-top: 24px;

    p {
      @include r-s14-h21;
    }

    strong {
      @include r-s14-h21;

      color: $blue-600;
    }
  }

  &__user {
    @include r-s14-h16;

    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;
    padding: 0;

    text-align: left;

    background-color: transparent;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;

      border-radius: 50%;
    }

    span {
      @include m-s14-h21;

      display: block;

      box-sizing: border-box;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      padding-top: 5px;

      text-align: center;

      color: $white-900;
      border-radius: 50%;
      background-color: $green-700;
    }
  }

  &__form {
    margin-top: 24px;

    button {
      @include m-s14-h21;

      display: block;

      margin: 0;
      margin-top: 15px;
      margin-left: auto;
      padding: 0;

      cursor: pointer;
      transition: opacity 0.3s;

      opacity: 0.5;
      color: $blue-gray-600;
      border: none;
      outline: none;
      background-color: transparent;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
