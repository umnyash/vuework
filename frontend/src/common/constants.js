import { TasksFilter } from "./enums";

export const STATUSES = [
  {
    label: "Важно, не срочно",
    value: "green",
    filterKey: TasksFilter.PRIORITY_STATUSES,
  },
  {
    label: "Срочно, не важно",
    value: "orange",
    filterKey: TasksFilter.PRIORITY_STATUSES,
  },
  {
    label: "Срочно, важно",
    value: "red",
    filterKey: TasksFilter.PRIORITY_STATUSES,
  },
  {
    label: "Дедлайн",
    value: "time",
    filterKey: TasksFilter.TIME_STATUSES,
  },
  {
    label: "Просрочено",
    value: "alert",
    filterKey: TasksFilter.TIME_STATUSES,
  },
];

export const SEC = 1000;
export const SECOND_iN_SEC = 1;
export const MINUTE_IN_SEC = 60;
export const HOUR_IN_SEC = MINUTE_IN_SEC * 60;
export const DAY_IN_SEC = HOUR_IN_SEC * 24;
export const MONTH_IN_SEC = DAY_IN_SEC * 30;
export const YEAR_IN_SEC = DAY_IN_SEC * 365;
export const DAY_IN_MILLISEC = DAY_IN_SEC * SEC;

export const TAG_SEPARATOR = "#";

export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const COLUMN_DEFAULT_TITLE = "Новый столбец";
export const COLUMN_ID_PREFIX = "column_";

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

export const SUBTASK_DESCRIPTION_MAX_LENGTH = 64;
export const SUBTASK_DEFAULT_DESCRIPTION = "Новая подзадача";
