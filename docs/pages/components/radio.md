# Radio

单选框 -- 在一组备选项中进行单选

<dc-radio-basic />

```ts
<template>
  <div>
    <kl-form-item type="radio" v-model="value" 
      :data="data"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataItem } from '@/kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = '1'

  @Provide()
  data: PropDataItem[] = [
    { key: '1', label: '选项一' },
    { key: '2', label: '选项二' },
    { key: '3', label: '选项三' },
  ]

  handleChange (value: string) {
    console.log(value)
  }
}
</script>
```

## 按钮样式

<dc-radio-button />

```ts
<template>
  <div>
    <kl-form-item type="radio-button" v-model="value" 
      :data="data"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataItem } from '@/kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = '1'

  @Provide()
  data: PropDataItem[] = [
    { key: '1', label: '选项一' },
    { key: '2', label: '选项二' },
    { key: '3', label: '选项三' },
  ]

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
| disabled | 禁用 | `boolean` | -- | `false` |
| size | 尺寸大小 | `string` | `medium / small / mini` | -- |
| data | 数据源 | `array[{ key, label, disabled }]` | -- | `[]` |
| props | 数据源的字段别名 | `object{key, label, disabled}` | -- | -- |
| format | 显示字符自定义格式 | `string` | -- | `{label}`

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |