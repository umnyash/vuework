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

export const dropTaskToColumn = ({
  columnId,
  columnTasks,
  hoveredTask,
  droppedTask,
  emit,
}) => {
  if (droppedTask.id === hoveredTask?.id) {
    return;
  }

  const droppedTaskCopy = { ...droppedTask, columnId: columnId };
  const columnTasksCopy = columnTasks.slice();

  const droppedTaskIndex = columnTasksCopy.findIndex(
    (task) => droppedTask.id === task.id,
  );

  const hoveredTaskIndex =
    hoveredTask &&
    columnTasksCopy.findIndex((task) => hoveredTask.id === task.id);

  const isDropFromAnotherColumn = droppedTaskIndex === -1;

  if (!isDropFromAnotherColumn) {
    columnTasksCopy.splice(droppedTaskIndex, 1);
  }

  if (hoveredTask) {
    columnTasksCopy.splice(hoveredTaskIndex, 0, droppedTaskCopy);
  } else {
    columnTasksCopy.push(droppedTaskCopy);
  }

  const tasksWithNewSortOrder = [];

  columnTasksCopy.forEach((task, index) => {
    if (task.sortOrder !== index || task.id === droppedTask.id) {
      tasksWithNewSortOrder.push({ ...task, sortOrder: index });
    }
  });

  emit("updateTasks", tasksWithNewSortOrder);
};
