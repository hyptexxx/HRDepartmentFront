import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class/lib'

const LoginModule = namespace('LoginModule')

@Component
export default class LoginStore extends Vue {
  @LoginModule.Mutation('setVisible')
  public setVisible!: (isVisible: boolean) => void

  @LoginModule.Getter('getVisible')
  public windowVisible!: boolean
}
