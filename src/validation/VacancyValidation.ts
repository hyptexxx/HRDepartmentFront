import { required } from 'vuelidate/lib/validators'

export default {
  vacation: {
    city: {
      required
    },
    category: {
      required
    },
    jobType: {
      required
    },
    role: {
      required
    },
    requirement: {
      required
    }
  }
}
