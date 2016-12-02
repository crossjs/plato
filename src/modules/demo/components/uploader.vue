<template>
  <div class="d-uploader">
    <c-pane>
      <p>Simple Uploader</p>
      <c-uploader action="/api/upload" @change="change">
        <div class="d-uploader-container">
          <div class="d-uploader-preview">
            <img v-if="src" :src="src" :alt="file.name" />
            <c-icon v-if="src === false" class="d-uploader-icon fs-64">file-text</c-icon>
            <div class="d-uploader-progress" v-if="percent && percent !== 100" :style="{height: `${percent}%`}">
            </div>
            <div class="d-uploader-text" v-if="percent && percent !== 100">
              <p>{{ percent }}</p>
            </div>
          </div>
        </div>
      </c-uploader>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/core/pane'
import CIcon from 'components/core/icon'
import CUploader from 'components/uploader'

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
    CPane,
    CIcon,
    CUploader
  }
}
</script>

<style src="../styles/index"></style>
