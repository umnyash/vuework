import columnsJSON from "@/mocks/columns.json";
import usersJSON from "@/mocks/users.json";
import tasksJSON from "@/mocks/tasks.json";
import { vi } from "vitest";

vi.mock("@/services", () => {
  return {
    columnsService: {
      fetchColumns: vi.fn(async () => {
        return await JSON.parse(JSON.stringify(columnsJSON));
      }),
      createColumn: vi.fn(async () => ({ id: columnsJSON.length + 1 })),
      updateColumn: vi.fn(),
      deleteColumn: vi.fn(),
    },
    tasksService: {
      fetchTasks: vi.fn(async () => {
        return await JSON.parse(JSON.stringify(tasksJSON));
      }),
    },
    usersService: {
      fetchUsers: vi.fn(async () => {
        return await JSON.parse(JSON.stringify(usersJSON));
      }),
    },
  };
});
