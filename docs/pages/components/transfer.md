# Transfer

穿梭框

## Basic

<dc-transfer-basic />

```ts
<template>
  <div>
    <kl-form-item type="transfer" v-model="value" 
      :data="data"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string[] = ['1']

  @Provide()
  data = [
    { value: '1', label: '黄金糕' },
    { value: '2', label: '双皮奶' },
    { value: '3', label: '蚵仔煎' },
    { value: '4', label: '龙须面' },
    { value: '5', label: '北京烤鸭' },
  ]

  handleChange (value: string[]) {
    console.log(value)
  }
}
</script>
```

## 带搜索

<dc-transfer-search />

```ts
<template>
  <div>
    <kl-form-item type="transfer" v-model="value" 
      :data="data"
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string[] = ['1']

  @Provide()
  data = [
    { value: '1', label: '黄金糕' },
    { value: '2', label: '双皮奶' },
    { value: '3', label: '蚵仔煎' },
    { value: '4', label: '龙须面' },
    { value: '5', label: '北京烤鸭' },
  ]

  @Provide()
  options = {
    filterable: true,
    filterMethod (query, item) {
      return item.label.includes(query) || item.value.includes(query)
    },
    filterPlaceholder: '请输入搜索内容',
    titles: ['待选', '已选']
  }

  handleChange (value: string[]) {
    console.log(value)
  }
}
</script>
```

## 自定义模版

<dc-transfer-template />

```ts
<template>
  <div>
    <kl-form-item type="transfer" v-model="value" 
      :data="data"
      format="{value} - {label}"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string[] = ['1']

  @Provide()
  data = [
    { value: '1', label: '黄金糕' },
    { value: '2', label: '双皮奶' },
    { value: '3', label: '蚵仔煎' },
    { value: '4', label: '龙须面' },
    { value: '5', label: '北京烤鸭' },
  ]

  handleChange (value: boolean) {
    console.log(value)
  }
}
</script>
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `array(boolean / string / number)` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| data | 数据源 | `array[{ value, label, disabled }]` | -- | `[]` |
| props | 数据源的字段别名 | `object{value, label, disabled}` | -- | -- |
| format | 显示字符自定义格式 | `string` | -- | `{label}` |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| filterable | 是否可搜索 | `boolean` | -- | `false` |
| filterMethod | 自定义搜索方法 | `(query, item) => boolean` | -- | -- |
| filterPlaceholder | 搜索框占位符 | `string` | -- | `请输入搜索内容` |
| titles | 自定义列表标题 | `string[]` | -- | `['列表 1', '列表 2']` |
| buttonTexts | 自定义按钮文案 | `string[]` | -- | `[]` |
| targetOrder | 右侧列表元素的排序策略：若为 `original`，则保持与数据源相同的顺序；若为 `push`，则新加入的元素排在最后；若为 `unshift`，则新加入的元素排在最前 | `string` | `original / push / unshift` | `original` |
| leftDefaultChecked | 初始状态下左侧列表的已勾选项的 `key` 数组 | `array` | -- | `[]` |
| rightDefaultChecked | 初始状态下右侧列表的已勾选项的 `key` 数组 | `array` | -- | `[]` |