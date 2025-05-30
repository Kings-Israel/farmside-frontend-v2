import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import store from "./store";
import VAnimateCss from "v-animate-css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import "material-icons/iconfont/material-icons.css";
import router from "./router";

const app = createApp(App);

axios.defaults.baseURL =
  "https://farmside-functions.netlify.app/.netlify/functions";

library.add(faChevronCircleDown);
library.add(faInstagram);
library.add(faYoutube);
library.add(faTimes);
library.add(faCheck);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(VAnimateCss);
app.use(router);
app.use(store);
app.mount("#app");
