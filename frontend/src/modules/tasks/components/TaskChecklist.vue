<template>
  <div class="task-card__check-list">
    <h2 class="task-card__title">
      Чеклист <button type="button" class="task-card__plus"></button>
    </h2>

    <ul v-if="subtasks.length" class="task-card__list">
      <li v-for="subtask of subtasks" :key="subtask.id" class="task-card__item">
        <div class="task-card__checkbox">
          <label class="checkbox">
            <input type="checkbox" name="remember" :checked="subtask.isDone" />
            <span>{{ subtask.text }}</span>
          </label>
        </div>

        <div class="task-card__icons">
          <app-icon class="icon--edit" />
          <app-icon class="icon--trash" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppIcon from "@/common/components/AppIcon.vue";

defineProps({
  subtasks: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.checkbox {
  display: block;

  [type="checkbox"] {
    position: absolute;

    overflow: hidden;
    clip: rect(0 0 0 0);

    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;

    white-space: nowrap;

    border: 0;

    clip-path: inset(100%);

    &:checked + span::after {
      opacity: 1;
    }
  }

  span {
    @include r-s14-h16;

    position: relative;

    display: block;

    padding-left: 35px;

    color: $blue-gray-600;

    &::before,
    &::after {
      @include p_center-v;

      width: 24px;
      height: 24px;

      content: "";

      border-radius: 4px;
    }

    &::after {
      transition: 0.3s;

      opacity: 0;
      background-image: url("@/assets/img/icon-check.svg");
      background-size: cover;
    }

    &::before {
      box-sizing: border-box;

      border: 1px solid $blue-gray-600;
    }
  }

  [type="text"] {
    @include r-s14-h21;

    display: block;

    width: 100%;
    margin: 0;
    margin-left: -5px;
    padding: 5px 8px;

    cursor: pointer;
    transition: background-color 0.3s;

    color: $gray-900;
    border: none;
    outline: none;
    background-color: transparent;

    &:focus {
      cursor: text;

      background-color: $blue-300;
    }
  }
}

.task-card {
  $bl: ".task-card";

  &__list {
    @include clear-list;

    margin-top: 15px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 10px;

    &:hover {
      #{$bl}__icons {
        opacity: 1;
      }
    }
  }

  &__checkbox {
    flex-grow: 1;

    margin-right: 20px;
  }

  &__icons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 50px;

    transition: opacity 0.3s;

    opacity: 0;
  }
}
</style>
