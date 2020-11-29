import { User } from 'src/models/auth'

export default interface LoginStoreInterface{
  visible: boolean;
  loginned: boolean
  user: User | null
}
