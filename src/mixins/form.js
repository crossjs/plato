import CForm from 'components/c-form'

export default {
  methods: {
    formdata (mutator = data => data) {
      return mutator(this.fields.reduce((obj, field) => {
        obj[field.name] = field.value
        return obj
      }, {}))
    }
  },

  components: {
    CForm
  }
}
