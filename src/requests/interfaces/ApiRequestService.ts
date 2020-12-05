import { Vacation } from 'src/models/Vacation'
import { Employee } from 'src/models/Emploee'
import { EmployeeHired } from 'src/models/EmployeeHired'
export interface ApiRequestService{

  getAllVacationsRequest (): Promise<Vacation[]>

  sendUserResponeRequest (idVacation: number, emploee: Employee): Promise<Vacation>

  addRequest (vacation: Vacation): Promise<Vacation>

  editRequestSender (vacation: Vacation): Promise<Vacation>

  deleteVacancy (id: number): Promise<void>

  getAllEmploee(idVacancy: Vacation): Promise<Employee[]>

  getAllEmploeeInWork(): Promise<EmployeeHired[]>

  deleteEmployeeRequest(employeeId: number[]): Promise<void>

}
