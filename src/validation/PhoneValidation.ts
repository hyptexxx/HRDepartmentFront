import { required } from 'vuelidate/lib/validators'

export default {
  emploee: {
    city: { required },
    name: { required },
    letter: { required },
    phoneNumber: { required }
  }
}
