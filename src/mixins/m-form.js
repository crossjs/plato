import CForm from 'components/c-form'
export default {
  methods: {
    formdata (mutator = data => data) {
      return mutator(Object.keys(this.fields).reduce((obj, key) => {
        obj[key] = this.fields[key].value
        return obj
      }, {}))
    }
  },

  components: {
    CForm
  }
}
