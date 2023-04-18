import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Welcome.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: ()=> import('../views/HomeView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      },
      {
        path: '',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('@/views/SignupView.vue')
      }
    ],
  },
  {
    path: '/workspace',
    component: () => import('@/layouts/Workspace.vue'),
    children: [
      {
        path: '',
        name: 'workspace',
        component: ()=> import('@/views/ProjectsView.vue')
      },
      {
        path: 'about',
        name: 'wabout',
        component: () => import('@/views/AboutView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
