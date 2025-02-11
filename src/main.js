import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/style.css";
import appHeader from "@/components/Shared/appHeader.vue";
import appItemList from "@/components/Shared/appItemList";
import store from "./store";

const app = createApp(App);
app.component("appHeader",appHeader);
app.component("appItemList",appItemList);
app.use(router);
app.use(store);
app.mount("#app");
