import { defineStore } from "pinia";
import { subtaskService } from "@/services";

export const useSubtasksStore = defineStore("subtasks", {
  state: () => ({
    subtasks: [],
  }),
  getters: {
    subtasksGroupedByTask(state) {
      return state.subtasks.reduce((accumulator, subtask) => {
        if (!accumulator[subtask.taskId]) {
          accumulator[subtask.taskId] = [];
        }

        accumulator[subtask.taskId].push(subtask);

        return accumulator;
      }, {});
    },
  },
  actions: {
    adaptSubtaskToClient(subtask) {
      const adaptedSubtask = {
        ...subtask,
        isDone: subtask.done,
      };

      delete adaptedSubtask.done;

      return adaptedSubtask;
    },
    adaptSubtaskToServer(subtask) {
      const adaptedSubtask = {
        ...subtask,
        done: subtask.isDone,
      };

      delete adaptedSubtask.isDone;

      return adaptedSubtask;
    },
    async fetchSubtasks() {
      const subtasks = await subtaskService.fetchSubtasks();
      this.subtasks = subtasks.map(this.adaptSubtaskToClient);
    },
    async addSubtask(subtask) {
      const adaptedToServerSubtask = this.adaptSubtaskToServer(subtask);
      delete adaptedToServerSubtask.id;
      const newSubtask = await subtaskService.createSubtask(
        adaptedToServerSubtask,
      );
      this.subtasks.push(this.adaptSubtaskToClient(newSubtask));
    },
    async updateSubtask(subtask) {
      await subtaskService.updateSubtask(this.adaptSubtaskToServer(subtask));
      const subtaskIndex = this.subtasks.findIndex(
        ({ id }) => id === subtask.id,
      );
      this.subtasks.splice(subtaskIndex, 1, subtask);
    },
    async deleteSubtask(id) {
      await subtaskService.deleteSubtask(id);
      const subtaskIndex = this.subtasks.findIndex(
        (subtask) => subtask.id === id,
      );
      this.subtasks.splice(subtaskIndex, 1);
    },
  },
});
