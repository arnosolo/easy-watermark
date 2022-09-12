import { createRouter, createWebHashHistory} from "vue-router"

import HomePage from '../views/HomePage.vue'
import NotFound from '../views/NotFound.vue';
import Watermark from '../views/WatermarkPage.vue';

const routes = [
  // { path: '/', component: HomePage },
  { path: '/', component: Watermark },
  { path: '/watermark', component: Watermark },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }