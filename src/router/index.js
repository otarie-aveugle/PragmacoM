import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/Authentication/LoginPage.vue'
import RecoveryPasswordPage from '@/views/Authentication/RecoveryPassword/RecoveryPasswordPage.vue'
import ForgotPassword from '@/views/Authentication/RecoveryPassword/ForgotPassword.vue'
import ResetLink from '@/views/Authentication/RecoveryPassword/ResetLink.vue'
import ResetPassword from '@/views/Authentication/RecoveryPassword/ResetPassword.vue'
import PanelsPage from '@/views/Panels/PanelsPage.vue'
import PanelPage from '@/views/Panels/PanelPage.vue'
import CreatePanelPage from '@/views/Panels/CreatePanelPage.vue'
import EditPanelPage from '@/views/Panels/EditPanelPage.vue'
import InteractiveMap from '@/views/InteractiveMap.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import LegalNoticesPage from '@/views/LegalNotices.vue'
import ContactPage from '@/views/ContactPage.vue'
import ReceptionBoxPage from '@/views/ReceptionBoxPage.vue'
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFoundPage,
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
      path: '/edit_panel/:id',
      name: 'edit_panel',
      component: EditPanelPage,
    },
    {
      path: '/panel/:id',
      name: 'panel',
      component: PanelPage,
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
      ],
    },
    {
      path: '/legal_notices',
      name: 'legal_notices',
      component: LegalNoticesPage,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
    },
    {
      path: '/box',
      name: 'box',
      component: ReceptionBoxPage,
    },
    {
      path: '/privacy_policy',
      name: 'privacy_policy',
      component: PrivacyPolicyPage,
    }
  ],
})

router.beforeEach(async to => {
  const store = useUserStore()
  const pages = ['create_panel', 'edit_panel', 'box']
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
