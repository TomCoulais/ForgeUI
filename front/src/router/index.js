import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CSSGeneratedView from '../views/CSSGeneratedView.vue'
import UIKitsDashboard from '../views/UIKitsDashboard.vue'
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
      component: CSSGeneratedView
    },
    {
      path: '/my-kits-ui',
      name: 'listKit',
      component: UIKitsDashboard
    }
  ],
})

export default router
