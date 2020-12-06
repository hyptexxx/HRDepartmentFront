import { RouteConfig } from 'vue-router'
import VacationsAnonimous from 'components/VacationsAnonimous.vue'
import MainLayout from 'layouts/MainLayout.vue'
import Index from 'pages/Index.vue'
import AuthService from 'src/service/AuthService'
import HRpage from 'components/HRpage.vue'
import LeaderPage from 'components/LeaderPage.vue'
import ACCOUNTANTpage from 'components/ACCOUNTANTpage.vue'

const authService = new AuthService()

const routes: RouteConfig[] = [
  {
    path: '/vacancy',
    components: {
      default: MainLayout
    },
    children: [
      {
        path: '',
        component: Index,
        children: [
          {
            name: 'vacation',
            path: '/vacancy',
            component: VacationsAnonimous
          },
          {
            beforeEnter: authService.checkLoggedInAndRoleLeaderACCOUNTANT,
            name: 'accountant',
            path: '/accountant',
            component: ACCOUNTANTpage
          },
          {
            beforeEnter: authService.checkLoggedInAndRoleLeader,
            name: 'leader',
            path: '/leader',
            component: LeaderPage
          },
          {
            beforeEnter: authService.checkLoggedInAndRole,
            name: 'employee',
            path: '/employee',
            component: HRpage
          }
        ]
      }
    ]
  },
  {
    path: '/',
    beforeEnter: authService.redirect
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
