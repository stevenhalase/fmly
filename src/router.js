import Vue from 'vue';
import Router from 'vue-router';
import Auth from './views/Auth.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('fmlyu') === null) {
      next({ name: 'auth' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
