import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/department',
    name: 'Department',
    component: () => import('@/views/Department'),
    meta: { requiresAuth: true }
  },
  {
    path: '/department/:id',
    name: 'DepartmentEmployee',
    component: () => import('@/components/DepartmentEmployee'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('@/views/Employee'),
    meta: { requiresAuth: true }
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('@/views/Project'),
    meta: { requiresAuth: true }
  },
  {
    path: '/project/:id',
    name: 'ProjectEmployee',
    component: () => import('@/components/ProjectEmployee'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  }
  next()
})

export default router
