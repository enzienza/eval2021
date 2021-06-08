import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import i18n from "./languages";
Vue.use(Vuelidate);

import "./assets/style/index.css"

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
