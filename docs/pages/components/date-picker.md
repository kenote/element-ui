# DataPicker

日期选择器

## 可选类型

| 类型 | 说明 | 多选类型 | 说明 |
| ------ | ------ | ------ | ------ |
| `date` | 日期 | `dates` | 多选日期 |
| `datetime` | 日期时间 | -- | -- |
| `year` | 年份 | `years` | 多选年份
| `month` | 月份 | `months` | 多选月份
| `week` | 星期 | -- | -- |

## Basic

<dc-date-picker-basic />

```ts
<template>
  <div>
    <kl-form-item type="date" v-model="value" 
      placeholder="请选择日期" 
      format="yyyy-MM-dd"
      value-format="timestamp"
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

## 日期时间

<dc-date-picker-time />

```ts
<template>
  <div>
    <kl-form-item type="datetime" v-model="value" 
      placeholder="请选择日期时间" 
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

## 其他单位

<dc-date-picker-unit />

```ts
<template>
  <div>
    <kl-form-item type="year" v-model="values.year" style="margin-bottom: 10px;"
      placeholder="请选择年份" 
      value-format="yyyy"
      @change="handleYearChange" />
    <kl-form-item type="month" v-model="values.month" style="margin-bottom: 10px;"
      placeholder="请选择月份" 
      value-format="yyyy-MM"
      @change="handleMonthChange" />
    <kl-form-item type="week" v-model="values.week" style="margin-bottom: 10px;"
      placeholder="请选择星期" 
      format="yyyy年 第 WW 周"
      value-format="yyyy-MM-dd"
      @change="handleWeekChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  values: Record<string, Date | number | string> = {
    year: new Date(),
    month: new Date(),
    week: new Date()
  }

  handleYearChange (value: Date | number | string) {
    console.log(value, typeof value)
  }

  handleMonthChange (value: Date | number | string) {
    console.log(value, typeof value)
  }

  handleWeekChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>
```

## 多选

<dc-date-picker-mult />

```ts
<template>
  <div>
    <kl-form-item type="dates" v-model="values.dates" style="margin-bottom: 10px;"
      placeholder="请选择日期" 
      value-format="yyyy-MM-dd"
      @change="handleDateChange" />
    <kl-form-item type="months" v-model="values.months" style="margin-bottom: 10px;"
      placeholder="请选择月份" 
      value-format="yyyy-MM"
      @change="handleMonthChange" />
    <kl-form-item type="years" v-model="values.years" style="margin-bottom: 10px;"
      placeholder="请选择年份" 
      value-format="yyyy"
      @change="handleYearChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  values: Record<string, Array<Date | number | string>> = {
    dates: [new Date()],
    years: [new Date()],
    months: [new Date()],
  }

  handleDateChange (value: Array<Date | number | string>) {
    console.log(value)
  }

  handleYearChange (value: Array<Date | number | string>) {
    console.log(value)
  }

  handleMonthChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>
```

## 带快捷选项

<dc-date-picker-short />

```ts
<template>
  <div>
    <kl-form-item type="date" v-model="value"
      placeholder="请选择日期" 
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
  value: Date | number | string = new Date()

  @Provide()
  pickerOptions = {
    shortcuts: [
      {
        text: '今天',
        onClick (picker) {
          picker.$emit('pick', parseDate('today'))
        }
      },
      {
        text: '昨天',
        onClick(picker) {
          picker.$emit('pick', parseDate('yesterday'))
        }
      },
      {
        text: '一周前',
        onClick(picker) {
          picker.$emit('pick', parseDate('-1 week'))
        }
      }
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
| value / v-model | 绑定值 | `string / number / Date` | -- | -- |
| placeholder | 输入框占位文本 | `string` | -- | -- |
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
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.$emit('pick', new Date()) | `Function` | -- | -- |

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