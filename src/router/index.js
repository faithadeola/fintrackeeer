import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../utils/auth'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: Auth,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/budgets',
    name: 'budgets',
    component: () => import('../views/Budgets.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/Calendar.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/savings',
    name: 'savings',
    component: () => import('../views/Savings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/debts",
    name: "Debts",
    component: () => import("../views/Debts.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('../views/Transactions.vue'),
    meta: { requiresAuth: true }
  },
  

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'auth' });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;