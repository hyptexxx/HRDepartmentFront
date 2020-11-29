<template lang="pug">
  q-list(bordered class="rounded-borders").text-white
    q-expansion-item.bg-grey-10(v-if="isLoginned === true").text-white
      template(v-slot:header='').text-white
        q-item-section(avatar='')
          q-avatar(rounded='' size='48px')
            img(src='https://cdn.quasar.dev/img/avatar.png')
        q-item-section.text-white
          q-item-label.text-white {{user.login}}
          q-item-label.text-white(caption='') {{user.post}}
        q-item-section(side='').text-white
          | Аккаунт
      q-card.bg-grey-8
        q-btn.bg-grey-8(@click="" align="left" icon="view_compact" flat label="Личный кабинет" style="width: 100%")
        q-btn.bg-grey-8(@click="logout" align="left" icon="directions_run" flat label="Выход" style="width: 100%")
    q-btn.bg-grey-10(v-else flat style="width: 100%" @click="setVisible(true)")
      q-item-section(avatar='')
        q-avatar(rounded='' size='48px')
          img(src='https://school.altayctf.ru/images/site/devteam/unk.png')
      q-item-section
        q-item-label Вход
</template>

<script lang="ts">

import { Component, Mixins, Watch } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import { AuthResponse, User } from 'src/models/auth'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'

@Component
export default class Account extends Mixins(ApiRequestImpl, LoginStore) {
  private isLoginned = false
  private user: User | null = {
    login: '',
    post: '',
    idUser: 0,
    role: 'admin'
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
