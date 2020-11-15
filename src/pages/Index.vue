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
        q-route-tab(to='/page3' label='Page Three')
    q-drawer(v-model='left' side='left' overlay='' bordered='')
    q-page-container
      router-view
</template>

<script lang="ts">
import ExampleComponent from 'components/ClassComponent.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: { ExampleComponent }
})
export default class PageIndex extends Vue {
  private left = true;
}
</script>
