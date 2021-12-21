import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

Vue.config.productionTip = false;

if (!API_URL) {
  alert('No API URL found');
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
