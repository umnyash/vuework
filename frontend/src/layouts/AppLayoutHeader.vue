<template>
  <header class="header">
    <!-- Логотип -->
    <div class="header__logo">
      <router-link class="logo" to="/">
        <img
          src="@/assets/img/logo.svg"
          width="147"
          height="23"
          alt="VueWork logo"
        />
      </router-link>
    </div>

    <!-- Поиск -->
    <form class="header__search" action="#">
      <input
        name="search"
        type="search"
        required
        placeholder="Поиск"
        @input="
          filterStore.update({
            key: TasksFilter.SEARCH_QUERY,
            value: $event.target.value,
          })
        "
      />
      <button type="submit">Найти</button>
    </form>

    <!-- Кнопка создания новой задачи -->
    <router-link
      v-if="authStore.isAdmin"
      class="header__create-task"
      to="/tasks/create"
    >
      Создать карточку
    </router-link>

    <template v-if="authStore.user">
      <!-- Аватар пользователя -->
      <a class="header__user" href="#" @click.prevent.stop="openUserMenu">
        <img
          :src="getPublicImage(authStore.user?.avatar)"
          width="40"
          height="40"
          :alt="authStore.user.name"
        />
      </a>

      <!-- Меню пользователя -->
      <div
        v-if="isUserMenuOpen"
        v-outside-click="closeUserMenu"
        class="header__menu"
      >
        <div class="user-menu">
          <img
            :src="getPublicImage(authStore.user?.avatar)"
            width="56"
            height="56"
            :alt="authStore.user.name"
          />
          <span>{{ authStore.user.name }}</span>
          <a class="user-menu__link" href="#" @click.prevent="authStore.logout">
            Выйти
          </a>
        </div>
      </div>
    </template>

    <router-link v-else class="header__login" to="/login">Войти</router-link>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { TasksFilter } from "@/common/enums";
import { getPublicImage } from "@/common/helpers";
import { useAuthStore, useFilterStore } from "@/stores";

const authStore = useAuthStore();
const filterStore = useFilterStore();
const isUserMenuOpen = ref(false);

const openUserMenu = () => {
  isUserMenuOpen.value = true;
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds-system";

.user-menu {
  width: 240px;
  padding-top: 32px;
  padding-bottom: 24px;
  text-align: center;
  border-radius: 6px 0 0 6px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  img {
    display: block;
    margin: 0 auto;
  }

  span {
    @include m-s18-h21;
    display: block;
    margin-top: 16px;
    margin-bottom: 8px;
    padding-bottom: 16px;
    color: $black-900;
    border-bottom: 1px solid $blue-gray-50;
  }

  &__link {
    @include m-s14-h21;
    display: block;
    margin-top: 16px;
    color: $blue-gray-600;
  }
}

.header {
  position: relative;

  display: flex;
  align-items: center;

  padding: 15px 12px;

  background-color: $blue-600;
  box-shadow: 0 2px 4px $shadow-400;

  &__logo {
    margin-right: auto;
  }

  &__search {
    position: relative;

    margin-right: 18px;

    input {
      @include m-s14-h21;

      margin: 0;
      padding-top: 11px;
      padding-right: 11px;
      padding-bottom: 11px;
      padding-left: 40px;

      color: $white-900;
      border: 1px solid $white-800;
      border-radius: 6px;
      background-color: transparent;
    }

    button {
      position: absolute;
      top: 50%;
      left: 11px;

      overflow: hidden;

      width: 17px;
      height: 17px;
      padding: 0;

      transform: translateY(-50%);

      color: transparent;
      border: none;
      outline: none;
      background-color: transparent;
      background-image: url("@/assets/img/icon-search.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &__create-task {
    @include m-s14-h21;

    margin-right: 18px;
    padding-top: 13px;
    padding-right: 14px;
    padding-bottom: 11px;
    padding-left: 14px;

    transition: background-color 0.3s;
    text-transform: uppercase;

    color: $black-700;
    border-radius: 6px;
    background: $white-800;
    box-shadow: 0 4px 8px $shadow-500;

    &:hover {
      background-color: $yellow-300;
    }
  }

  &__login {
    @include m-s14-h21;

    position: relative;

    padding-left: 28px;

    cursor: pointer;

    color: $white-900;

    &::before {
      position: absolute;
      top: -3px;
      left: 0;

      width: 16px;
      height: 21px;

      content: "";

      background-image: url("@/assets/img/login.svg");
    }
  }

  &__user {
    cursor: pointer;

    img {
      display: block;

      width: 40px;
      height: 40px;

      border-radius: 50%;
    }
  }

  &__menu {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
  }
}
</style>
