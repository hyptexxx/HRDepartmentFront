import { User, UserCredentials } from 'src/models/auth'

export interface AuthApiRequest{
  authorize (userCredentials: UserCredentials): Promise<User>
}
