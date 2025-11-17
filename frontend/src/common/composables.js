import { computed } from "vue";
import { getTimeSince } from "./helpers";

export const useTaskDate = (task) =>
  computed(() => `#${task.id} создана ${getTimeSince(task.createdAt)}`);
