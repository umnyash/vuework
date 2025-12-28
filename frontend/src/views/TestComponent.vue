<template>
  <main class="content">
    <section class="desk">
      <div class="desk__header">
        <h1 class="desk__title" data-test="desk-title">Design Coffee Lab</h1>
        <button
          class="desk__add"
          type="button"
          data-test="desk-add"
          @click="columnsStore.addColumn"
        >
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
                data-test="user-filter"
              >
                <a
                  class="user-filter__button"
                  :class="{
                    'user-filter__button--current': filterStore[
                      TasksFilter.USER_IDS
                    ].includes(user.id),
                  }"
                  @click.prevent="
                    filterStore.update({
                      key: TasksFilter.USER_IDS,
                      value: user.id,
                    })
                  "
                >
                  <img
                    :src="getPublicImage(user.avatar)"
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
                data-test="status-filter"
              >
                <a
                  class="meta-filter__status meta-filter__status--color"
                  :class="[
                    `meta-filter__status--${value}`,
                    {
                      'meta-filter__status--current':
                        filterStore[filterKey].includes(value),
                    },
                  ]"
                  :title="label"
                  @click.prevent="filterStore.update({ key: filterKey, value })"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="columnsStore.columns.length" class="desk__columns">
        <desk-column
          v-for="column in columnsStore.columns"
          :key="column.id"
          :column="column"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { getPublicImage } from "@/common/helpers";
import { STATUSES } from "@/common/constants";
import { TasksFilter } from "@/common/enums";
import { useUsersStore, useFilterStore, useColumnsStore } from "@/stores";
import DeskColumn from "@/modules/columns/components/DeskColumn.vue";

const usersStore = useUsersStore();
const filterStore = useFilterStore();
const columnsStore = useColumnsStore();
</script>

<style lang="scss" scoped></style>
