import { Module } from 'vuex'
import AlbumStoreInterface from '../interface/LoginStoreInterface'
import { StoreInterface } from 'src/store/interface/StoreInterface'
import { User } from 'src/models/auth'

const LoginModule: Module<AlbumStoreInterface, StoreInterface> = {
  namespaced: true,
  state: () => ({
    visible: false,
    loginned: false,
    user: {} as User | null
  }),
  mutations: {
    setVisible (state: any, visible: boolean): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.visible = visible
    },
    setLoginned (state: any, visible: boolean): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.loginned = visible
    },
    setResponseUser (state: any, user: User | null): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.user = user
    }
  },
  actions: {},
  modules: {},
  getters: {
    getVisible: state => {
      return state.visible
    },
    getLoginned: state => {
      return state.loginned
    },
    getResponseUser: state => {
      return state.user
    }
  }
}

export default LoginModule
