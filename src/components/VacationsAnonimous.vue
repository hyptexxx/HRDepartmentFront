<template lang="pug">
  q-card.my-card(bordered='')
    q-dialog(v-model='popup')
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-h6 Введите номер телефона
          q-space
          q-btn(icon='close' flat='' round='' dense='' v-close-popup='')
        q-card-section
          q-input(filled v-model="phoneNumber" label="Введите номер телефона" type='text' ref="phone" @keydown.enter="sendUserRespone")
          span.text-red-10(v-if="!$v.phoneNumber.required && $v.phoneNumber.$params.required" class="error-label") Обязательно
        q-card-section
          q-btn.bg-light-green-7.text-white(@click="sendUserRespone" flat label="Отправить")
    q-card-section
      .text-h6 Доступные вакансии
      .text-subtitle2 Вакансии
    q-separator(inset='')
    q-card-section
      q-list.rounded-borders(bordered='')
        q-expansion-item.bg-grey-2(v-for="vacation in vacantions" default-opened)
          template(v-slot:header='')
            q-item-section(avatar='')
              q-chip(square='' color='white' text-color='black' :label='vacation.role')
            q-item-section
            q-chip(square='' color='green' text-color='white' icon='home' :label='vacation.city')
            q-chip(square='' color='purple' text-color='white' icon='alarm' :label='vacation.openingDate')
            q-item-section(side='').text-black
          q-card
            q-card-section
              .text-h6 Требования
            q-card-section.q-pt-none
              | {{vacation.requirement}}
            q-separator(inset='')
            q-card-section
              q-chip(square='' color='purple' text-color='white' :label='vacation.category')
              q-chip(square='' color='purple' text-color='white' :label='vacation.jobType')
            q-card-actions
              q-btn.bg-light-green-7.text-white(@click="setIdVacation(vacation.id)" v-if="isLoginned" align="left" flat label="Откликнуться")
        q-separator
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import PhoneValidation from 'src/validation/PhoneValidation'
import { Vacation } from 'src/models/Vacation'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'
import { User } from 'src/models/auth'
import LoginStore from 'src/store/LoginStore'

@Component({ mixins: [validationMixin], validations: PhoneValidation })
export default class VacationsAnonimous extends Mixins(ApiRequestImpl, LoginStore) {
  private popup = false
  private isLoginned = false
  private phoneNumber = ''
  private idVacation = 0
  private vacantions: Vacation[] = [{
    id: 0,
    city: 'ZALUPYANSK',
    category: 'каво-то',
    jobType: 'что-то',
    role: 'daun',
    requirement: 'TREBOAS;JHASDLFJHQLIJKREHEWKHJLQWERHJT',
    openingDate: '10-123-23',
    state: 'test',
    idProject: 0
  }]

  // eslint-disable-next-line @typescript-eslint/require-await
  private async mounted (): Promise<void> {
    this.isLoginned = !(this.$q.localStorage.getItem('user') as User)
    this.vacantions = await this.getAllVacationsRequest()
  }

  private setIdVacation (idVacation: number): void {
    this.popup = true;
    (this.$refs.phone as HTMLInputElement).focus()
    this.idVacation = idVacation
  }

  @Watch('responseUser')
  private asd (): void {
    this.isLoginned = !this.responseUser
  }

  private async sendUserRespone (): Promise<void> {
    this.$v.$touch()
    if (!this.$v.$anyError) {
      const result: Vacation = await this.sendUserResponeRequest(this.idVacation, this.phoneNumber)
      if (result) {
        this.$q.notify({
          type: 'positive',
          message: 'Заявка успешно отправлена',
          icon: 'report_problem',
          progress: true,
          position: 'bottom'
        })
        this.popup = false
      }
    }
  }

  private isUserAnonimous (): boolean {
    return !(this.$q.localStorage.getItem('user') as User)
  }
}
</script>
