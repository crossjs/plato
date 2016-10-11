<template lang="html">
  <div class="c-upload"
    @click="onClick"
    @keydown="onKeyDown"
    @drop="onFileDrop"
    @dragover="onFileDrop">
    <c-icon class="c-upload-icon fs-64" v-if="!choosed">inbox</c-icon>
    <input
      type="file"
      ref="file"
      style="display: none"
      :accept="accept"
      :multiple="multiple"
      @change="onChange" />
      <slot></slot>
  </div>
</template>

<script>
import upload from './upload'
import CIcon from 'components/c-icon'

let i = 0

function uid () {
  return `file-${Date.now()}-${++i}`
}
export default {
  props: {
    accept: {
      default: '',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    action: {
      default: '',
      type: String
    },
    data: {
      default: () => ({})
    }
  },
  data () {
    return {
      choosed: false
    }
  },
  methods: {
    onChange (e) {
      const files = e.target.files
      this.uploadFiles(files)
    },
    onClick (e) {
      const fileInputEl = this.$refs.file
      if (!fileInputEl) {
        return
      }

      fileInputEl.click()
      fileInputEl.value = ''
    },
    onKeyDown (e) {
      if (e.key === 'Enter') {
        this.onClick()
      }
    },
    onFileDrop (e) {
      if (e.type === 'dragover') {
        return e.preventDefault()
      }
      const files = e.dataTransfer.files
      this.uploadFiles(files)
      e.preventDefault()
    },
    uploadFiles (files) {
      const len = files.length
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          const file = files.item(i)
          file.uid = uid()
          this.uploadFile(file)
          this.choosed = true
          this.$emit('change', { percent: 0 }, file)
        }
        // if (this.multiple) {
        //   this.onStart(Array.prototype.slice.call(files))
        // } else {
        //   this.onStart(Array.prototype.slice.call(files)[0])
        // }
      }
    },
    uploadFile (file) {
      this.post(file)
      // if (!this.beforeUpload) {
      //   return this.post(file)
      // }
      // const before = this.beforeUpload(file)
      // if (before && before.then) {
      //   before.then(() => {
      //     this.post(file)
      //   })
      // } else if (before !== false) {
      //   this.post(file)
      // }
    },
    post (file) {
      let data = this.data
      if (typeof data === 'function') {
        data = data()
      }
      if (!file.name && file.filename) {
        file.name = file.filename
      }
      const { name } = file
      if (!data.name) {
        data.name = name
      }
      if (this.action) {
        upload({
          action: this.action,
          filename: name,
          file,
          data,
          onProgress: e => {
            this.$emit('change', e, file)
          },
          onSuccess: ret => {
            this.$emit('change', ret, file)
          },
          onError: (err, ret = {}) => {
            if (typeof ret !== 'object') {
              ret = { message: ret }
            }
            if (err) {
              ret.error = err
            }
            this.$emit('change', ret, file)
          }
        })
      }
    }
  },
  components: {
    CIcon
  }
}
</script>

<style src="styles/components/upload"></style>
