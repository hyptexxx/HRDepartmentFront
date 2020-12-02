import { Vue, Component } from 'vue-property-decorator'
import { ApiRequestService } from 'src/requests/interfaces/ApiRequestService'
import { Vacation } from 'src/models/Vacation'
import { Employee } from 'src/models/Emploee'

@Component
export default class ApiRequestImpl extends Vue implements ApiRequestService {
  public async getAllVacationsRequest (): Promise<Vacation[]> {
    const result = await this.$axios.get<Vacation[]>('/vacancy')

    return result.data
  }

  public async sendUserResponeRequest (idVacation: number, employee: Employee): Promise<Vacation> {
    const formData = new FormData()

    formData.append('idVacancy', idVacation.toString())
    formData.append('phoneNumber', JSON.stringify(employee))

    const result = await this.$axios.post<Vacation>('/vacancy', formData)

    return result.data
  }

  public async addRequest (vacation: Vacation): Promise<Vacation> {
    const formData = new FormData()

    formData.append('vacancy', JSON.stringify(vacation))

    const result = await this.$axios.post<Vacation>('/vacancy/add', formData)

    return result.data
  }

  public async deleteVacancy (id: number): Promise<void> {
    await this.$axios.delete('/vacancy', { data: { idVacancy: id } })
  }

  public async editRequestSender (vacation: Vacation): Promise<Vacation> {
    const formData = new FormData()

    formData.append('vacancy', JSON.stringify(vacation))

    const result = await this.$axios.post<Vacation>('/vacancy/edit', formData)

    return result.data
  }
}
