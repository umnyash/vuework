import { mount } from "@vue/test-utils";
import "@/stores/__tests__/mockServices";
import { createTestingPinia } from "@pinia/testing";
import { describe, it, expect, vi, beforeEach } from "vitest";
import router from "@/router";
import { useUsersStore, useTasksStore, useColumnsStore } from "@/stores";
import TestComponent from "../TestComponent.vue";

describe("TestComponent", () => {
  let wrapper, usersStore, tasksStore, columnsStore;

  beforeEach(async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });

    wrapper = mount(TestComponent, {
      global: {
        plugins: [pinia, router],
      },
    });

    usersStore = useUsersStore();
    tasksStore = useTasksStore();
    columnsStore = useColumnsStore();

    await usersStore.fetchUsers();
    await tasksStore.fetchTasks();
    await columnsStore.fetchColumns();
  });

  it("should render correctly", async () => {
    expect(wrapper.exists).toBeTruthy();
  });

  it("should have a proper title", () => {
    const deskTitle = wrapper.find("[data-test='desk-title']");
    expect(deskTitle.text()).toBe("Design Coffee Lab");
  });

  it("should render add column button", () => {
    const addColumnButton = wrapper.find("[data-test='desk-add']");
    expect(addColumnButton.text()).toBe("Добавить столбец");
  });

  it("should trigger addColumn action", async () => {
    const addColumnButton = wrapper.find("[data-test='desk-add']");
    addColumnButton.trigger("click");
    expect(columnsStore.addColumn).toHaveBeenCalledTimes(1);
  });

  it("should have user filter", () => {
    const users = wrapper.findAll("[data-test='user-filter']");
    expect(users.length).toBe(8);
  });

  it("should have status filter", () => {
    const statuses = wrapper.findAll("[data-test='status-filter']");
    expect(statuses.length).toBe(5);
  });

  it("should have initial columns", () => {
    const columns = wrapper.findAll("[data-test='desk-column-title']");

    expect(columns.length).toBe(5);
    expect(columns[0].text()).toBe("Запланировано");
    expect(columns[1].text()).toBe("В работе");
    expect(columns[2].text()).toBe("На проверке");
    expect(columns[3].text()).toBe("Выполнено");
    expect(columns[4].text()).toBe("На удаление");
  });

  it("should have tasks in the first column", () => {
    const firstColumn = wrapper.find("[data-test='column-target-area']");
    const taskTitles = firstColumn.findAll("[data-test='task-title']");

    expect(taskTitles.length).toBe(5);
    expect(taskTitles[0].text()).toBe("Задача № 2");
    expect(taskTitles[1].text()).toBe("Задача № 6");
    expect(taskTitles[2].text()).toBe("Задача № 10");
    expect(taskTitles[3].text()).toBe("Задача № 14");
    expect(taskTitles[4].text()).toBe("Задача № 18");
  });
});
