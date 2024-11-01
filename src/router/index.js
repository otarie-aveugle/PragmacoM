import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/Authentication/LoginPage.vue'
import RecoveryPasswordPage from '@/views/Authentication/RecoveryPassword/RecoveryPasswordPage.vue'
import ForgotPassword from '@/views/Authentication/RecoveryPassword/ForgotPassword.vue'
import ResetLink from '@/views/Authentication/RecoveryPassword/ResetLink.vue'
import ResetPassword from '@/views/Authentication/RecoveryPassword/ResetPassword.vue'
import SuccessRecoveryPassword from '@/views/Authentication/RecoveryPassword/SuccessRecoveryPassword.vue'
import PanelsPage from '@/views/Panels/PanelsPage.vue'
import CreatePanelPage from '@/views/Panels/CreatePanelPage.vue'
import EditPanelPage from '@/views/Panels/EditPanelPage.vue'
import InteractiveMap from '@/views/InteractiveMap.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/panels',
      name: 'panels',
      component: PanelsPage,
    },
    {
      path: '/create_panel',
      name: 'create_panel',
      component: CreatePanelPage,
    },
    {
      path: '/edit_panel',
      name: 'edit_panel',
      component: EditPanelPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/map',
      name: 'map',
      component: InteractiveMap,
    },
    {
      path: '/recovery_password',
      name: 'recovery_password',
      component: RecoveryPasswordPage,
      children: [
        {
          path: '',
          name: 'forgot_password',
          component: ForgotPassword,
        },
        {
          path: '/reset_link',
          name: 'reset_link',
          component: ResetLink,
        },
        {
          path: '/reset_password',
          name: 'reset_password',
          component: ResetPassword,
        },
        {
          path: '/success_recover_password',
          name: 'success_recover_password',
          component: SuccessRecoveryPassword,
        },
      ],
    },
  ],
})

router.beforeEach(async to => {
  const store = useUserStore()
  const pages = ['create_panel', 'edit_panel']
  const pages_userLoggedIn = [
    'login',
    'recovery_password',
    'forgot_password',
    'reset_link',
    'reset_password',
    'success_recover_password',
  ]

  if (store.userLoggedIn && pages_userLoggedIn.includes(to.name)) {
    return { name: 'home' }
  }

  if (!store.userLoggedIn && pages.includes(to.name)) {
    return { name: 'home' }
  }
})

export default router
