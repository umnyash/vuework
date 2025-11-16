<template>
  <app-drop @drop="$emit('drop', $event)">
    <app-drag :transfer-data="task">
      <div
        class="task"
        :class="{ 'task--backlog': inBacklog }"
        @click="handleTaskClick"
      >
        <div v-if="task.user" class="task__user">
          <div class="task__avatar">
            <img
              :src="getImage(task.user.avatar)"
              width="20"
              height="20"
              :alt="task.user.name"
            />
          </div>
          {{ task.user.name }}
        </div>

        <div class="task__statuses">
          <span
            v-if="task.priority"
            class="task__status task__status--color"
            :class="`task__status--${task.priority}`"
          />
          <span
            v-if="task.timeStatus"
            class="task__status"
            :class="`task__status--${task.timeStatus}`"
          />
        </div>

        <h5 class="task__title" :class="{ 'task__title--first': !task.user }">
          {{ task.title }}
        </h5>
        <task-tags v-if="task.tags.length" :tags="task.tags" />
      </div>
    </app-drag>
  </app-drop>
</template>

<script setup>
import { useRouter } from "vue-router";
import AppDrag from "@/common/components/AppDrag.vue";
import AppDrop from "@/common/components/AppDrop.vue";
import TaskTags from "./TaskTags.vue";
import { getImage } from "@/common/helpers";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  inBacklog: {
    type: Boolean,
  },
});

defineEmits(["drop"]);

const router = useRouter();

const handleTaskClick = () => {
  router.push({ path: `/${props.task.id}` });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.task {
  $bl: ".task";

  display: flex;
  flex-wrap: wrap;

  padding: 8px;

  cursor: pointer;

  border-radius: 6px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  &--backlog {
    box-shadow: none;

    #{$bl}__title {
      order: -2;

      max-width: 290px;
      margin-top: 0;
      margin-right: auto;
    }

    #{$bl}__statuses {
      order: -1;

      margin-left: 20px;
    }
  }

  &__user {
    @include m-s10-h21;

    display: flex;
    align-items: center;

    max-width: 80%;
    margin-right: auto;
  }

  &__avatar {
    margin-right: 4px;

    img {
      display: block;

      width: 20px;
      height: 20px;
    }
  }

  &__statuses {
    display: flex;
    align-items: center;
    align-self: flex-start;

    height: 16px;
    margin-top: 3px;
  }

  &__status {
    margin-left: 8px;

    border-radius: 50%;

    &:first-child {
      margin-left: 0;
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
  }

  &__title {
    @include r-s14-h21;

    width: 100%;
    margin-top: 9px;
    margin-bottom: 0;
  }
}
</style>
