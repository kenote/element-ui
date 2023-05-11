# Select

下拉选择器

## Basic

<dc-select-basic />

```ts
<template>
  <div>
    <kl-form-item type="select" v-model="value" 
      placeholder="请选择项目" 
      :data="data"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataItem } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  data: PropDataItem[] = [
    { key: '1', label: '黄金糕' },
    { key: '2', label: '双皮奶' },
    { key: '3', label: '蚵仔煎' },
    { key: '4', label: '龙须面' },
    { key: '5', label: '北京烤鸭' },
  ]

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

## 自定义模版

<dc-select-template />

```ts
<template>
  <div>
    <kl-form-item type="select" v-model="value" 
      placeholder="请选择项目" 
      :data="data"
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataItem } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  data: PropDataItem[] = [
    { key: '1', label: '黄金糕' },
    { key: '2', label: '双皮奶' },
    { key: '3', label: '蚵仔煎' },
    { key: '4', label: '龙须面' },
    { key: '5', label: '北京烤鸭' },
  ]

  @Provide()
  options = {
    clearable: true,
    filterable: true,
    template: (`
      <span style="float: left">{key}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{label}</span>
    `)
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

## 分组

<dc-select-group />

```ts
<template>
  <div>
    <kl-form-item type="select" v-model="value" 
      placeholder="请选择项目" 
      :data="data"
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataGroup } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  data: PropDataGroup[] = [
    {
      label: '热门城市',
      options: [
        { key: 'Shanghai', label: '上海' },
        { key: 'Beijing', label: '北京' },
      ]
    },
    {
      label: '城市名',
      options: [
        { key: 'Chengdu', label: '成都' },
        { key: 'Shenzhen', label: '深圳' },
        { key: 'Guangzhou', label: '广州' },
        { key: 'Dalian', label: '大连' },
      ]
    },
  ]

  @Provide()
  options = {
    clearable: true,
    filterable: true
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

## 分组

<dc-select-mult />

```ts
<template>
  <div>
    <kl-form-item type="select" v-model="value" 
      placeholder="请选择项目" 
      :data="data"
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataItem } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  data: PropDataItem[] = [
    { key: '1', label: '黄金糕' },
    { key: '2', label: '双皮奶' },
    { key: '3', label: '蚵仔煎' },
    { key: '4', label: '龙须面' },
    { key: '5', label: '北京烤鸭' },
  ]

  @Provide()
  options = {
    clearable: true,
    filterable: true,
    multiple: true,
    multipleLimit: 3
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
| value / v-model | 绑定值 | `boolean / string / number` | -- | -- |
| placeholder | 输入框占位文本 | `string` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | `auto` | `100%` |
| readonly | 是否只读 | `boolean` | -- | `false` |
| size | 尺寸大小 | `string` | `medium / small / mini` | -- |
| data | 数据源 | `array[{ key, label, disabled }]` | -- | `[]` |
| props | 数据源的字段别名 | `object{key, label, disabled}` | -- | -- |
| format | 显示字符自定义格式 | `string` | -- | `{label}`

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| clearable | 是否显示清除按钮 | `boolean` | -- | `true` |
| editable | 文本框可输入 | `boolean` | -- | `true` |
| multiple | 是否多选 | `boolean` | -- | `false` |
| multipleLimit | 多选时用户最多可以选择的项目数，为 `0` 则不限制 | `number` | -- | `0` |
| template | 自定义模版 | `string` | -- | -- |
