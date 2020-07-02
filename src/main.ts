import Vue from "vue";

import {
  BootstrapVue,
  IconsPlugin,
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavItem,
  BNavbarNav,
  BNavForm,
  BFormInput,
  BButton,
  BButtonToolbar,
  BButtonGroup,
  BCollapse,
  BNavItemDropdown,
  BDropdownItem,
  BForm,
  BFormSelect
} from "bootstrap-vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./main.scss";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component("b-navbar", BNavbar);
Vue.component("b-navbar-brand", BNavbarBrand);
Vue.component("b-navbar-toggle", BNavbarToggle);
Vue.component("b-nav-item", BNavItem);
Vue.component("b-navbar-nav", BNavbarNav);
Vue.component("b-nav-form", BNavForm);
Vue.component("b-form", BForm);
Vue.component("b-form-input", BFormInput);
Vue.component("b-button", BButton);
Vue.component("b-button-toolbar", BButtonToolbar);
Vue.component("b-button-group", BButtonGroup);
Vue.component("b-collapse", BCollapse);
Vue.component("b-nav-item-dropdown", BNavItemDropdown);
Vue.component("b-dropdown-item", BDropdownItem);
Vue.component("b-form-select", BFormSelect);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
