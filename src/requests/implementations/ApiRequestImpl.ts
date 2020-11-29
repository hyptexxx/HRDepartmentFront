import { Vue, Component } from 'vue-property-decorator'
import { ApiRequestService } from 'src/requests/interfaces/ApiRequestService'
import { Vacation } from 'src/models/Vacation'

@Component
export default class ApiRequestImpl extends Vue implements ApiRequestService {
  public async getAllVacationsRequest (): Promise<Vacation[]> {
    const result = await this.$axios.get<Vacation[]>('/vacantion')

    return result.data
  }

  public async sendUserResponeRequest (vacation: Vacation, phoneNumber: string): Promise<Vacation> {
    const formData = new FormData()
    formData.append('vacation', JSON.stringify(vacation))
    formData.append('phoneNumber', phoneNumber)

    const result = await this.$axios.post<Vacation>('/vacantion', formData)

    return result.data
  }
}
