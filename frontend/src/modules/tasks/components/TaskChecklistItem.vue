<template>
  <li class="task-card__item">
    <div class="task-card__checkbox">
      <label class="checkbox">
        <input
          type="checkbox"
          name="remember"
          :checked="subtask.isDone"
          :disabled="disabled"
          @change="
            emit('change', { ...subtask, isDone: $event.target.checked })
          "
        />
        <span>
          <input
            v-if="state.isEditing"
            ref="descriptionFieldElementRef"
            v-model="state.description"
            type="text"
            name="checkbox_name"
            :maxlength="SUBTASK_DESCRIPTION_MAX_LENGTH"
            placeholder="Введите текст пункта"
            @blur="finishDescriptionEditing"
          />
          <template v-else>{{ state.description }}</template>
        </span>
      </label>
    </div>

    <div v-if="authStore.isAdmin" class="task-card__icons">
      <app-icon
        class="icon--edit"
        :style="editButtonStyleObject"
        @click="startDescriptionEditing"
      />
      <app-icon
        class="icon--trash"
        @click="emit('removeButtonClick', subtask.id)"
      />
    </div>
  </li>
</template>

<script setup>
import { reactive, ref, nextTick, computed } from "vue";
import { SUBTASK_DESCRIPTION_MAX_LENGTH } from "@/common/constants";
import { useAuthStore } from "@/stores";
import AppIcon from "@/common/components/AppIcon.vue";

const props = defineProps({
  subtask: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change", "removeButtonClick"]);

const authStore = useAuthStore();

const descriptionFieldElementRef = ref(null);

const state = reactive({
  description: props.subtask.text,
  isEditing: false,
});

const editButtonStyleObject = computed(() => ({
  visibility: state.isEditing ? "hidden" : "visible",
}));

const startDescriptionEditing = async () => {
  state.isEditing = true;
  await nextTick();
  descriptionFieldElementRef.value.focus();
};

const finishDescriptionEditing = async () => {
  state.isEditing = false;

  if (props.subtask.text === state.description) {
    return;
  }

  emit("change", { ...props.subtask, text: state.description });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

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
}
</style>
