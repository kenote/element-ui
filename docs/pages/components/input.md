# Input

文本输入框

## Basic

<dc-input-basic />

```ts
<template>
  <div>
    <kl-form-item type="text" v-model="value" 
      placeholder="请输入内容"
      :width="300" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  options = {
    clearable: true,
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

## 密码框

<dc-input-password />

```ts
<template>
  <div>
    <kl-form-item type="password" v-model="value" 
      placeholder="请输入密码"
      :width="300" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  options = {
    clearable: true,
    showPassword: true
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

## 多行文本

<dc-input-textarea />

```ts
<template>
  <div>
    <kl-form-item type="textarea" v-model="value" 
      placeholder="请输入内容"
      :width="400" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  options = {
    clearable: true,
    maxlength: 500,
    showWordLimit: true,
    autosize: { minRows: 6, maxRows: 6 },
    resize: 'none'
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `string` | -- | -- |
| placeholder | 输入框占位文本 | `string` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | `auto` | `100%` |
| readonly | 是否只读 | `boolean` | -- | `false` |
| size | 尺寸大小 | `string` | `medium / small / mini` | -- |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| clearable | 是否显示清除按钮 | `boolean` | -- | `true` |
| minlength | 最小输入长度 | `number` | -- | -- |
| maxlength | 最大输入长度 | `number` | -- | -- |
| showPassword | 是否显示切换密码图标 | `boolean` | -- | `false` |
| prefixIcon | 输入框头部图标 | `string` | -- | -- |
| suffixIcon | 输入框尾部图标 | `string` | -- | -- |
| showWordLimit | 是否显示输入字数统计 | `boolean` | -- | `false` |
| rows | 输入框行数，只对 `type="textarea"` 有效 | `number` | -- | `2` |
| autosize | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，`{ minRows: 2, maxRows: 6 }` | `boolean / object` | -- | `false` |
| resize | 控制是否能被用户缩放 | `string` | none, both, horizontal, vertical | -- |
