<template lang="pug">
  q-card.my-card(bordered='')
    q-dialog(v-model='popup')
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-h6 Введите номер телефона
          q-space
          q-btn(icon='close' flat='' round='' dense='' v-close-popup='')
        q-card-section
          q-input(filled v-model="emploee.city" label="Город" type='text' ref="phone" @keydown.enter="sendUserRespone")
          span.text-red-10(v-if="!$v.emploee.city.required && $v.emploee.city.$params.required" class="error-label") Обязательно
          q-input(filled v-model="emploee.name" label="ФИО" type='text' ref="phone" @keydown.enter="sendUserRespone")
          span.text-red-10(v-if="!$v.emploee.name.required && $v.emploee.name.$params.required" class="error-label") Обязательно
          q-input(filled v-model="emploee.letter" label="Сопроводительное письмо" type='text' ref="phone" @keydown.enter="sendUserRespone")
          span.text-red-10(v-if="!$v.emploee.letter.required && $v.emploee.letter.$params.required" class="error-label") Обязательно
          q-input(filled v-model="emploee.phoneNumber" label="Номер телефона" type='text' ref="phone" @keydown.enter="sendUserRespone")
          span.text-red-10(v-if="!$v.emploee.phoneNumber.required && $v.emploee.phoneNumber.$params.required" class="error-label") Обязательно
        q-card-section(side='')
          q-btn.bg-light-green-7.text-white(@click="sendUserRespone" flat label="Отправить")
    q-dialog(v-model='isAddVisible')
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-h6 Заполните форму добавления вакансии
          q-space
          q-btn(icon='close' flat='' round='' dense='' v-close-popup='')
        q-card-section
          q-input(filled v-model="vacation.city" label="Введите город" type='text')
          q-input(filled v-model="vacation.category" label="Введите категорию" type='text')
          q-input(filled v-model="vacation.jobType" label="Введите тип вакансии" type='text')
          q-input(filled v-model="vacation.role" label="Введите роль" type='text')
          q-input(filled v-model="vacation.requirement" label="Введите описание" type='text')
        q-card-section(side='')
          q-btn.bg-light-green-7.text-white(@click="sendAddRequest" flat label="Добавить")
    q-dialog(v-model='isEditVisible')
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-h6 Редактирование вакансии
          q-space
          q-btn(icon='close' flat='' round='' dense='' v-close-popup='')
        q-card-section
          q-input(filled v-model="vacation.city" label="Введите город" type='text')
          q-input(filled v-model="vacation.category" label="Введите категорию" type='text')
          q-input(filled v-model="vacation.jobType" label="Введите тип вакансии" type='text')
          q-input(filled v-model="vacation.role" label="Введите роль" type='text')
          q-input(filled v-model="vacation.requirement" label="Введите описание" type='text')
        q-card-section(side='')
          q-btn.bg-light-green-7.text-white(@click="editRequest" flat label="Внести изменения")
    q-card-section
      .text-h6 Доступные вакансии
      .text-subtitle2 Вакансии
      q-btn.bg-light-green-7.text-white(@click="isAddVisible = true" v-if="!isLoginned" flat label="Добавить вакансию")
    q-separator(inset='')
    q-card-section
      q-list.rounded-borders(bordered='')
        q-expansion-item.bg-grey-2(v-for="vacation in vacantions" default-opened)
          template(v-slot:header='')
            q-item-section(avatar='')
              q-chip(square='' color='white' text-color='black' :label='vacation.role')
            q-item-section
            q-chip.bg-light-green-1(square='' color='#DBE8D1' text-color='black' icon='home' :label='vacation.city')
            q-chip.bg-light-blue-1(square='' color='#EEE6FF' text-color='black' icon='alarm' :label='vacation.openingDate')
            q-item-section(side='').text-black
          q-card
            q-card-section
              .text-h6 Требования
            q-card-section.q-pt-none
              | {{vacation.requirement}}
            q-separator(inset='')
            q-card-section
              q-chip.bg-light-green-1(square='' color='#DBE8D1' text-color='black' :label='vacation.category')
              q-chip.bg-light-green-1(square='' color='#DBE8D1' text-color='black' :label='vacation.jobType')
            q-card-actions
              q-btn.bg-light-green-7.text-white(@click="setIdVacation(vacation.id)" v-if="isLoginned" align="left" flat label="Откликнуться")
              q-btn.bg-light-green-7.text-white(@click="deleteVacantion(vacation.id)" v-if="!isLoginned" align="left" flat label="Удалить")
              q-btn.bg-light-green-7.text-white(@click="editVacantion(vacation)" v-if="!isLoginned" align="left" flat label="Редактировать")
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
import { Employee } from 'src/models/Emploee'

@Component({ mixins: [validationMixin], validations: PhoneValidation })
export default class VacationsAnonimous extends Mixins(ApiRequestImpl, LoginStore) {
  private popup = false
  private isLoginned = false
  private isAddVisible = false
  private isEditVisible = false
  private phoneNumber = ''
  private idVacation = 234

  private emploee: Employee = {
    city: '',
    name: '',
    letter: '',
    phoneNumber: ''
  }

  private vacantions: Vacation[] | null = [{
    id: 12,
    city: 'ZALUPYANSK',
    category: 'каво-то',
    jobType: 'что-то',
    role: 'daun',
    requirement: 'TREBOAS;JHASDLFJHQLIJKREHEWKHJLQWERHJT',
    openingDate: '10-123-23',
    stateId: 0,
    projectId: 0
  }]

  private vacation: Vacation | null = {
    id: 0,
    city: '',
    category: '',
    jobType: '',
    role: '',
    requirement: '',
    openingDate: '2020-10-10',
    stateId: 1,
    projectId: 100
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async mounted (): Promise<void> {
    this.isLoginned = !(this.$q.localStorage.getItem('user') as User)
    this.vacantions = await this.getAllVacationsRequest()
  }

  private editVacantion (idVacation: Vacation): void {
    this.isEditVisible = true
    this.vacation = idVacation
  }

  private setIdVacation (idVacation: number): void {
    this.popup = true
    this.idVacation = idVacation
  }

  private async editRequest (): Promise<void> {
    if (this.vacation) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      const result: Vacation = await this.editRequestSender(this.vacation)
      if (result && this.vacantions) {
        this.vacantions = this.vacantions?.filter((e: Vacation) => { return e.id !== result.id })
        this.vacantions.push(result)
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

  private async deleteVacantion (id: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    const result = await this.$axios.delete(`/vacancy/${id}`)
    switch (result.status) {
      case 200:
        if (this.vacantions) {
          this.vacantions = this.vacantions?.filter((e: Vacation) => { return e.id !== id })
        }
        this.isAddVisible = false
        this.vacation = null
        this.$q.notify({
          type: 'positive',
          message: 'Запись удалена',
          icon: 'report_problem',
          progress: true,
          position: 'bottom'
        })
        break
    }
  }

  @Watch('responseUser')
  private responseUserWatch (): void {
    this.isLoginned = !this.responseUser
  }

  private async sendAddRequest (): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    let vacancy: Vacation
    if (this.vacation) {
      vacancy = await this.addRequest(this.vacation)
      if (vacancy) {
        if (this.vacantions) {
          this.vacantions.push(vacancy)
        }
        this.$q.notify({
          type: 'positive',
          message: 'Запись добавлена',
          icon: 'report_problem',
          progress: true,
          position: 'bottom'
        })
      } else {
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

  private async sendUserRespone (): Promise<void> {
    this.$v.$touch()
    if (!this.$v.$anyError) {
      const result: Vacation = await this.sendUserResponeRequest(this.idVacation, this.emploee)
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
    } else {
      this.$q.notify({
        color: 'negative',
        message: 'Поля не заполнены',
        icon: 'report_problem',
        progress: true,
        position: 'bottom'
      })
    }
  }

  private isUserAnonimous (): boolean {
    return !(this.$q.localStorage.getItem('user') as User)
  }
}
</script>
