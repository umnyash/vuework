<template>
  <li>
    Участник:
    <div class="task-card__participant">
      <button
        v-if="modelValue"
        class="task-card__user"
        type="button"
        @click.stop="handlePerformerButtonClick"
      >
        <img :src="getImage(performer.avatar)" :alt="performer.name" />
        {{ performer.name }}
      </button>

      <button
        v-else
        type="button"
        class="task-card__link"
        @click.stop="handleAddPerformerButtonClick"
      >
        добавить пользователя
      </button>

      <div
        v-if="isListOpen"
        v-outside-click="closeList"
        class="task-card__users"
      >
        <ul class="users-list">
          <li v-for="user in usersJSON" :key="user.id">
            <button
              type="button"
              class="users-list__user"
              @click="selectUser(user.id)"
            >
              <img
                :src="getImage(user.avatar)"
                :alt="user.name"
                width="30"
                height="30"
              />
              {{ user.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from "vue";
import usersJSON from "@/mocks/users.json";
import { getImage } from "@/common/helpers";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const performer = computed(() =>
  usersJSON.find((user) => props.modelValue === user.id),
);

const isListOpen = ref(false);

const openList = () => {
  isListOpen.value = true;
};

const closeList = () => {
  isListOpen.value = false;
};

const handleAddPerformerButtonClick = () => {
  openList();
};

const handlePerformerButtonClick = () => {
  openList();
};

const selectUser = (userId) => {
  closeList();
  emit("update:modelValue", userId);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.users-list {
  @include clear-list;

  padding: 8px;

  li {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__user {
    @include r-s14-h16;

    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;
    padding: 0;

    cursor: pointer;
    text-align: left;

    border: none;
    outline: none;
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
}

.task-card {
  &__participant {
    position: relative;

    display: inline-block;

    vertical-align: baseline;
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

  &__users {
    position: absolute;
    z-index: 10;
    top: -12px;
    left: 0;

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
}
</style>
