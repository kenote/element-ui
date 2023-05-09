# TimePicker

时间选择器

## Basic

<dc-time-picker-basic />

```ts
<template>
  <div>
    <kl-form-item type="time" v-model="value" 
      placeholder="请选择时间" 
      value-format="HH:mm:ss"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: Date | number | string = new Date()

  handleChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>
```

## 使用箭头控制

<dc-time-picker-arrow />

```ts
<template>
  <div>
    <kl-form-item type="time" v-model="value" 
      placeholder="请选择时间" 
      value-format="HH:mm:ss"
      :options="options"
      :picker-options="pickerOptions"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: Date | number | string = new Date()

  @Provide()
  options = {
    arrowControl: true
  }

  @Provide()
  pickerOptions = {
    selectableRange: '18:30:00 - 20:30:00'
  }

  handleChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>
```

## 范围选择

<dc-time-picker-range />

```ts
<template>
  <div>
    <kl-form-item type="timerange" v-model="value" 
      :placeholder="['开始时间', '结束时间']"
      value-format="HH:mm:ss"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { parseDate } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: Array<Date | number | string> = [
    parseDate('days'),
    parseDate('daye')
  ]

  handleChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `string / number / Date ` \| `Array(string / number / Date)` | -- | -- |
| placeholder | 输入框占位文本 | `string / string[]` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | `auto` | `100%` |
| size | 尺寸大小 | `string` | `medium / small / mini` | -- |
| value-format | 绑定值的格式。不指定则绑定值为 Date 对象 | `string` | -- | -- |
| picker-options | 选择器专属选项 | `object` | -- | -- |
| readonly | 完全只读 | `boolean` | -- | `false` |

### PickerOptions

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| selectableRange | 可选时间段，例如`18:30:00 - 20:30:00`或者传入数组`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | `string / string[]` | -- | -- |
| format | 时间格式化 | `string` | -- | `HH:mm:ss` |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| align | 对齐方式 | `string` | `left, center, right` | `left` |
| clearable | 是否显示清除按钮 | `boolean` | -- | `true` |
| editable | 文本框可输入 | `boolean` | -- | `true` |
| arrowControl | 是否使用箭头进行时间选择 | `boolean` | -- | `false` |
