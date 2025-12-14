<template>
  <div class="sign-form sign-in">
    <div class="sign-form__header">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="VueWork logo"
          width="147"
          height="23"
        />
      </router-link>

      <button
        class="sign-form__close"
        type="button"
        @click="router.push('/')"
      />
    </div>

    <h3 class="sign-form__title">Войти</h3>

    <form action="#" method="post" class="sign-form__shape">
      <label class="sign-form__input">
        <app-text-field
          name="email"
          type="email"
          placeholder="E-mail"
          required
        />
      </label>
      <label class="sign-form__input">
        <app-text-field
          name="password"
          type="password"
          placeholder="Пароль"
          required
        />
      </label>

      <div class="sign-form__wrap">
        <app-button type="submit">Войти</app-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import AppTextField from "@/common/components/AppTextField.vue";
import AppButton from "@/common/components/AppButton.vue";

const router = useRouter();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.sign-form {
  display: block;

  width: 628px;

  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  @include pf_center-all;

  &__shape {
    padding-right: 64px;
    padding-bottom: 64px;
    padding-left: 64px;
  }

  &__header {
    display: flex;
    justify-content: space-between;

    padding: 25px 25px 25px 64px;

    background-color: $blue-600;
  }

  &__title {
    margin: 30px 0;

    text-align: center;

    color: $blue-gray-600;

    @include m-s24-h21;
  }

  &__input {
    display: block;

    margin-bottom: 16px;
  }

  &__checkbox {
    margin-top: 20px;
  }

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 30px;
  }

  &__link {
    color: $blue-600;

    &:hover {
      text-decoration: underline;
    }
  }

  &__close {
    position: relative;

    width: 20px;
    height: 20px;

    cursor: pointer;

    border: none;
    background-color: transparent;

    &::after,
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 100%;
      height: 1px;

      content: "";
      transition: background-color $animationSpeed;

      background-color: $white-900;
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
        opacity: 0.6;
      }
    }
  }
}
</style>
