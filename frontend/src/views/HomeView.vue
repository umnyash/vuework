<template>
  <section class="desk">
    <router-view
      :tasks="tasks"
      @task-form-submit="$emit('taskFormSubmit', $event)"
      @task-remove="$emit('taskRemove', $event)"
    />

    <!-- Шапка доски -->
    <div class="desk__header">
      <h1 class="desk__title">Design Coffee Lab</h1>
      <button class="desk__add" type="button" @click="columnsStore.addColumn">
        Добавить столбец
      </button>
      <div class="desk__filters">
        <div class="desk__user-filter">
          <!-- Список пользователей -->
          <ul class="user-filter">
            <li
              v-for="user in usersStore.users"
              :key="user.id"
              :title="user.name"
              class="user-filter__item"
            >
              <a
                class="user-filter__button"
                :class="{
                  'user-filter__button--current': filter.userIds.includes(
                    user.id,
                  ),
                }"
                @click.prevent="
                  $emit('updateFilter', {
                    key: TasksFilter.USER_IDS,
                    value: user.id,
                  })
                "
              >
                <img
                  :src="getImage(user.avatar)"
                  width="24"
                  height="24"
                  alt="Аватар юзера"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="desk__meta-filter">
          <!-- Список статусов -->
          <ul class="meta-filter">
            <li
              v-for="{ value, label, filterKey } in STATUSES"
              :key="value"
              class="meta-filter__item"
            >
              <a
                class="meta-filter__status meta-filter__status--color"
                :class="[
                  `meta-filter__status--${value}`,
                  {
                    'meta-filter__status--current':
                      filter[filterKey].includes(value),
                  },
                ]"
                :title="label"
                @click.prevent="
                  $emit('updateFilter', { key: filterKey, value })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Колонки и задачи -->
    <div v-if="columnsStore.columns.length" class="desk__columns">
      <desk-column
        v-for="column in columnsStore.columns"
        :key="column.id"
        :column="column"
        :tasks="tasksGroupedByColumn[column.id]"
        @update-tasks="$emit('updateTasks', $event)"
      />
    </div>

    <!-- Пустая доска -->
    <p v-else class="desk__emptiness">Пока нет ни одной колонки</p>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { getImage } from "@/common/helpers";
import { STATUSES } from "@/common/constants";
import { TasksFilter } from "@/common/enums";
import { useUsersStore, useColumnsStore } from "@/stores";
import DeskColumn from "@/modules/columns/components/DeskColumn.vue";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  filter: {
    type: Object,
    required: true,
  },
});

defineEmits(["updateFilter", "updateTasks", "taskFormSubmit", "taskRemove"]);

const usersStore = useUsersStore();
const columnsStore = useColumnsStore();

const tasksGroupedByColumn = computed(() =>
  props.tasks.reduce((accumulator, task) => {
    if (!task.columnId) {
      return accumulator;
    }

    if (!accumulator[task.columnId]) {
      accumulator[task.columnId] = [];
    }

    accumulator[task.columnId].push(task);

    return accumulator;
  }, {}),
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.content {
  display: flex;
  flex-grow: 1;
}

.desk {
  $bl: ".desk";

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: calc(100% - 400px);
  padding-top: 27px;

  background-color: $white-900;

  &__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-bottom: 24px;
    padding: 0 17px;
  }

  &__title {
    @include m-s24-h21;

    margin: 0;
    margin-right: auto;

    color: $black-900;
  }

  &__add {
    @include m-s10-h12;

    position: relative;

    margin: 0;
    padding: 0;
    padding-left: 32px;

    cursor: pointer;

    color: $blue-gray-600;
    border: none;
    outline: none;
    background-color: transparent;

    &::before {
      @include p_center-v;

      width: 23px;
      height: 23px;

      content: "";

      background-image: url("@/assets/img/icon-add.svg");
    }

    &:hover {
      color: $blue-600;
    }

    &:active {
      color: $blue-300;
    }
  }

  &__filters {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin-top: 16px;
  }

  &__user-filter {
    margin-right: 40px;
  }

  &__columns {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex-grow: 1;

    border-top: 1px solid $blue-gray-200;
  }
}

.user-filter {
  @include clear-list;

  display: flex;
  flex-direction: row-reverse;

  &__item {
    margin-right: -4px;
  }

  &__button {
    display: block;
    overflow: hidden;

    width: 24px;
    height: 24px;

    cursor: pointer;
    transition: 0.3s;

    border: 1px solid $white-900;
    border-radius: 50%;
    outline: none;
    background-color: $blue-gray-50;

    &:hover {
      border-color: $blue-600;
    }

    img {
      display: block;

      width: 24px;
      height: 24px;
    }

    span {
      @include m-s14-h21;

      display: block;

      width: 100%;
      height: 100%;
      padding-top: 1px;

      text-align: center;

      color: $white-900;
      background-color: $green-700;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}

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

    &--time {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-time.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--alert {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-alert.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}
</style>
