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
        <span>Утвердить критерии</span>
        <app-icon class="icon--edit" />
      </h1>

      <p class="task-card__date">#123456 создана 10 минут назад</p>

      <ul class="task-card__params">
        <li>
          Участник:
          <div class="task-card__participant">
            <button type="button" class="task-card__user">
              <img :src="getImage('user1.jpg')" alt="Вика Некрасова" />
              Вика Некрасова
            </button>
          </div>
        </li>
        <li>
          Срок:
          <button type="button" class="task-card__link task-card__link--text">
            19.10.2020 19:00
          </button>
        </li>
      </ul>

      <div class="task-card__description">
        <h2 class="task-card__title">Описание</h2>
        <p>Проверить и утвердить критерии качества</p>
      </div>

      <div class="task-card__links">
        <h2 class="task-card__title">
          Ссылки <button type="button" class="task-card__plus"></button>
        </h2>

        <div class="task-card__links-item task-card__links-item--border_none">
          <a href="#">Ссылка на гугл-диск с маркетинговыми материалами</a>
        </div>
      </div>

      <div class="task-card__files">
        <h2 class="task-card__title">Файлы</h2>
        <p>Нет прикрепленных файлов</p>
      </div>

      <div class="task-card__check-list">
        <h2 class="task-card__title">
          Чеклист <button type="button" class="task-card__plus"></button>
        </h2>

        <ul class="task-card__list">
          <li class="task-card__item">
            <div class="task-card__checkbox">
              <label class="checkbox">
                <input type="checkbox" name="remember" />
                <span>Текст</span>
              </label>
            </div>

            <div class="task-card__icons">
              <app-icon class="icon--edit" />
              <app-icon class="icon--trash" />
            </div>
          </li>
        </ul>
      </div>

      <div class="task-card__comments">
        <h2 class="task-card__title">Комментарии</h2>
        <div class="comments">
          <ul class="comments__list">
            <li class="comments__item">
              <div class="comments__user">
                <img
                  :src="getImage('user1.jpg')"
                  alt="Вика Некрасова"
                  width="30"
                  height="30"
                />
                Вика Некрасова
              </div>
              <p><strong>@petr</strong> Окей. Посмотрю</p>
            </li>
            <li class="comments__item">
              <div class="comments__user">
                <img
                  :src="getImage('user2.jpg')"
                  alt="Петр Хрустиков"
                  width="30"
                  height="30"
                />
                Петр Хрустиков
              </div>
              <p>Добавил несколько замечаний к критерию Б10</p>
            </li>
          </ul>

          <form action="#" class="comments__form" method="post">
            <textarea
              name="comment_text"
              placeholder="Введите текст комментария"
            ></textarea>
            <button type="submit">Написать комментарий</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getImage } from "@/common/helpers";
import AppIcon from "@/common/components/AppIcon.vue";

const router = useRouter();
const cardElement = ref(null);

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

  &__title {
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

  &__plus {
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

    &--circle {
      width: 30px;
      height: 30px;
      margin-top: 10px;

      background-image: url("@/assets/img/icon-add.svg");
    }

    &:hover {
      opacity: 1;
    }
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

  &__comments {
    margin-top: 30px;
  }
}
</style>
