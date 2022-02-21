import { createApp } from "vue";
import App from "./App.vue";
import Popper from "vue3-popper";
import "./index.css";

const app = createApp(App);
app.component("ToolTip", Popper);
app.mount("#app");
