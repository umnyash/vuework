import { uniqueId } from "lodash";
import {
  SEC,
  MINUTE_IN_SEC,
  HOUR_IN_SEC,
  DAY_IN_SEC,
  DAY_IN_MILLISEC,
  MONTH_IN_SEC,
  YEAR_IN_SEC,
  TAG_SEPARATOR,
  COLUMN_ID_PREFIX,
  COLUMN_DEFAULT_TITLE,
  SECOND_iN_SEC,
  SUBTASK_DEFAULT_DESCRIPTION,
  TASK_DEFAULT_TITLE,
} from "./constants";
import { PriorityStatus, TimeStatus, KeyCode } from "./enums";

export const parseTags = (tags) => tags.split(TAG_SEPARATOR).slice(1);

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
  tasksStore,
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

  tasksStore.updateTasks(tasksWithNewSortOrder);
};

export const createNewColumn = () => ({
  id: uniqueId(COLUMN_ID_PREFIX),
  title: COLUMN_DEFAULT_TITLE,
});

const getDeclension = (count, one, few, many) => {
  const countString = String(count);

  switch (true) {
    case countString.endsWith(1) && !countString.endsWith(11):
      return one;
    case !Number.isInteger(count):
    case countString.endsWith(2) && !countString.endsWith(12):
    case countString.endsWith(3) && !countString.endsWith(13):
    case countString.endsWith(4) && !countString.endsWith(14):
      return few;
    default:
      return many;
  }
};

export const getTimeSince = (pastDateString) => {
  const currentTime = Date.now();
  const creationTime = Date.parse(pastDateString);
  const timeDeltaInSeconds = (currentTime - creationTime) / SEC;

  const timeUnits = [
    [YEAR_IN_SEC, ["год", "года", "лет"]],
    [MONTH_IN_SEC, ["месяц", "месяца", "месяцев"]],
    [DAY_IN_SEC, ["день", "дня", "дней"]],
    [HOUR_IN_SEC, ["час", "часа", "часов"]],
    [MINUTE_IN_SEC, ["минуту", "минуты", "минут"]],
    [SECOND_iN_SEC, ["секунду", "секунды", "секунд"]],
  ];

  for (const [unitInSec, declensions] of timeUnits) {
    if (timeDeltaInSeconds >= unitInSec) {
      const timeDeltaInUnit = Math.floor(timeDeltaInSeconds / unitInSec);
      const declension = getDeclension(timeDeltaInUnit, ...declensions);

      return `${timeDeltaInUnit} ${declension} назад`;
    }
  }

  return "только что";
};

export const formatDate = (dateString) =>
  new Date(dateString)
    .toLocaleString("ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(",", "");

export const createSubtask = () => ({
  id: crypto.randomUUID(),
  text: SUBTASK_DEFAULT_DESCRIPTION,
  isDone: false,
});

export const createTask = () => ({
  title: TASK_DEFAULT_TITLE,
  description: "",
  sortOrder: 0,
  dueDate: null,
  tags: "",
  columnId: "",
  statusId: "",
  userId: null,
  url: "",
  urlDescription: "",
  subtasks: [],
});

export const isEnterEvent = (evt) => evt.code === KeyCode.ENTER;
