import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/ArticleView.vue')
  },
  {
    path: '/blog',
    name: 'articles',
    component: () => import('../views/ArticlesView.vue')
  },
  {
    path: '/publications',
    name: 'publications',
    component: () => import('../views/PublicationsView.vue')
  },
  {
    path: '/supervisions',
    name: 'supervisions',
    component: () => import('../views/SupervisionsView.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
