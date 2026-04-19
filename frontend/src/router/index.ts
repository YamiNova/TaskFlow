import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',           // URL 路径
    name: 'home',        // 路由名字（可选）
    component: HomeView  // 对应页面
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
