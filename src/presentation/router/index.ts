import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/presentation/views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/presentation/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/patients',
      name: 'patients',
      component: () => import('@/presentation/views/PatientListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/therapists',
      name: 'therapists',
      component: () => import('@/presentation/views/TherapistListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/therapists/:id',
      name: 'therapist-profile',
      component: () => import('@/presentation/views/TherapistProfileView.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = true; // Mock for now
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
