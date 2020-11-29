<template lang="pug">
  q-list(bordered class="rounded-borders")
    q-expansion-item(v-if="isLoginned === true")
      template(v-slot:header='')
        q-item-section(avatar='')
          q-avatar(rounded='' size='48px')
            img(src='https://cdn.quasar.dev/img/avatar.png')
        q-item-section
          q-item-label {{user.login}}
          q-item-label(caption='') {{user.post}}
        q-item-section(side='')
          | Аккаунт
      q-card
        q-btn(@click="" align="left" icon="view_compact" flat label="Личный кабинет" style="width: 100%")
        q-btn(@click="logout" align="left" icon="directions_run" flat label="Выход" color="red" style="width: 100%")
    q-btn(v-else flat style="width: 100%" @click="setVisible(true)")
      q-item-section(avatar='')
        q-avatar(rounded='' size='48px')
          img(src='https://cdn.quasar.dev/img/avatar.png')
      q-item-section
        q-item-label Вход
</template>

<script lang="ts">

import { Component, Mixins, Watch } from 'vue-property-decorator'
import AuthApiRequestImpl from 'src/requests/implementations/AuthApiRequestImpl'
import LoginStore from 'src/store/LoginStore'
import { AuthResponse, User } from 'src/models/auth'

@Component
export default class Account extends Mixins(AuthApiRequestImpl, LoginStore) {
  private isLoginned = false
  private user: User | null = {
    login: '',
    post: '',
    idUser: 0
  }

  @Watch('loginned')
  private isLoginnedAfterRequest (): void {
    this.isLoginned = this.loginned as unknown as boolean

    if (this.isLoginned) {
      this.user = this.responseUser as unknown as User
    }
  }

  private async logout (): Promise<void> {
    const result = await this.$axios.post<AuthResponse>('/logout')

    switch (result.status) {
      case 404:

        this.$q.localStorage.remove('isLogged')
        this.$q.localStorage.remove('user')

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        this.setLoginned(false)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        this.setResponseUser(null)
        this.isLoginned = false
        this.user = null

        break
    }
  }

  private created (): void {
    if (this.$q.localStorage.getItem('isLogged')) {
      this.isLoginned = this.$q.localStorage.getItem('isLogged') as boolean

      if (this.$q.localStorage.getItem('user')) {
        this.user = this.$q.localStorage.getItem('user') as unknown as User
        this.isLoginned = true
      } else {
        this.isLoginned = false
      }
    } else {
      this.isLoginned = false
    }
  }
}
</script>
