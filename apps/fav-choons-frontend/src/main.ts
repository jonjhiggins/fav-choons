import Vue from 'vue';
import App from './App.vue';
import router from './router';

declare const API_URL: string | undefined;

Vue.config.productionTip = false;

if (!API_URL) {
  alert('No API URL found');
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
