<template lang="pug">
  q-layout(view='hHr lpr fff')
    q-card-section
      .text-h6 Сотрудники
    q-card-section.q-pt-none
      q-table(title='Список откликнувшихся на вакансию'
        :data='data'
        :columns='columns'
        row-key='id'
        :loading="loading"
        selection="multiple"
        :selected.sync="selected")
        template(v-slot:top='')
          q-chip.bg-light-green-1(square='' color='#DBE8D1' text-color='black' icon='home' :label='sum')
        template(v-slot:top-row='')
          q-tr
            q-td(colspan='100%')
              | Top row
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'
import { EmployeeHired } from 'src/models/EmployeeHired'

@Component
export default class ACCOUNTANTpage extends Mixins(ApiRequestImpl, LoginStore) {
  private loading = false
  private sum = 0

  private async mounted (): Promise<void> {
    this.loading = true
    this.data = await this.getAllEmploeeInWork()
    if (this.data.length) {
      this.data.forEach((employee: EmployeeHired) => { this.sum += employee.salary })
    }
    this.loading = false
  }

  private columns = [
    {
      name: 'name',
      required: true,
      label: 'ФИО',
      align: 'center',
      field: 'name',
      sortable: true
    },
    { name: 'role', align: 'center', label: 'Роль', field: 'role', sortable: true },
    { name: 'projectName', align: 'center', label: 'Проект', field: 'projectName', sortable: true },
    { name: 'dateOfEmployment', align: 'center', label: 'Дата принятия', field: 'dateOfEmployment', sortable: true },
    { name: 'phoneNumber', align: 'center', label: 'Номер телефона', field: 'phoneNumber', sortable: true },
    { name: 'city', label: 'Город', align: 'center', field: 'city', sortable: true }
  ]

  private data: EmployeeHired[] = []
}
</script>
