<template>
  <app-drop
    class="column"
    @drop="
      dropTaskToColumn({
        droppedTask: $event,
        ...dropConfig,
      })
    "
  >
    <h2 class="column__name">
      <span v-if="!state.isTitleEditing">{{ state.title }}</span>

      <input
        v-else
        ref="titleFieldElementRef"
        v-model="state.title"
        class="column__title-field"
        name="column-title"
        type="text"
        @blur="finishTitleEditing"
      />

      <app-icon
        v-if="!state.isTitleEditing"
        class="column__button column__update icon--edit"
        @click="startTitleEditing"
      />

      <app-icon
        v-if="!state.isTitleEditing && !tasks.length"
        class="column__button column__delete icon--trash"
        @click="columnsStore.deleteColumn(column.id)"
      />
    </h2>
    <div class="column__target-area">
      <!-- Задачи -->
      <div v-for="task in sortedTasks" :key="task.id" class="column__task">
        <task-card
          :task="task"
          @drop="
            dropTaskToColumn({
              hoveredTask: task,
              droppedTask: $event,
              ...dropConfig,
            })
          "
        />
      </div>
    </div>
  </app-drop>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from "vue";
import { dropTaskToColumn } from "@/common/helpers";
import { useColumnsStore } from "@/columns";
import AppDrop from "@/common/components/AppDrop.vue";
import AppIcon from "@/common/components/AppIcon.vue";
import TaskCard from "@/modules/tasks/components/TaskCard.vue";

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  tasks: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["updateTasks"]);

const columnsStore = useColumnsStore();
const titleFieldElementRef = ref(null);

const state = reactive({
  title: props.column.title,
  isTitleEditing: false,
});

const startTitleEditing = async () => {
  state.isTitleEditing = true;
  await nextTick();
  titleFieldElementRef.value.focus();
};

const finishTitleEditing = () => {
  state.isTitleEditing = false;

  if (props.column.title === state.title) {
    return;
  }

  columnsStore.updateColumn({
    ...props.column,
    title: state.title,
  });
};

const sortedTasks = computed(() =>
  props.tasks.toSorted((a, b) => a.sortOrder - b.sortOrder),
);

const dropConfig = computed(() => ({
  columnId: props.column.id,
  columnTasks: sortedTasks.value,
  emit,
}));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.column {
  $bl: &;

  display: flex;
  flex-direction: column;

  padding-top: 15px;

  border-left: 1px solid $blue-gray-200;

  &__name,
  &__title-field {
    @include m-s14-h21;

    display: flex;
    align-items: center;

    margin: 0 8px;

    color: $blue-gray-600;

    &:hover {
      #{$bl}__button {
        opacity: 1;
      }
    }
  }

  &__title-field {
    margin: 0;
    padding: 0;

    border: none;
    border-bottom: 1px solid $blue-gray-200;
    outline: none;
  }

  &__target-area {
    overflow-y: auto;
    flex-grow: 1;

    min-width: 224px;
    max-width: 380px;
    height: 1px;
    padding-right: 8px;
    padding-bottom: 30px;
    padding-left: 8px;

    @media (min-width: 1500px) {
      min-width: 244px;
    }
  }

  &__task {
    display: block;

    width: 100%;
    margin-top: 16px;
  }

  &__button {
    margin: 0;
    padding: 0;

    transition: opacity 0.3s;
    transform: scale(0.8);

    opacity: 0;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &__update {
    margin-right: 5px;
    margin-left: 5px;
  }
}
</style>
