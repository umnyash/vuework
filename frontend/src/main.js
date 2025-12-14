import { createApp } from "vue";
import { createPinia } from "pinia";
import { outsideClick } from "./common/directives";
import { getToken, removeToken } from "@/services/token-manager";
import { useAuthStore } from "@/stores";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive("outside-click", outsideClick);

app.mount("#app");

const token = getToken();

if (token) {
  const authStore = useAuthStore();
  authStore
    .getMe()
    .then(() => {
      router.push("/");
    })
    .catch(() => {
      removeToken();
    });
}
