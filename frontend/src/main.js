import { createApp } from "vue";
import { createPinia } from "pinia";
import { outsideClick } from "./common/directives";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive("outside-click", outsideClick);

app.mount("#app");
