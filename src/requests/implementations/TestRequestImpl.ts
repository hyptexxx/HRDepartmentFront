import { Vue, Component } from 'vue-property-decorator'
import { textApiRequest } from 'src/requests/interfaces/textApiRequest'

@Component
export default class TestRequestImpl extends Vue implements textApiRequest {
  public async getTest (): Promise<string> {
    const result = await this.$axios.get<string>('/test/', {
      params: {
        param: 'wqerkjqwerqwekrqwekljrqwer'
      }
    })
    return result.data
  }
}
