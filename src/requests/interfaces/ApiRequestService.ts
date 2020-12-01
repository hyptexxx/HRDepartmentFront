import { Vacation } from 'src/models/Vacation'

export interface ApiRequestService{
  getAllVacationsRequest (): Promise<Vacation[]>
  sendUserResponeRequest (idVacation: number, phoneNumber: string): Promise<Vacation>
  addRequest (vacation: Vacation): Promise<Vacation>
}
