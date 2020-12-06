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
              q-popup-edit(v-model='props.row.name' title='ФИО' @save='save(props.row)' buttons='')
                q-input(v-model='props.row.name' dense='' autofocus='')
            q-td(key='role' :props='props')
              | {{ props.row.role }}
              q-popup-edit(v-model='props.row.role' title='Роль' @save='save(props.row)' buttons='')
                q-input(v-model='props.row.role' dense='' autofocus='')
            q-td(key='city' :props='props')
              .text-pre-wrap {{ props.row.city }}
              q-popup-edit(v-model='props.row.city' title='Город' @save='save(props.row)' buttons='')
                q-input(v-model='props.row.city' dense='' autofocus='')
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'
import ApiRequestImpl from 'src/requests/implementations/ApiRequestImpl'
import { EmployeeHired } from 'src/models/EmployeeHired'

@Component
export default class LeaderPage extends Mixins(ApiRequestImpl, LoginStore) {
  private loading = false

  private mounted (): void {
    //   eslint-disable-next-line no-unused-expressions
    this.loading = true
    // this.data = await this.getAllEmploeeInWork()
    this.loading = false
  }

  private async save <L, O, H> (value: L, initialValue: O, row: H): Promise<void> {
    const formData = new FormData()

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
    phoneNumber: 'string'
  }]
}
</script>
