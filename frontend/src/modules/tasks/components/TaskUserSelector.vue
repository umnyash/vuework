<template>
  <li>
    Участник:
    <div class="task-card__participant">
      <button type="button" class="task-card__link">
        добавить пользователя
      </button>

      <div class="task-card__users">
        <ul class="users-list">
          <li>
            <button type="button" class="users-list__user">
              <img
                :src="getImage('user1.jpg')"
                alt="Вика Некрасова"
                width="30"
                height="30"
              />
              Вика Некрасова
            </button>
          </li>
          <li>
            <button type="button" class="users-list__user">
              <img
                :src="getImage('user2.jpg')"
                alt="Петр Хрустиков"
                width="30"
                height="30"
              />
              Петр Хрустиков
            </button>
          </li>
          <li>
            <button type="button" class="users-list__user">
              <img
                :src="getImage('user3.jpg')"
                alt="Михаил Валерьевич Тян-Шанский"
                width="30"
                height="30"
              />
              Михаил Валерьевич Тян-Шанский
            </button>
          </li>
          <li>
            <button type="button" class="users-list__user">
              <span>N</span>
              Наталья Железнова
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script setup>
import { getImage } from "@/common/helpers";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

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

    display: none;

    box-sizing: border-box;
    width: 210px;

    border-radius: 6px;
    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }
}
</style>
