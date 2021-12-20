import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user/:username',
    name: 'User',
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/User.vue'),
  },
  {
    path: '/user/:username/:date',
    name: 'Day',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Day.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
