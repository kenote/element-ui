# Checkbox

多选框 -- 一组备选项中进行多选

## Basic

<dc-checkbox-basic />

```ts
<template>
  <div>
    <kl-form-item type="checkbox" v-model="value" 
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
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
    { value: '3', label: '选项三' },
  ]

  handleChange (value: string[]) {
    console.log(value)
  }
}
</script>
```

## 按钮样式

<dc-checkbox-button />

```ts
<template>
  <div>
    <kl-form-item type="checkbox-button" v-model="value" 
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
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
    { value: '3', label: '选项三' },
  ]

  handleChange (value: string[]) {
    console.log(value)
  }
}
</script>
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `boolean / string / number` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| size | 尺寸大小 | `string` | `medium / small / mini` | -- |
| data | 数据源 | `array[{ value, label, disabled }]` | -- | `[]` |
| props | 数据源的字段别名 | `object{value, label, disabled}` | -- | -- |
| format | 显示字符自定义格式 | `string` | -- | `{label}`

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |