import { Module } from 'vuex'
import AlbumStoreInterface from '../interface/LoginStoreInterface'
import { StoreInterface } from 'src/store/interface/StoreInterface'

const LoginModule: Module<AlbumStoreInterface, StoreInterface> = {
  namespaced: true,
  state: () => ({
    visible: false
  }),
  mutations: {
    setVisible (state: any, visible: boolean): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.visible = visible
    }
  },
  actions: {},
  modules: {},
  getters: {
    getVisible: state => {
      return state.visible
    }
  }
}

export default LoginModule
