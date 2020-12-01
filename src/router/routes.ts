import { RouteConfig } from 'vue-router'
import VacationsAnonimous from 'components/VacationsAnonimous.vue'
import MainLayout from 'layouts/MainLayout.vue'
import Index from 'pages/Index.vue'
import AuthService from 'src/service/AuthService'

const authService = new AuthService()

const routes: RouteConfig[] = [
  {
    path: '/vacantions',
    components: {
      default: MainLayout
    },
    children: [
      {
        path: '',
        component: Index,
        children: [
          { name: 'vacantions', path: '/vacantions', component: VacationsAnonimous }
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
