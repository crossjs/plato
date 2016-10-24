<template lang="html">
  <div class="d-upload">
    <c-pane>
      <p>Simple Uploader</p>
      <c-upload action="/api/upload" @change="change">
        <div class="d-upload-container">
          <div class="d-upload-preview">
            <img v-if="src" :src="src" :alt="file.name" />
            <c-icon v-if="src === false" class="d-upload-icon fs-64">file-text</c-icon>
            <div class="d-upload-progress" v-if="percent && percent !== 100" :style="{height: `${percent}%`}">
            </div>
            <div class="d-upload-text" v-if="percent && percent !== 100">
              <p>{{ percent }}</p>
            </div>
          </div>
        </div>
      </c-upload>
    </c-pane>
  </div>
</template>

<script>
import CUpload from 'components/c-upload'
import CPane from 'components/c-pane'
import CIcon from 'components/c-icon'

export default {
  data () {
    return {
      percent: undefined,
      file: {},
      src: undefined
    }
  },

  methods: {
    change (ret, file) {
      console.log('------------------------------')
      console.log(ret)
      console.log(file)
      if (ret.percent) {
        this.percent = +ret.percent.toFixed(0)
      }
      this.file = {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.filename || file.name,
        size: file.size,
        type: file.type,
        uid: file.uid
      }
      if (/^image\//.test(file.type)) {
        const reader = new FileReader()
        reader.onload = e => {
          this.src = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.src = false
      }
      console.log('------------------------------')
    }
  },
  components: {
    CUpload,
    CPane,
    CIcon
  }
}
</script>

<style src="styles/demo"></style>
