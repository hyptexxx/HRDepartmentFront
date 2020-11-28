<template lang="pug">
  q-layout(view='hHr lpr fff')
    q-header.bg-primary.text-white(elevated='' height-hint='98')
      q-toolbar
        q-btn(dense='' flat='' round='' icon='menu' @click='left = !left')
        q-toolbar-title
          q-avatar
            img(src='https://cdn.quasar.dev/logo/svg/quasar-logo.svg')
          |           Title
      q-tabs(align='left')
        q-route-tab(to='/page1' label='Page One')
        q-route-tab(to='/page2' label='Page Two')
        q-route-tab(to='/page3' label=testLabel)
        q-btn(@click="testRequestSender")
    q-drawer(v-model='left' side='left' overlay='' bordered='')
    q-page-container
      router-view
</template>

<script lang="ts">
import ExampleComponent from 'components/ClassComponent.vue'
import { Component, Mixins } from 'vue-property-decorator'
import AuthApiRequestImpl from 'src/requests/implementations/AuthApiRequestImpl'
import LoginValidation from 'src/validation/LoginValidation'
import LoginForm from 'components/LoginForm.vue'
import LoginStore from 'src/store/LoginStore'

@Component({
  components: {
    ExampleComponent,
    LoginForm
  },
  validations: LoginValidation
})
export default class PageIndex extends Mixins(AuthApiRequestImpl, LoginStore) {
  private left = true
}
</script>
