import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GenerateKitView from '../views/GenerateKitView.vue'
import DashboardView from '../views/DashboardView.vue'
import EditKitView from '../views/EditKitView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/create-kit-ui',
      name: 'createKit',
      component: GenerateKitView,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-kits-ui',
      name: 'listKit',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-kit-ui',
      name: 'editKit',
      component: EditKitView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
