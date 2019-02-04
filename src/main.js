import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import JsonExcel from 'vue-json-excel';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import './assets/js/common';

Vue.component('downloadExcel', JsonExcel);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
