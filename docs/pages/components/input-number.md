# InputNumber

计数器

## Basic

<dc-input-number-basic />

```ts
<template>
  <div>
    <kl-form-item type="input-number" v-model="value" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: number = 1

  @Provide()
  options = {
    min: 1,
    max: 10
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

## 按钮位置

<dc-input-number-position />

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `number` | -- | -- |
| placeholder | 输入框占位文本 | `string` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | `auto` | `100%` |
| readonly | 是否只读 | `boolean` | -- | `false` |
| size | 尺寸大小 | `string` | `large / small` | -- |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: number, oldVal: number) => void` |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| min | 允许的最小值 | `number` | -- | `-Infinity` |
| max | 允许的最大值 | `number` | -- | `Infinity` |
| step | 计数器步长 | `number` | -- | `1` |
| precision | 数值精度 | `number` | -- | -- |
| stepStrictly | 是否只能输入 `step` 的倍数 | `boolean` | -- | `false` |
| controls | 是否使用控制按钮 | `boolean` | -- | `true` |
| controlsPosition | 控制按钮位置 | `string` | -- | -- |
| label | 输入框关联的label文字 | `string` | -- | -- |