import { Vacation } from 'src/models/Vacation'

export interface ApiRequestService{
  getAllVacationsRequest (): Promise<Vacation[]>
  sendUserResponeRequest(vacation: Vacation, phoneNumber: string): Promise<Vacation>
}
