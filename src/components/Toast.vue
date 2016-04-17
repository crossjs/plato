<template>
  <section class="toasts" v-if="toasts.length" transition="slide">
    <div class="toast" v-for="toast in toasts" track-by="_id" transition="slide">
      <button class="ignore" @click="deleteToast(toast)">ⓧ</button>
      <pre class="code"><code> {{toast.code}} </code></pre>
      <pre class="message"><code> {{toast.message}} </code></pre>
    </div>
  </section>
</template>

<script>
import {
  deleteToast
} from 'vx/actions'
import { toasts } from 'vx/getters'
export default {
  // props: ['toasts'],
  vuex: {
    getters: {
      toasts
    },
    actions: {
      deleteToast
    }
  }
}
</script>

<style>
@import "utils/variables";

.toasts {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
}

.toast {
  margin: 0 auto 0.25rem;
  padding: 0.5rem;
  width: 50%;
  max-width: 16rem;
  min-width: 12rem;
  background: var(--white);
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.3);

  & .ignore {
    cursor: pointer;
    float: right;
    width: 1.05rem;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.05rem;
    border: none;
    color: color(var(--black) lightness(60%));
    background-color: var(--white);
    border-radius: 50%;
    &:hover {
      color: var(--orange);
    }
  }
  & .code {
    &:before {
      content: "code: ";
    }
  }
  & .message {
    &:before {
      content: "message: ";
    }
    margin-top: 0.5rem;
    max-height: 16rem;
    overflow: auto;
  }
}

.slide-transition {
  transition: all .5s ease;
}
.slide-enter, .slide-leave {
  opacity: 0;
  transform: translate3d(0, -1rem, 0);
}
</style>
