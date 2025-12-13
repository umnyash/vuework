export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/",
    name: "HomeView",
    component: () => import("@/views/HomeView.vue"),
    meta: { layout: "AppLayoutMain" },
    children: [
      {
        path: "/:id",
        name: "TaskView",
        component: () => import("@/views/TaskView.vue"),
        meta: { layout: "AppLayoutMain" },
      },
      {
        path: "/tasks/create",
        name: "TaskCreateView",
        component: () => import("@/views/TaskCreateView.vue"),
        meta: { layout: "AppLayoutMain" },
      },
      {
        path: "/tasks/edit/:id",
        name: "TaskEditView",
        component: () => import("@/views/TaskEditView.vue"),
        meta: { layout: "AppLayoutMain" },
      },
    ],
  },
];
