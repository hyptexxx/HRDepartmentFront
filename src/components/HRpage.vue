<template lang="pug">
  q-layout(view='hHr lpr fff')
    q-card-section
      .text-h6 Сотрудники
    q-card-section.q-pt-none
      q-table(title='Список откликнувшихся на вакансию'
        :data='data'
        :columns='columns'
        row-key='name'
        :loading="loading"
        selection="multiple"
        :selected.sync="selected")
        template(v-slot:top='')
          q-btn.bg-light-green-7.text-white(@click="deleteEmployee" align="left" flat :disable="isDisabled" label="Удалить выбранные")
        template(v-slot:top-row='')
          q-tr
            q-td(colspan='100%')
              | Top row
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'
import { EmployeeHired } from 'src/models/EmployeeHired'

@Component
export default class HRpage extends Mixins(ApiRequestImpl, LoginStore) {
  private loading = false
  private isDisabled = true
  private emploee: EmployeeHired = {
    id: 0,
    city: 'string',
    name: 'string',
    idProject: 0,
    role: 'string',
    dateOfEmployment: 'string'
  }

  @Watch('selected')
  private selectedWatcher (): void {
    this.isDisabled = !this.selected?.length
  }

  private selected: EmployeeHired[] | null = []

  private async deleteEmployee (): Promise<void> {
    // eslint-disable-next-line no-unused-expressions
    this.selected?.splice(0, this.selected?.length)
    this.loading = true
    const arrId: number[] = []
    // eslint-disable-next-line no-unused-expressions
    this.selected?.forEach((employee: EmployeeHired) => arrId.push(employee.id))

    await this.deleteEmployeeRequest(arrId)
    if (this.selected) {
      for (let i = 0; i < this.selected?.length; i++) {
        this.selected.forEach((selected: EmployeeHired) => {
          this.data = this.data.filter((employee: EmployeeHired) => selected.id !== employee.id)
        })
      }
    }
    this.loading = false
  }

  // private mounted (): void {
  //   // eslint-disable-next-line no-unused-expressions
  //   this.selected?.splice(0, this.selected?.length)
  // }

  private async mounted (): Promise<void> {
    //   eslint-disable-next-line no-unused-expressions
    this.selected?.splice(0, this.selected?.length)
    this.loading = true
    this.data = await this.getAllEmploeeInWork()
    this.loading = false
  }

  private columns = [
    {
      name: 'name',
      required: true,
      label: 'ФИО',
      align: 'left',
      field: 'row => row.name',
      sortable: true
    },
    { name: 'Номер телефона', align: 'center', label: 'Номер телефона', field: 'phoneNumber', sortable: true },
    { name: 'Город', label: 'Город', field: 'city', sortable: true },
    { name: 'Сопроводительное письмо', label: 'letter', field: 'letter' }
  ]

  private data: EmployeeHired[] = []
}
</script>
