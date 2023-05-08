# DatarangePicker

日期范围选择器

## 可选类型

| 类型 | 说明 |
| ------ | ------ | 
| `daterange` | 日期范围 | 
| `datetimerange` | 日期时间范围 |
| `monthrange` | 月份范围 |

## Basic

<dc-daterange-picker-basic />

```ts
<template>
  <div>
    <kl-form-item type="daterange" v-model="value" 
      :placeholder="['开始日期', '结束日期']" 
      format="yyyy-MM-dd"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { parseDate } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: Array<Date | number | string> = [[
    parseDate('-1 day'),
    parseDate('day')
  ]]

  handleChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>
```

## 日期时间

<dc-daterange-picker-time />

```ts
<template>
  <div>
    <kl-form-item type="datetimerange" v-model="value" 
      :placeholder="['开始日期时间', '结束日期时间']" 
      value-format="yyyy-MM-dd HH:mm:ss"
      :options="options"
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
    parseDate('-1 day'),
    parseDate('now')
  ]

  @Provide()
  options = {
    defaultTime: ['00:00:00', '23:59:59']
  }

  handleChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>
```

## 月份

<dc-daterange-picker-month />

```ts
<template>
  <div>
    <kl-form-item type="monthrange" v-model="value" 
      :placeholder="['开始月份', '结束月份']" 
      value-format="yyyy-MM"
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
    parseDate('-1 month'),
    parseDate('month')
  ]

  handleChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>
```

## 带快捷选项

<dc-daterange-picker-short />

```ts
<template>
  <div>
    <kl-form-item type="daterange" v-model="value"
      :placeholder="['开始日期', '结束日期']"  
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
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
    parseDate('-1 day'),
    parseDate('day')
  ]

  @Provide()
  pickerOptions = {
    shortcuts: [
      {
        text: '最近一周',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-1 week'), parseDate('week')])
        }
      },
      {
        text: '最近一个月',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-1 month'), parseDate('month')])
        }
      },
      {
        text: '最近三个月',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-3 month'), parseDate('month')])
        }
      },
      {
        text: '最近半年',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-6 month'), parseDate('month')])
        }
      },
    ]
  }

  handleChange (value: Date | number | string) {
    console.log(value)
  }
}
</script>
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `Array(string / number / Date)` | -- | -- |
| placeholder | 输入框占位文本 | `string[]` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | `auto` | `100%` |
| size | 尺寸大小 | `string` | `medium / small / mini` | -- |
| format | 输入框中的格式 | `string` | -- | `yyyy-MM-dd` |
| value-format | 绑定值的格式。不指定则绑定值为 Date 对象 | `string` | -- | -- |
| picker-options | 选择器专属选项 | `object` | -- | -- |
| readonly | 完全只读 | `boolean` | -- | `false` |

### PickerOptions

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| shortcuts | 设置快捷选项 | `object[]` | -- | -- |
| firstDayOfWeek | 周起始日 | `number` | `1 - 7` | `7` |
| disabledDate | 设置禁用状态，参数为当前日期，要求返回 Boolean | `Function(Date)` | -- | -- |

### Shortcuts

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| text | 标题文本 | `string` | -- | -- |
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.$emit('pick', [new Date(), new Date()]) | `Function` | -- | -- |

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
| defaultTime | 选中日期后的默认具体时刻 | `string` | 形如`12:00:00`的字符串 | -- |