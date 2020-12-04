<template lang="pug">
  q-card.text-black(style='width: 300px')
    q-card-section
      .text-h6 Авторизация
    q-card-section
      q-input(filled v-model="userCredentials.login" label="Логин" type='text')
      span.text-red-10(v-if="!$v.userCredentials.login.required && $v.userCredentials.login.$params.required" class="error-label") Обязательно
    q-card-section
      q-input(filled v-model="userCredentials.password" label="Пароль" type='password')
      span.text-red-10(v-if="!$v.userCredentials.password.required && $v.userCredentials.password.$params.required" class="error-label") Обязательно
    q-card-actions.bg-white.text-black(align='right')
      q-btn(flat='' label='OK' @click="authorizeUser")
</template>

<script lang="ts">
import ExampleComponent from 'components/ClassComponent.vue'
import { Component, Mixins } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import { AuthResponse, User, UserCredentials } from 'src/models/auth'
import LoginValidation from 'src/validation/LoginValidation'
import LoginStore from 'src/store/LoginStore'

@Component({
  components: { ExampleComponent },
  mixins: [validationMixin],
  validations: LoginValidation
})
export default class LoginForm extends Mixins(LoginStore) {
  private userCredentials: UserCredentials = {
    login: '',
    password: ''
  }

  private user: User | null = {
    login: '',
    post: '',
    idUser: 0,
    role: 'hr'
  }

  // руководитель - текущие сотрудники (нет редактирования)
  // хр - текущие (crud) + те кто оставил заявки (принять отклонить)
  // бухгатлер - текущие сотрудники (просмотр) + зарплаты (редактирование)
  private async authorizeUser (): Promise<void> {
    this.$v.$touch()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    this.$store.state.windowVisible = false
    if (!this.$v.$anyError) {
      const formData = new FormData()

      formData.append('login', this.userCredentials.login)
      formData.append('password', this.userCredentials.password)

      const result = await this.$axios.post<AuthResponse>('/auth', formData)

      switch (result.status) {
        case 404:

          this.$q.localStorage.set('isLogged', true)
          this.$q.localStorage.set('user', result.data)

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
          this.setLoginned(true)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
          this.setResponseUser(result.data as unknown as User)

          this.setVisible(false)

          break
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      this.setLoginned(false)

      this.$q.notify({
        color: 'negative',
        message: 'Поля не заполнены',
        icon: 'report_problem',
        progress: true,
        position: 'bottom'
      })
    }
  }
}
</script>
