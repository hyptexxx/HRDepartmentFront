<template lang="pug">
  q-card.my-card(bordered='')
    q-dialog(v-model='popup')
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-h6 Введите номер телефона
          q-space
          q-btn(icon='close' flat='' round='' dense='' v-close-popup='')
        q-card-section
          q-input(filled v-model="phoneNumber" label="Введите номер телефона" type='text')
          span.text-red-10(v-if="!$v.phoneNumber.required && $v.phoneNumber.$params.required" class="error-label") Обязательно
        q-card-section
          q-btn.bg-light-green-7.text-white(@click="sendUserRespone(vacantions[0])" flat label="Отправить")
    q-card-section
      .text-h6 Доступные вакансии
      .text-subtitle2 Вакансии
    q-separator(inset='')
    q-card-section
      q-list.rounded-borders(bordered='')
        q-expansion-item.bg-grey-2(v-for="n in 10")
          template(v-slot:header='')
            q-item-section(avatar='')
              q-avatar(icon='work' color='dark' text-color='white')
            q-item-section
              | Сутенёр
          q-card(style="display: flex;")
            q-card-section
              | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              | commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              | eveniet doloribus ullam aliquid.
            q-btn.bg-light-green-7.text-white(@click="popup = true" v-if="isUserAnonimous()" align="left" flat label="Откликнуться")
        q-separator
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import PhoneValidation from 'src/validation/PhoneValidation'
import { Vacation } from 'src/models/Vacation'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'
import { User } from 'src/models/auth'

@Component({ mixins: [validationMixin], validations: PhoneValidation })
export default class VacationsAnonimous extends Mixins(ApiRequestImpl) {
  private popup = false
  private phoneNumber = ''
  private vacantions: Vacation[] = [{
    idVacancy: 0,
    city: 'test',
    category: 'test',
    jobType: 'test',
    role: 'test',
    requirements: 'test',
    openingDate: 'test',
    state: 'test',
    idProject: 0
  }]

  private async mounted (): Promise<void> {
    this.vacantions = await this.getAllVacationsRequest()
  }

  private async sendUserRespone (vacation: Vacation): Promise<void> {
    this.$v.$touch()
    if (!this.$v.$anyError) {
      const result: Vacation = await this.sendUserResponeRequest(this.vacantions[0], this.phoneNumber)
      if (result) {
        // todo delete vacantion from page
      }
    }
  }

  private isUserAnonimous (): boolean {
    console.log((this.$q.localStorage.getItem('user') as User).role)
    return (this.$q.localStorage.getItem('user') as User).role === 'anonimous'
  }
}
</script>
