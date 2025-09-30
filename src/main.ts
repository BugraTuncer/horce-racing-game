import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.css";
import App from "./App.vue";
import horses from "./store/modules/horses";
import race from "./store/modules/race";

const store = createStore({
  modules: {
    horses,
    race,
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");
