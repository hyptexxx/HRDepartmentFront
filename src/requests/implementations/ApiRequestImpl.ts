import { Vue, Component } from 'vue-property-decorator'
import { ApiRequestService } from 'src/requests/interfaces/ApiRequestService'
import { Vacation } from 'src/models/Vacation'
import { Employee } from 'src/models/Emploee'
import { EmployeeHired } from 'src/models/EmployeeHired'

@Component
export default class ApiRequestImpl extends Vue implements ApiRequestService {
  public async getAllVacationsRequest (): Promise<Vacation[]> {
    const result = await this.$axios.get<Vacation[]>('/vacancy')

    return result.data
  }

  public async sendUserResponeRequest (idVacation: number, employee: Employee): Promise<Vacation> {
    const formData = new FormData()

    formData.append('idVacancy', idVacation.toString())
    formData.append('potentialEmployee', JSON.stringify(employee))

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

  public async getAllEmploee (idVacancy: number): Promise<Employee[]> {
    const result = await this.$axios.get<Employee[]>('/vacancy/potentialEmployee/', {
      params: {
        vacancyId: idVacancy
      }
    })

    return result.data
  }

  public async getAllEmploeeInWork (): Promise<EmployeeHired[]> {
    const result = await this.$axios.get<EmployeeHired[]>('/employee')

    return result.data
  }

  public async deleteEmployeeRequest (employeeId: number[]): Promise<void> {
    await this.$axios.delete('/vacancy', { data: { employeeId: JSON.stringify(employeeId) } })
  }
}
