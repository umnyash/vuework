<template>
  <form
    ref="formElement"
    tabindex="0"
    class="task-card"
    method="post"
    @click.self="handleFormClick"
    @keydown.esc="handleFormEscKeydown"
    @submit.prevent="handleFormSubmit"
  >
    <section class="task-card__wrapper">
      <button
        class="task-card__close"
        type="button"
        @click="handleCloseButtonClick"
      />

      <h1 class="task-card__name">
        <input
          v-model="task.title"
          type="text"
          name="task_name"
          maxlength="37"
          placeholder="Название задачи"
        />
      </h1>
      <p v-if="validations.title.error" class="task-card__field-error">
        {{ validations.title.error }}
      </p>
      <p class="task-card__date">#123456 создана 10 минут назад</p>

      <div class="task-card__priority-status">
        <h2 class="task-card__title">Приоритет</h2>
        <ul class="meta-filter">
          <li
            v-for="{ value, label } of priorityStatuses"
            :key="value"
            class="meta-filter__item"
          >
            <a
              class="meta-filter__status meta-filter__status--color"
              :class="[
                `meta-filter__status--${value}`,
                value === PriorityStatus[task.statusId] &&
                  'meta-filter__status--current',
              ]"
              :title="label"
              @click.prevent="setPriorityStatus(value)"
            />
          </li>
        </ul>
      </div>

      <ul class="task-card__params">
        <task-user-selector v-model="task.userId" />
        <task-due-date-selector v-model="task.dueDate" />
      </ul>

      <div class="task-card__description">
        <h2 class="task-card__title">Описание</h2>
        <app-text-area
          v-model="task.description"
          name="task_description"
          placeholder="Добавьте описание к задаче"
        />
      </div>

      <div class="task-card__links">
        <h2 class="task-card__title">
          Ссылки <button type="button" class="task-card__plus"></button>
        </h2>

        <div class="task-card__links-item">
          <p v-if="validations.url.error" class="task-card__field-error">
            {{ validations.url.error }}
          </p>
          <input
            v-model="task.url"
            type="text"
            name="task_link_url"
            placeholder="Введите url"
          />
          <input
            v-model="task.urlDescription"
            type="text"
            name="task_link_desc"
            placeholder="Добавьте описание к ссылке"
          />
        </div>
      </div>

      <div class="task-card__files">
        <h2 class="task-card__title">Файлы</h2>
        <label class="task-card__plus task-card__plus--circle">
          <input type="file" name="add_file" />
        </label>
      </div>

      <task-checklist
        :subtasks="task.subtasks"
        @subtask-change="handleSubtaskChange"
        @add-subtask-button-click="handleAddSubtaskButtonClick"
        @remove-subtask-button-click="handleRemoveSubtaskButtonClick"
      />

      <task-tags-fieldset v-model="task.tags" />

      <div class="task-card__buttons">
        <app-button class="button--border" @click="handleCancelButtonClick">
          Отменить
        </app-button>
        <app-button type="submit">Сохранить</app-button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { STATUSES } from "@/common/constants";
import { PriorityStatus } from "@/common/enums";
import { createTask, createSubtask } from "@/common/helpers";
import {
  ValidationRule,
  validateFields,
  clearValidationErrors,
} from "@/common/validator";
import AppTextArea from "@/common/components/AppTextArea.vue";
import AppButton from "@/common/components/AppButton.vue";
import TaskUserSelector from "@/modules/tasks/components/TaskUserSelector.vue";
import TaskDueDateSelector from "@/modules/tasks/components/TaskDueDateSelector.vue";
import TaskChecklist from "@/modules/tasks/components/TaskChecklist.vue";
import TaskTagsFieldset from "@/modules/tasks/components/TaskTagsFieldset.vue";

const router = useRouter();
const formElement = ref(null);
const task = ref(createTask());
const priorityStatuses = STATUSES.slice(0, 3);

const validations = reactive({
  title: {
    error: "",
    rules: [ValidationRule.Required],
  },
  url: {
    error: "",
    rules: [ValidationRule.Url],
  },
});

watch(task.value, () => {
  if (validations.title.error || validations.url.error) {
    clearValidationErrors(validations);
  }
});

const setPriorityStatus = (priorityStatus) => {
  const statusId = Object.entries(PriorityStatus).find(
    ([, status]) => priorityStatus === status,
  )[0];

  task.value.statusId = statusId;
};

const closeForm = () => {
  router.push("/");
};

const handleCloseButtonClick = () => {
  closeForm();
};

const handleFormClick = () => {
  closeForm();
};

const handleFormEscKeydown = () => {
  closeForm();
};

const handleCancelButtonClick = () => {
  closeForm();
};

const handleSubtaskChange = (subtask) => {
  const subtaskIndex = task.value.subtasks.findIndex(
    ({ id }) => id === subtask.id,
  );

  task.value.subtasks.splice(subtaskIndex, 1, subtask);
};

const handleAddSubtaskButtonClick = () => {
  const newSubtask = createSubtask();

  if (!task.value.subtasks) {
    task.value.subtasks = [newSubtask];
  } else {
    task.value.subtasks.push(newSubtask);
  }
};

const handleRemoveSubtaskButtonClick = (subtaskId) => {
  const subtaskIndex = task.value.subtasks.findIndex(
    ({ id }) => id === subtaskId,
  );

  task.value.subtasks.splice(subtaskIndex, 1);
};

const handleFormSubmit = () => {
  const isValid = validateFields(task.value, validations);

  if (!isValid) {
    return;
  }
};

onMounted(() => {
  formElement.value.focus();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.meta-filter {
  @include clear-list;

  display: flex;
  align-items: center;

  &__item {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }

  &__status {
    display: block;

    box-sizing: content-box;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: 0.3s;

    border: 1px solid $white-900;
    border-radius: 50%;
    outline: none;
    background-color: transparent;

    &:hover {
      border-color: $blue-600;
    }

    &--color {
      width: 8px;
      height: 8px;
    }

    &--green {
      background-color: $green-600;
    }

    &--orange {
      background-color: $orange-600;
    }

    &--red {
      background-color: $red-600;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}

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
      border-color: $blue-gray-200;
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

  :deep(#{$bl}__title) {
    @include m-s18-h21;

    margin: 0;

    color: $gray-900;
  }

  &__priority-status {
    margin-bottom: 40px;

    ul {
      margin-top: 16px;
    }
  }

  &__description {
    margin-bottom: 40px;

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

  &__buttons {
    display: flex;
    justify-content: space-between;

    width: 410px;
    margin-top: 50px;
  }

  &__comments,
  &__tags {
    margin-top: 30px;
  }

  &__field-error {
    margin: 0 0 8px;
    color: $red-600;
    @include r-s10-h12;
  }
}
</style>
