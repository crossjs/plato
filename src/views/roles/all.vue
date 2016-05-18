<template>
  <div class="roles">
    <c-form
      v-for="items in roles.items"
      track-by="_id"
      :state="state"
      :columns="columns"
      :items="items"
      :actions="actions"
      @mutate="_mutate(items._id, $arguments)"></c-form>
  </div>
</template>

<script>
import CForm from 'duo/c-form'
import { roles } from 'vx/getters'
import { getRoles, updateRole } from 'vx/actions'
import { ROLE_LEVEL_OPTIONS } from 'vx/constants'
export default {
  data () {
    return {
      state: 1,
      columns: {
        name: {
          label: '名称',
          type: 'text',
          attrs: {
            readonly: true
          },
          validate: {
            maxlength: 20
          }
        },
        desc: {
          label: '描述',
          type: 'text',
          validate: {
            maxlength: 50
          }
        },
        level: {
          label: '等级',
          type: 'dropdown',
          attrs: {
            options: ROLE_LEVEL_OPTIONS
          }
        },
        created: {
          label: '活跃时间',
          type: 'datetime',
          attrs: {
            readonly: true
          }
        }
      }
    }
  },

  methods: {
    _paginate (query) {
      this.getRoles({
        query
      })
    },
    _mutate (_id, [val]) {
      this.updateRole({ _id, ...val })
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.getRoles()
    }
  },

  vuex: {
    getters: {
      roles
    },
    actions: {
      getRoles,
      updateRole
    }
  },

  components: {
    CForm
  }
}
</script>

<style src="styles/views/roles"></style>
