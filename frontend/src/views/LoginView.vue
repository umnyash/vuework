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

    <form
      class="sign-form__shape"
      novalidate
      @submit.prevent="handleFormSubmit"
    >
      <label class="sign-form__input">
        <app-text-field
          v-model="authData.email"
          name="email"
          type="email"
          placeholder="E-mail"
          required
          :error-text="validations.email.error"
        />
      </label>
      <label class="sign-form__input">
        <app-text-field
          v-model="authData.password"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          :error-text="validations.password.error"
        />
      </label>

      <div class="sign-form__wrap">
        <app-button
          type="submit"
          :disabled="isSubmitting"
          :class="{ 'button--disabled': isSubmitting }"
        >
          Войти
        </app-button>
      </div>
      <div v-if="serverErrorMessage" class="sign-form__error-message">
        {{ serverErrorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  ValidationRule,
  validateFields,
  clearValidationErrors,
} from "@/common/validator";
import { useAuthStore } from "@/stores";
import AppTextField from "@/common/components/AppTextField.vue";
import AppButton from "@/common/components/AppButton.vue";

const authData = reactive({
  email: "",
  password: "",
});

const validations = reactive({
  email: {
    error: "",
    rules: [ValidationRule.Required, ValidationRule.Email],
  },
  password: {
    error: "",
    rules: [ValidationRule.Required],
  },
});

watch(authData, () => {
  if (validations.email.error || validations.password.error) {
    clearValidationErrors(validations);
  }
});

const serverErrorMessage = ref("");
const isSubmitting = ref(false);

const authStore = useAuthStore();

const handleFormSubmit = async () => {
  const isValid = validateFields(authData, validations);

  if (!isValid) {
    return;
  }

  serverErrorMessage.value = "";
  isSubmitting.value = true;

  const responseMessage = await authStore.login(
    authData.email,
    authData.password,
  );

  if (responseMessage === "ok") {
    await authStore.getMe();
    router.push("/");
  } else {
    isSubmitting.value = false;
    serverErrorMessage.value = responseMessage;
  }
};
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

  &__error-message {
    color: $red-600;
    margin-top: 16px;
    @include r-s14-h16;
  }
}
</style>
