import { createApp } from "vue";
import { router } from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
;
import "bootstrap/dist/css/bootstrap.min.css";
library.add(faArrowDown, faUtensils, faBoltLightning, faApple, faGooglePlay, faArrowRight, faUser, faCartShopping, faPlus, faMinus);
import App from "./App.vue";

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount("#app");
