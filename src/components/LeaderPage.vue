<template lang="pug">
  q-layout(view='hHr lpr fff')
    q-card-section
      .text-h6 Сотрудники
    q-card-section.q-pt-none
      q-table(title='Сотрудники' :data='data' :columns='columns' :loading='loading' row-key='name')
        template(v-slot:body='props')
          q-tr(:props='props')

            q-td(key='name' :props='props')
              | {{ props.row.name }}

            q-td(key='role' :props='props')
              | {{ props.row.role }}

            q-td(key='projectName' :props='props')
              | {{ props.row.projectName }}
              q-popup-edit(v-model='props.row.projectName' title='Проект' @before-show='getProjects' @save='save(props.row)' buttons='')
                q-select(v-model='props.row.projectName'
                  :options='projectNames'
                  emit-value
                  option-value='name'
                  option-label='name'
                  @input='valueSelect'
                  label='Доступные проекты')

            q-td(key='dateOfEmployment' :props='props')
              | {{ props.row.dateOfEmployment }}

            q-td(key='phoneNumber' :props='props')
              | {{ props.row.phoneNumber }}

            q-td(key='city' :props='props')
              | {{ props.row.city }}
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'
import { EmployeeHired } from 'src/models/EmployeeHired'
import { Project } from 'src/models/Project'

@Component
export default class LeaderPage extends Mixins(ApiRequestImpl, LoginStore) {
  private loading = false

  private async mounted (): Promise<void> {
    //   eslint-disable-next-line no-unused-expressions
    this.loading = true
    this.data = await this.getAllEmploeeInWork()
    this.loading = false
  }

  private editedProject: Project | null = {
    idProject: 0,
    name: '',
    beginningDate: '',
    budget: 0,
    value: '',
    idDirector: 0
  }

  private projectNames: Project[] = []

  private async getProjects (): Promise<void> {
    const result = await this.$axios.get<Project[]>('/projects')
    if (result.status === 200) {
      this.projectNames = result.data
    } else {
      this.$q.notify({
        type: 'negative',
        message: 'Произошла ошибка',
        icon: 'report_problem',
        progress: true,
        position: 'bottom'
      })
    }

    this.projectNames.forEach((project: Project) => { project.value = project.name })
  }

  private valueSelect <T extends string, V> (value: T, row: V): void {
    this.editedProject = {
      idProject: this.projectNames.filter((project: Project) => project.name === value)[0].idProject,
      name: '',
      beginningDate: '',
      budget: 0,
      value: '',
      idDirector: 0
    }
  }

  private async save <L extends EmployeeHired, O, H> (value: L, initialValue: O, row: H): Promise<void> {
    const formData = new FormData()
    value.projectId = this.editedProject?.idProject as number
    formData.append('employee', JSON.stringify(value))
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

  private data: EmployeeHired[] = [{
    id: 0,
    name: 'string',
    city: 'string',
    projectName: 'string',
    projectId: 0,
    role: 'string',
    dateOfEmployment: 'string',
    salary: 0,
    phoneNumber: 'string'
  }]
}
</script>
