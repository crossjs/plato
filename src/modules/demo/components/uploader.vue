<template>
  <c-pane class="uploader">
    <p>Simple Uploader</p>
    <c-uploader action="/api/upload" @change="change">
      <div class="uploader-container">
        <div class="uploader-preview">
          <img v-if="src" :src="src" :alt="file.name" />
          <c-icon v-if="src === false" class="uploader-icon fs-64">file-text</c-icon>
          <div class="uploader-progress" v-if="percent && percent !== 100" :style="{height: `${percent}%`}">
          </div>
          <div class="uploader-text" v-if="percent && percent !== 100">
            <p>{{ percent }}</p>
          </div>
        </div>
      </div>
    </c-uploader>
  </c-pane>
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

<style scoped>
.uploader {
  padding: dpr(5px);
}

.uploader-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.uploader-preview {
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: 100%;
  }

  & > p {
    width: 100%;
    height: 100%;
    text-align: center;
    text-transform: capitalize;
  }
}

.uploader-progress {
  width: 100%;
  height: 0;
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(56, 173, 255, 0.2);
  transition: height 0.3s linear;
}

.uploader-text {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.uploader-icon {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
