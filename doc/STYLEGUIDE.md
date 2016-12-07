# Style Guide

## 目录

1. [优先使用 ES6/7 语法](#user-content-优先使用-es-67-语法)
1. <del>[不使用 `$broadcast` 与 `$dispatch`](#user-content-不使用-broadcast-与-dispatch)</del>
1. [尽量使用单向绑定](#user-content-尽量使用单向绑定)
1. [数据初始化](#user-content-数据初始化)
1. [Watch 的范围应尽量小](#user-content-watch-的范围应尽量小)
1. [使用 .vue 文件编写组件](#user-content-使用-vue-文件编写组件)
1. [自定义元素的标签名应包含连字符](#user-content-自定义元素的标签名应包含连字符)
1. [合理使用内置元素的内置属性](#user-content-合理使用内置元素的内置属性)
1. [可复用组件应定义清晰的公开接口](#user-content-可复用组件应定义清晰的公开接口)
1. [模板的顶级元素始终是单个元素](#user-content-模板的顶级元素始终是单个元素)
1. [Props 是只读的](#user-content-props-是只读的)
1. [避免使用函数作为组件 Props](#user-content-避免使用函数作为组件-props)
1. [使用简写语法](#user-content-使用简写语法)
1. [遵循组合优于继承的原则](#user-content-遵循组合优于继承的原则)
1. [使用 normalizr 优化数据](#user-content-使用-normalizr-优化数据)

## 优先使用 ES 6/7 语法

  - 与社区偏好保持一致，可以更好地利用社区资源
  - 必要时使用 babel 或 rollup 转成 ES5 兼容的语法

```js
// deprecated:
var foo = 'foo'

// avoid:
let bar = 'bar'

// avoid:
const foo = 'foo',
  bar = 'bar',
  baz = 'baz'

// recommended:
const foo = 'foo'
const bar = 'bar'
const baz = 'baz'
```

## 不使用 `$broadcast` 与 `$dispatch`

  - 跨多级传递数据会降低可维护性，应尽量避免（多级数据传递，可考虑采用 Vuex 进行统一的数据中心管理）
  - vue@2.x 已经不支持 $broadcast 与 $dispatch方法，基于 vue@1.x 的项目，应考虑未来可以更平缓地升级
  - 必要时使用逐级向上 `$emit` 来实现 `$dispatch` 的效果

## 尽量使用单向绑定

- 虽然 Vue 支持双向绑定，但应尽量使用单向绑定，让数据流易于理解
- 父组件通过属性（`props`）向子组件传递数据，子组件通过事件（`$emit`）向父组件传递数据变化

## 数据初始化

  - 明确定义的数据模型更加适合 Vue 的数据观察模式
  - 建议在定义组件时，在 data 选项中初始化所有已知的需要进行动态观察的属性

  为什么要这样做呢？因为 Vue 是通过递归遍历初始数据中的所有属性，并用 Object.defineProperty 把它们转化为 getter 和 setter 来实现数据观察的。如果一个属性在实例创建时不存在于初始数据中，那么 Vue 就没有办法观察这个属性了。

例如，给定下面的模板：

```html
<div id="demo">
<p :class="green: validation.valid">{{message}}</p>
<input v-model="message">
</div>
```

```js
// avoid:
new Vue({
  el: '#demo',
  data: {}
})

// recommended:
new Vue({
  el: '#demo',
  data: {
    message: '',
    validation: {
      valid: false
    }
  }
})
```

## Watch 的范围应尽量小

  - 更直接，更明确，以及更好地利用 Vue 的响应系统

```js
// .vue
export default {
  data () {
    return {
      a: {
        b: {
          c: 1
        }
      }
    }
  },
  ready () {
    this.a.b.c = 2
    // or
    this.a = {
      b: {
        c: 2
      }
    }
  },
  watch: {
    'a.b.c': function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      // -> new: 2, old: 1
    }
  }
}
```

## 使用 .vue 文件编写组件

  - 除必要的 v-for/v-if 外，数据逻辑应尽量写在 script 里，保持 template 逻辑简单
  - 组件样式文件应使用外链，方便自定义皮肤

## 自定义元素的标签名应包含连字符

  - 因为浏览器内置的 HTML 元素标签名，都不含有连字符（`-`），这样可以做到有效区分。[参考](http://javascript.ruanyifeng.com/htmlapi/webcomponents.html#toc4)

## 合理使用内置元素的内置属性

  - 自定义元素的自定义属性应避免**占用**内置元素的内置属性

假设有 c-button.vue 组件实现对 button 元素的封装，输出：

```html
<button class="primary" type="submit">...</button>
```

如下，使用 type 属性定义 button 的风格（此处使用 class 实现，类似 bootstrap），使用 htmlType 属性定义 button 的 type 属性，容易引起混淆：

```html
<!-- avoid: -->
<!-- <c-button type="primary" htmlType="submit"></c-button> -->

<template>
  <button :class="type" :type="htmlType"><slot></slot></button>
</template>

<script>
export default {
  props: ['type', 'htmlType']
}
</script>
```

**建议**，沿用 button 的 type 属性，避免不必要的误解：

```html
<!-- recommended: -->
<!-- <c-button buttonStyle="primary" type="submit"></c-button> -->

<template>
  <button :class="buttonStyle" :type="type"><slot></slot></button>
</template>

<script>
export default {
  props: ['type', 'buttonStyle']
}
</script>
```

## 可复用组件应定义清晰的公开接口

  - 在编写组件时，记住是否要复用组件有好处。一次性组件跟其它组件紧密耦合没关系，但是可复用组件应当定义清晰的公开接口：
    - props：允许外部环境传递数据给组件；
    - events：允许组件触发外部环境的 action；
    - slots：允许外部环境插入内容到组件的视图结构内。

```html
<!-- recommended: -->
<template>
  <button :class="['c-button', className]"
    :type="type" @click="$emit('click')"><slot></slot></button>
</template>

<script>
export default {
  props: ['className', 'type']
}
</script>
```

## 模板的顶级元素始终是单个元素

  - 在使用 template 选项时，模板的内容将替换实例的挂载元素。因而推荐模板的顶级元素始终是单个元素。

```html
<!-- avoid: -->
<template>
  <div>root node 1</div>
  <div>root node 2</div>
</template>

<!-- recommended: -->
<template>
  <div>
    I have a single root node!
    <div>node 1</div>
    <div>node 2</div>
  </div>
</template>
```

## Props 是只读的

  - 与 React 的 props 一样，应该坚持 Vue 组件的 Props 是只读的，Props 的修改只能是自上而下的，即从父组件发起

假设有组件 my-comp.vue

```js
// my-comp.vue
// avoid:
export default {
  props: ['a', 'b'],
  methods: {
    someMethod () {
      this.a = 'new value for a'
    }
  }
}

// recommended:
export default {
  props: ['a', 'b'],
  methods: {
    someMethod () {
      // emit that a is changed
      this.$emit('change', {
        key: 'a',
        value: 'new value for a'
      })
    }
  }
}
```

所以正确的做法是在父组件中监听变化并响应

```html
<!-- recommended: -->
<template>
  <my-comp :a="value" @change="mutate"></my-comp>
</template>
<script>
import MyComp from 'my-comp.vue'
export default {
  data () {
    return {
      value: 'original value for a'
    }
  },
  methods: {
    mutate ({key, value}) {
      if (key === 'a') {
        // update the value for prop a
        this.value = value
      }
    }
  }
  components: {
    MyComp
  }
}
</script>
```

## 避免使用函数作为组件 Props

  - Props 应该用来传递简单的数据类型
  - 避免将函数作为 Props，比如设计对话框时，不应将点击回调通过 Props 来实现，而应该通过事件来实现

## 使用简写语法

  - 总是使用简写语法，使用 `:attr` 替代 `v-bind:attr`，使用 `@event` 替代 `v-on:event`

```html
<!-- recommended: -->
<my-component
  :foo="baz"
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat">
  <!-- content -->
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```

## 遵循组合优于继承的原则

  - 组件的复用，遵循组合优于继承的原则，使代码复用更具弹性、更易于扩展。

## 使用 normalizr 优化数据

  - 对于大型项目，应考虑使用 [normalizr](https://github.com/paularmstrong/normalizr) 优化数据，或简单地使用 `src/application/utils/normalizer`
