import { defineStore } from "pinia";
import columnsJSON from "@/mocks/columns.json";
import { createNewColumn } from "@/common/helpers";

export const useColumnsStore = defineStore("columns", {
  state: () => ({
    columns: [],
  }),
  getters: {},
  actions: {
    async fetchColumns() {
      this.columns = columnsJSON;
    },
    addColumn() {
      this.columns.push(createNewColumn());
    },
    updateColumn(column) {
      const columnIndex = this.columns.findIndex(({ id }) => id === column.id);
      this.columns.splice(columnIndex, 1, column);
    },
    deleteColumn(id) {
      const columnIndex = this.columns.findIndex((column) => column.id === id);
      this.columns.splice(columnIndex, 1);
    },
  },
});
