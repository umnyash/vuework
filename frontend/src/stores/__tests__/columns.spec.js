import { describe, it, expect, beforeEach } from "vitest";
import "@/stores/__tests__/mockServices";
import { createPinia, setActivePinia } from "pinia";
import { useColumnsStore } from "@/stores";

describe("columns store", () => {
  let columnsStore;

  beforeEach(async () => {
    setActivePinia(createPinia());
    columnsStore = useColumnsStore();
    await columnsStore.fetchColumns();
  });

  it("should have initial columns", async () => {
    expect(columnsStore.columns.length).toBe(5);
  });

  it("should add a new column", async () => {
    await columnsStore.addColumn({ title: "Новая колонка" });
    const columnsLength = columnsStore.columns.length;

    expect(columnsLength).toBe(6);
    expect(columnsStore.columns[columnsLength - 1].id).toBe(6);
  });

  it("should update column", async () => {
    const newTitle = "Наша новая колонка";
    await columnsStore.updateColumn({ id: 1, title: newTitle });

    expect(columnsStore.columns.length).toBe(5);
    expect(columnsStore.columns[0].title).toBe(newTitle);
  });

  it("should delete column", async () => {
    await columnsStore.deleteColumn(5);

    expect(columnsStore.columns.length).toBe(4);
    expect(
      columnsStore.columns.find((column) => column.id === 5),
    ).toBeUndefined();
  });
});
