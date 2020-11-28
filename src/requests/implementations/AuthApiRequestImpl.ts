import { Vue, Component } from 'vue-property-decorator'
import { AuthApiRequest } from 'src/requests/interfaces/AuthApiRequest'
import { User, UserCredentials } from 'src/models/auth'

@Component
export default class AuthApiRequestImpl extends Vue implements AuthApiRequest {
  public async authorize (userCredentials: UserCredentials): Promise<User> {
    const result = await this.$axios.get<User>('/auth', {
      params: {
        login: userCredentials.login,
        password: userCredentials.password
      }
    })
    return result.data
  }
}
