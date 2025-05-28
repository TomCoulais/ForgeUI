import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GenerateCSSKitView from '../views/GenerateCSSKitView.vue'
import UIKitsDashboard from '../views/UIKitsDashboard.vue'
import EditCSSKitView from '../views/EditCSSKitView.vue'
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
      component: GenerateCSSKitView
    },
    {
      path: '/my-kits-ui',
      name: 'listKit',
      component: UIKitsDashboard
    },
    {
      path: '/edit-kit-ui',
      name: 'editKit',
      component: EditCSSKitView
    }
  ],
})

export default router
