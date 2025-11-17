<template>
  <div
    ref="cardElement"
    class="task-card"
    tabindex="0"
    @click.self="handleCardClick"
    @keydown.esc="handleCardEscKeydown"
  >
    <section class="task-card__wrapper">
      <button
        class="task-card__close"
        type="button"
        @click="handleCloseButtonClick"
      />

      <h1 class="task-card__name">
        <span>{{ task.title }}</span>
        <app-icon class="icon--edit" />
      </h1>

      <p class="task-card__date">{{ useTaskDate(task) }}</p>

      <ul class="task-card__params">
        <li v-if="task.user">
          Участник:
          <div class="task-card__participant">
            <button type="button" class="task-card__user">
              <img :src="getImage(task.user.avatar)" :alt="task.user.name" />
              {{ task.user.name }}
            </button>
          </div>
        </li>
        <li v-if="task.dueDate">
          Срок:
          <button type="button" class="task-card__link task-card__link--text">
            {{ formatDate(task.dueDate) }}
          </button>
        </li>
      </ul>

      <div class="task-card__description">
        <h2 class="task-card__title">Описание</h2>
        <p v-if="task.description">{{ task.description }}</p>
      </div>

      <div v-if="task.url" class="task-card__links">
        <h2 class="task-card__title">
          Ссылки <button type="button" class="task-card__plus"></button>
        </h2>

        <div class="task-card__links-item task-card__links-item--border_none">
          <a :href="task.url" target="_blank">
            {{ task.urlDescription || "Ссылка" }}
          </a>
        </div>
      </div>

      <div class="task-card__files">
        <h2 class="task-card__title">Файлы</h2>
        <p>Нет прикрепленных файлов</p>
      </div>

      <task-checklist />

      <div class="task-card__tags">
        <h2 class="task-card__title">Метки</h2>
        <task-tags v-if="task.tags.length" :tags="task.tags" />
      </div>

      <task-comments :comments="task.comments" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getImage, formatDate } from "@/common/helpers";
import { useTaskDate } from "@/common/composables";
import AppIcon from "@/common/components/AppIcon.vue";
import TaskChecklist from "@/modules/tasks/components/TaskChecklist.vue";
import TaskTags from "@/modules/tasks/components/TaskTags.vue";
import TaskComments from "@/modules/tasks/components/TaskComments.vue";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const cardElement = ref(null);
const task = computed(() =>
  props.tasks.find((task) => String(task.id) === route.params.id),
);

const closeCard = () => {
  router.push("/");
};

const handleCloseButtonClick = () => {
  closeCard();
};

const handleCardClick = () => {
  closeCard();
};

const handleCardEscKeydown = () => {
  closeCard();
};

onMounted(() => {
  cardElement.value.focus();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task-card {
  $bl: ".task-card";

  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  overflow-x: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;

  // outline: none;
  background: $gray-900;

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;

    width: 20px;
    height: 20px;

    cursor: pointer;

    border: none;
    outline: none;
    background-color: transparent;

    &::after,
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 100%;
      height: 1px;

      content: "";
      transition: background-color 0.3s;

      background-color: $blue-gray-300;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:hover {
      &::before,
      &::after {
        background-color: $blue-700;
      }
    }
  }

  &__wrapper {
    position: relative;

    width: 500px;
    margin: 0 auto;
    padding: 40px;

    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }

  &__name,
  &__name input {
    @include m-s24-h21;

    display: block;

    width: 100%;
    margin: 0;
    padding: 0;
    padding-bottom: 5px;

    color: $gray-900;
    border: none;
    border-bottom: 1px solid transparent;
    border-radius: 0;
    outline: none;

    &:focus:not(:disabled) {
      cursor: text;

      border-color: $blue-gray-200;
    }
  }

  &__name {
    button,
    span {
      display: inline-block;

      vertical-align: middle;
    }

    button {
      margin-left: 11px;
    }

    input {
      display: none;
    }
  }

  &__date {
    @include r-s14-h21;

    margin-top: 5px;
    margin-bottom: 40px;

    color: $blue-gray-300;
  }

  &__params {
    @include clear-list;
    @include r-s16-h21;

    margin-bottom: 40px;

    color: $gray-900;

    li {
      margin-bottom: 24px;
    }
  }

  &__participant {
    position: relative;

    display: inline-block;

    vertical-align: baseline;
  }

  &__users {
    position: absolute;
    z-index: 10;
    top: -12px;
    left: 0;

    display: none;

    box-sizing: border-box;
    width: 210px;

    border-radius: 6px;
    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }

  &__user {
    @include r-s14-h16;

    display: inline-flex;
    align-items: center;

    width: 100%;
    margin: 0;
    margin-left: 5px;
    padding: 0;

    cursor: pointer;
    transform: translateY(-2px);
    text-align: left;
    vertical-align: middle;

    border: none;
    outline: none;
    background-color: transparent;

    &::after {
      position: absolute;
      top: 8px;
      right: -20px;

      width: 14px;
      height: 14px;

      content: "";
      transition: opacity 0.3s;

      opacity: 0;
      background-image: url("@/assets/img/icon-pencil.svg");
      background-size: cover;
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }

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

  &__link {
    @include r-s16-h21;

    position: relative;

    margin: 0;
    padding: 0;
    padding-right: 23px;

    cursor: pointer;
    text-decoration: underline;

    color: $blue-gray-600;
    border: none;
    outline: none;
    background-color: transparent;

    &::after {
      position: absolute;
      top: 2px;
      right: 0;

      width: 14px;
      height: 14px;

      content: "";
      transition: opacity 0.3s;

      opacity: 0;
      background-image: url("@/assets/img/icon-pencil.svg");
      background-size: cover;
    }

    &:hover {
      text-decoration: none;

      &::after {
        opacity: 1;
      }
    }

    &--text {
      text-decoration: none;

      color: $gray-900;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  :deep(#{$bl}__title) {
    @include m-s18-h21;

    margin: 0;

    color: $gray-900;
  }

  &__description {
    margin-bottom: 40px;

    textarea {
      @include r-s14-h21;

      display: block;

      box-sizing: border-box;
      width: 100%;
      height: 90px;
      margin-top: 16px;
      padding: 16px;

      resize: none;
      transition: border-color 0.3s;

      color: $blue-gray-600;
      border: 1px solid $blue-gray-50;
      border-radius: 6px;
      outline: none;

      &:focus {
        border-color: $blue-600;
      }
    }

    p {
      margin-bottom: 10px;
    }
  }

  :deep(#{$bl}__plus) {
    display: inline-block;

    width: 14px;
    height: 14px;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: opacity 0.3s;
    vertical-align: middle;

    opacity: 0.8;
    border: none;
    border-radius: 50%;
    outline: none;
    background-color: transparent;
    background-image: url("@/assets/img/icon-plus.svg");
    background-size: cover;

    &:hover {
      opacity: 1;
    }
  }

  :deep(#{$bl}__plus--circle) {
    width: 30px;
    height: 30px;
    margin-top: 10px;

    background-image: url("@/assets/img/icon-add.svg");
  }

  &__links-item {
    margin-top: 16px;

    border-bottom: 1px solid $blue-gray-300;

    &--border_none {
      border-bottom: 0;
    }

    input {
      @include r-s14-h21;

      display: block;

      width: 100%;
      margin-bottom: 10px;

      color: $blue-gray-600;
      border: none;
      outline: none;
    }

    a {
      @include r-s14-h21;

      display: block;

      margin-bottom: 10px;
      padding-right: 24;

      color: $blue-600;

      &::after {
        display: inline-block;

        width: 14px;
        height: 14px;
        margin-left: 10px;

        content: "";
        transition: opacity 0.3s;
        vertical-align: baseline;

        opacity: 0;
        background-image: url("@/assets/img/icon-pencil.svg");
        background-size: cover;
      }

      &:hover {
        text-decoration: underline;

        &::after {
          opacity: 1;
        }
      }
    }
  }

  &__files {
    margin-top: 30px;
    margin-bottom: 20px;

    input {
      display: none;
    }

    p {
      @include r-s14-h21;

      margin-top: 10px;
      margin-bottom: 0;

      color: $blue-gray-300;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;

    width: 410px;
    margin-top: 50px;
  }

  &__tags {
    margin-top: 30px;
  }
}
</style>
