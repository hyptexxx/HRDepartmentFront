<template lang="pug">
q-layout(view='hHr lpr fff')
  q-dialog(v-model="isLoginVisible" @hide='hideLoginForm')
    login-form
  q-header.bg-grey-9.text-white(elevated='' height-hint='98')
    q-toolbar
      q-btn(dense='' flat='' round='' icon='menu' @click='left = !left')
      q-toolbar-title
        |  Отдел кадров
    q-tabs(align='left')
      q-route-tab(to='/page1' label='Page One')
      q-route-tab(to='/page2' label='Page Two')
  q-drawer.bg-amber-5(v-model='left' side='left' content-class="bg-grey-9 text-white" overlay='' bordered='')
    account
  q-page-container
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import AuthApiRequestImpl from 'src/requests/implementations/AuthApiRequestImpl'
import LoginValidation from 'src/validation/LoginValidation'
import LoginForm from 'components/LoginForm.vue'
import LoginStore from 'src/store/LoginStore'
import Account from 'components/Account.vue'

@Component({
  components: {
    LoginForm,
    Account
  },
  validations: LoginValidation
})
export default class PageIndex extends Mixins(AuthApiRequestImpl, LoginStore) {
  private left = true
  private isLoginVisible = false

  @Watch('windowVisible')
  private void (): void {
    this.isLoginVisible = this.windowVisible
  }

  private hideLoginForm (): void {
    this.setVisible(false)
  }
}
</script>
