import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '@/views/HomeView.vue'
import DirectoryView from '@/views/DirectoryView.vue'
import ChannelView from '@/views/ChannelView.vue'
import CategoryView from '@/views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DirectoryView,
    },
    {
      path: '/directory',
      name: 'directory',
      component: DirectoryView,
    },
    {
      path: '/directory/:categoryName',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/:username',
      name: 'channel',
      component: ChannelView,
    },
  ],
})

export default router
