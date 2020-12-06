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
      q-route-tab(to='/vacancy' label='Вакансии')
      q-route-tab(to='/employee' label='Нанятые сотрудники')
  q-drawer.bg-amber-5(v-model='left' side='left' content-class="bg-grey-9 text-white" bordered='')
    account
  q-page-container
    router-view
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import LoginValidation from 'src/validation/LoginValidation'
import LoginForm from 'components/LoginForm.vue'
import LoginStore from 'src/store/LoginStore'
import Account from 'components/Account.vue'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'

@Component({
  components: {
    LoginForm,
    Account
  },
  validations: LoginValidation
})
export default class PageIndex extends Mixins(ApiRequestImpl, LoginStore) {
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
