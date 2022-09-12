import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    component: () => import('/@/views/Home.vue'),
  },
  {
    path: '/:countryCode',
    name: 'Home',
    component: () => import('/@/views/Home.vue'),
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    component: () => import('/@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }