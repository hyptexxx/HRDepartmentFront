<template lang="pug">
  q-layout(view='hHr lpr fff')
    q-dialog(v-model='isEditVisible')
      q-card
        q-card-section.row.items-center.q-pb-none
          .text-h6 Редактирование вакансии
          q-space
          q-btn(icon='close' flat='' round='' dense='' v-close-popup='')
        q-card-section
          q-input(filled v-model="emploee.salary" label="Зарплата" type='text')
          q-input(filled v-model="emploee.phoneNumber" label="Телефон" type='text')
          q-input(filled v-model="emploee.role" label="Роль" type='text')
          q-input(filled v-model="emploee.name" label="ФИО" type='text')
          q-input(filled v-model="emploee.city" label="Город" type='text')
        q-card-section(side='')
          q-btn.bg-light-green-7.text-white(@click="editRequest" flat label="Внести изменения")
    q-card-section
      .text-h6 Сотрудники
    q-card-section.q-pt-none
      q-table(title='Список откликнувшихся на вакансию'
        :data='data'
        :columns='columns'
        row-key='id'
        :loading="loading"
        @row-click='editRow'
        selection="multiple"
        :selected.sync="selected")
        template(v-slot:top='')
          q-btn.bg-light-green-7.text-white(@click="deleteEmployee" align="left" flat :disable="isDisabled" label="Удалить выбранные")
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'
import { EmployeeHired } from 'src/models/EmployeeHired'

@Component
export default class HRpage extends Mixins(ApiRequestImpl, LoginStore) {
  private loading = false
  private isEditVisible = false
  private isDisabled = true
  private emploee: EmployeeHired = {
    id: 0,
    name: 'string',
    city: 'string',
    projectName: 'string',
    projectId: 0,
    role: 'string',
    dateOfEmployment: 'string',
    salary: 0,
    phoneNumber: 'string'
  }

  @Watch('selected')
  private selectedWatcher (): void {
    this.isDisabled = !this.selected?.length
  }

  private async editRequest (): Promise<void> {
    console.log(this.emploee)
    const formData = new FormData()
    formData.append('employee', JSON.stringify(this.emploee))
    const result = await this.$axios.post('/employee/edit', formData)
    if (result.status === 200) {
      this.$q.notify({
        type: 'positive',
        message: 'Изменения внесены',
        icon: 'report_problem',
        progress: true,
        position: 'bottom'
      })
    } else {
      this.$q.notify({
        type: 'negative',
        message: 'Произошла ошибка',
        icon: 'report_problem',
        progress: true,
        position: 'bottom'
      })
    }
  }

  private selected: EmployeeHired[] | null = []

  private editRow <T, E extends EmployeeHired, V> (evt:T, row:E, index:V): void {
    this.isEditVisible = true
    this.emploee = row
  }

  private async deleteEmployee (): Promise<void> {
    this.loading = true
    const arrId: number[] = []
    // eslint-disable-next-line no-unused-expressions
    this.selected?.forEach((employee: EmployeeHired) => arrId.push(employee.id))
    const result = await this.$axios.delete(`/employee/${arrId.toString()}`)
    if (result.status === 200) {
      if (this.selected) {
        this.selected = this.selected?.splice(0, this.selected?.length)
      }
      if (this.selected) {
        for (let i = 0; i < this.selected?.length; i++) {
          this.selected.forEach((selected: EmployeeHired) => {
            this.data = this.data.filter((employee: EmployeeHired) => selected.id !== employee.id)
          })
        }
      }
    }

    this.loading = false
  }

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
      align: 'center',
      field: 'name',
      sortable: true
    },
    { name: 'role', align: 'center', label: 'Роль', field: 'role', sortable: true },
    { name: 'projectName', align: 'center', label: 'Проект', field: 'projectName', sortable: true },
    { name: 'dateOfEmployment', align: 'center', label: 'Дата принятия', field: 'dateOfEmployment', sortable: true },
    { name: 'phoneNumber', align: 'center', label: 'Номер телефона', field: 'phoneNumber', sortable: true },
    { name: 'salary', label: 'Зарплата', align: 'center', field: 'salary', sortable: true },
    { name: 'city', label: 'Город', align: 'center', field: 'city', sortable: true }
  ]

  private data: EmployeeHired[] = [
    {
      id: 0,
      name: '2345',
      city: 'str232345ing',
      projectName: '2345',
      projectId: 0,
      role: '2345',
      dateOfEmployment: 'string',
      salary: 0,
      phoneNumber: 'string'
    },
    {
      id: 0,
      name: '2345er',
      city: 'wert',
      projectName: 'wert34',
      projectId: 0,
      role: '23452345',
      dateOfEmployment: 'string',
      salary: 0,
      phoneNumber: 'string'
    }
  ]
}
</script>
