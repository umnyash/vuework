<template>
  <li class="due-date-selector">
    Срок:
    <div class="due-date-selector__buttons-wrapper">
      <button
        type="button"
        class="due-date-selector__open-button"
        :class="date && 'due-date-selector__open-button--text'"
        @click.stop="openCalendar"
      >
        {{ calendarButtonText }}
      </button>
      <app-icon
        v-if="date"
        class="due-date-selector__remove-button icon--trash"
        @click="handleRemoveButtonClick"
      />
      <div
        v-if="isCalendarOpen"
        v-outside-click="closeCalendar"
        class="due-date-selector__calendar-wrapper"
      >
        <date-picker
          ref="datePickerRef"
          v-model="date"
          minimum-view="time"
          :locale="ru"
          :lower-limit="new Date()"
          class="date-picker__field"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import DatePicker from "vue3-datepicker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { TASK_DUE_DATE_FORMAT } from "@/common/constants";
import AppIcon from "@/common/components/AppIcon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const datePickerRef = ref(null);
const isCalendarOpen = ref(false);

const date = computed({
  get() {
    return props.modelValue && new Date(props.modelValue);
  },
  set(value) {
    emit("update:modelValue", value.toISOString());
  },
});

const calendarButtonText = computed(() =>
  date.value ? format(date.value, TASK_DUE_DATE_FORMAT) : "установить срок",
);

const openCalendar = async () => {
  isCalendarOpen.value = true;
  await nextTick();
  datePickerRef.value?.renderView(datePickerRef.value.initialView);
};

const closeCalendar = () => {
  isCalendarOpen.value = false;
};

const handleRemoveButtonClick = () => {
  emit("update:modelValue", null);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.due-date-selector {
  &__buttons-wrapper {
    position: relative;
    display: inline-flex;
  }

  &__open-button {
    @include r-s16-h21;

    position: relative;
    display: inline-block;

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

  &__remove-button {
    margin-left: 10px;
    transform: scale(0.8);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
  }

  &__buttons-wrapper:hover &__remove-button {
    visibility: visible;
    opacity: 1;
  }

  &__calendar-wrapper {
    position: absolute;
    top: 0;
  }

  --vdp-hover-bg-color: #1e88e5;
  --vdp-selected-bg-color: #1e88e5;

  :deep(.date-picker__field) {
    display: none;
  }
}
</style>
