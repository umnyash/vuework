import { defineStore } from "pinia";
import { COLUMN_DEFAULT_TITLE } from "@/common/constants";
import { columnsService } from "@/services";

export const useColumnsStore = defineStore("columns", {
  state: () => ({
    columns: [],
  }),
  getters: {},
  actions: {
    async fetchColumns() {
      this.columns = await columnsService.fetchColumns();
    },
    async addColumn() {
      const newColumn = await columnsService.createColumn({
        title: COLUMN_DEFAULT_TITLE,
      });
      this.columns.push(newColumn);
    },
    async updateColumn(column) {
      await columnsService.updateColumn(column);
      const columnIndex = this.columns.findIndex(({ id }) => id === column.id);
      this.columns.splice(columnIndex, 1, column);
    },
    async deleteColumn(id) {
      await columnsService.deleteColumn(id);
      const columnIndex = this.columns.findIndex((column) => column.id === id);
      this.columns.splice(columnIndex, 1);
    },
  },
});
