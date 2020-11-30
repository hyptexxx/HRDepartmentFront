import { Vue, Component } from 'vue-property-decorator'
import { ApiRequestService } from 'src/requests/interfaces/ApiRequestService'
import { Vacation } from 'src/models/Vacation'

@Component
export default class ApiRequestImpl extends Vue implements ApiRequestService {
  public async getAllVacationsRequest (): Promise<Vacation[]> {
    const result = await this.$axios.get<Vacation[]>('/vacancy')

    return result.data
  }

  public async sendUserResponeRequest (idVacation: number, phoneNumber: string): Promise<Vacation> {
    const formData = new FormData()

    formData.append('idVacation', idVacation.toString())
    formData.append('phoneNumber', phoneNumber)

    const result = await this.$axios.post<Vacation>('/vacancy', formData)

    return result.data
  }
}
