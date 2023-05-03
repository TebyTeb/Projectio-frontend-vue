import { createRouter, createWebHistory } from 'vue-router'
// Stores //
import { useAuthStore } from '../stores/authStore'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Welcome.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/views/SignupView.vue')
      }
    ]
  },
  {
    path: '/projects',
    component: () => import('@/layouts/Workspace.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'projects',
        component: () => import('@/views/ProjectsView.vue')
      },
      {
        path: ':projectId',
        name: 'summary',
        component: () => import('@/views/SummaryView.vue')
      },
      {
        path: '/sprint/:sprintId',
        name: 'sprint',
        component: () => import('@/views/KanbanView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
