import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Welcome.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: ()=> import('../views/HomeView.vue')
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/AboutView.vue')
      }
    ],
  },
  {
    path: '/workspace',
    component: () => import('@/layouts/Workspace.vue'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: ()=> import('@/views/HomeView.vue')
      },
      {
        path: 'about',
        name: 'wabout',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
