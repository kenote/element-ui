# Switch

开关 -- 表示两种相互对立的状态间的切换，多用于触发「开/关」

## Basic

<dc-switch-basic />

```ts
<template>
  <div>
    <kl-form-item type="switch" v-model="value" 
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: boolean = true

  handleChange (value: boolean) {
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

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| activeText | 打开时的文字描述 | `string` | -- | -- |
| inactiveText | 关闭时的文字描述 | `string` | -- | -- |
| activeColor | 打开时的背景色 | `string` | -- | `#409EFF` |
| inactiveColor | 关闭时的背景色 | `string` | -- | `#C0CCDA` |
| activeValue | 打开时的值 | `boolean / string / number` | -- | `true` |
| inactiveValue | 关闭时的值 | `boolean / string / number` | -- | `false` |
| activeIconClass | 打开时所显示图标的类名，设置此项会忽略 `activeText` | `string` | -- | -- |
| inactiveIconClass | 关闭时所显示图标的类名，设置此项会忽略 `inactiveText` | `string` | -- | -- |