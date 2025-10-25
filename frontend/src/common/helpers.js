import { DAY_IN_MILLISEC, TAG_SEPARATOR } from "./constants";
import { PriorityStatus, TimeStatus } from "./enums";

const parseTags = (tags) => tags.split(TAG_SEPARATOR).slice(1);

const determineTimeStatus = (dueDate) => {
  if (!dueDate) {
    return "";
  }

  const currentTime = Date.now();
  const taskTime = Date.parse(dueDate);
  const timeDelta = taskTime - currentTime;

  if (timeDelta > DAY_IN_MILLISEC) {
    return "";
  }

  return timeDelta > 0 ? TimeStatus.DEADLINE : TimeStatus.EXPIRED;
};

export const normalizeTask = (task) => ({
  ...task,
  tags: parseTags(task.tags),
  priority: PriorityStatus[task.statusId] ?? "",
  timeStatus: determineTimeStatus(task.dueDate),
});

export const getImage = (image) =>
  new URL(`src/assets/img/${image}`, new URL(import.meta.url).origin).href;
