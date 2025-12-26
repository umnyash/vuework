<template>
  <app-drop
    class="backlog"
    :class="{ 'backlog--hide': state.isHidden }"
    @drop="
      dropTaskToColumn({
        droppedTask: $event,
        ...dropConfig,
      })
    "
  >
    <button class="backlog__title" @click="state.isHidden = !state.isHidden">
      <span>Бэклог</span>
    </button>

    <div class="backlog__scroll">
      <div class="backlog__collapse">
        <div v-if="authStore.user" class="backlog__user">
          <div class="backlog__account">
            <img
              :src="getPublicImage(authStore.user.avatar)"
              alt="Ваш аватар"
              width="32"
              height="32"
            />
            {{ authStore.user.name }}
          </div>

          <div class="backlog__counter">
            {{ tasksStore.backlogTasks.length }}
          </div>
        </div>

        <div class="backlog__target-area">
          <transition-group name="tasks">
            <task-card
              v-for="task in tasksStore.backlogTasks"
              :key="task.id"
              class="backlog__task"
              :task="task"
              in-backlog
              @drop="
                dropTaskToColumn({
                  hoveredTask: task,
                  droppedTask: $event,
                  ...dropConfig,
                })
              "
            />
          </transition-group>
        </div>
      </div>
    </div>
  </app-drop>
</template>

<script setup>
import { reactive, computed } from "vue";
import { getPublicImage } from "@/common/helpers";
import { useAuthStore, useTasksStore } from "@/stores";
import AppDrop from "@/common/components/AppDrop.vue";
import TaskCard from "@/modules/tasks/components/TaskCard.vue";
import { dropTaskToColumn } from "@/common/helpers";

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const state = reactive({
  isHidden: false,
});

const dropConfig = computed(() => ({
  columnId: null,
  columnTasks: tasksStore.backlogTasks,
  tasksStore,
}));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.backlog {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex-grow: 1;

  min-width: 400px;
  max-width: 400px;
  padding-top: 16px;

  background-color: $gray-100;

  $bl: ".backlog";

  &__title {
    position: relative;

    height: 26px;
    margin-bottom: 5px;
    margin-left: 12px;
    padding-left: 28px;

    cursor: pointer;
    text-align: left;

    color: $blue-gray-600;
    border: none;
    background-color: transparent;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;

      width: 24px;
      height: 24px;

      content: "";
      transition: $animationSpeed;
      transform: translateY(-53%) rotate(180deg);

      background-image: url("@/assets/img/arrow-right.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    span {
      @include m-s14-h21;
    }
  }

  &--hide {
    min-width: 50px;
    max-width: 50px;

    #{$bl}__title {
      span {
        display: none;
      }

      &::before {
        transform: translateY(-53%);
      }
    }

    #{$bl}__scroll {
      visibility: hidden;
      overflow: hidden;
    }
  }

  &__scroll {
    overflow-y: auto;
    flex-grow: 1;

    height: 1px;
    padding-bottom: 20px;
  }

  &__collapse {
    padding-bottom: 1px;

    border-bottom: 1px solid $blue-gray-200;
  }

  &__user {
    display: flex;
    align-items: center;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 15px 12px;

    text-align: left;

    border: none;
    outline: none;
    background-color: transparent;

    &:active {
      color: inherit;
    }
  }

  &__account {
    display: flex;
    align-items: center;

    max-width: 80%;
    margin-right: auto;

    @include m-s18-h21;

    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;

      border-radius: 50%;
    }
  }

  &__counter {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    padding-top: 6px;
    margin-left: auto;

    text-align: center;

    border-radius: 50%;
    background-color: $blue-gray-100;

    @include m-s18-h21;
  }

  &__arrow {
    width: 10px;
    height: 30px;
    margin: 0 0 0 18px;
    padding: 0;

    cursor: pointer;

    border: none;
    outline: none;
    background-color: transparent;
    background-image: url("@/assets/img/icon-arrow.svg");
    background-repeat: no-repeat;
    background-position: center;

    &--top {
      transform: rotate(180deg);
    }
  }

  &__task {
    margin-right: 12px;
    margin-bottom: 11px;
    margin-left: 12px;
  }
}

.tasks-enter-active,
.tasks-leave-active {
  transition: all $animationSpeed ease;
}

.tasks-enter-from,
.tasks-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
