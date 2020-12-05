import { Route } from 'vue-router'
import { LocalStorage } from 'quasar'
import { Vue } from 'vue-property-decorator'
import { User } from 'src/models/auth'

export default class AuthService extends Vue {
  public checkLoggedInAndRole = (to: Route, from: Route, next: (path?: string) => void): void => {
    if (!(LocalStorage.getItem('isLogged') as boolean)) {
      this.$q.notify({
        color: 'negative',
        message: 'Выполните авторизацию',
        icon: 'report_problem',
        progress: true,
        position: 'bottom'
      })
      next('/vacancy')
    } else {
      const user: User = (LocalStorage.getItem('user')) as User
      if (user) {
        if (user.role === 'HR') {
          next()
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Недостаточно прав',
            icon: 'report_problem',
            progress: true,
            position: 'bottom'
          })
        }
      }
    }
  };

  public checkNotLoggedIn = (to: Route, from: Route, next: (path?: string) => void): void => {
    if ((LocalStorage.getItem('isLogged') as boolean)) {
      next('/attendance/stats/semester')
    } else {
      next()
    }
  };

  public redirect = (to: Route, from: Route, next: (path?: string) => void): void => {
    next('/vacancy')
  };
}
