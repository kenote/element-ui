# Slider

滑块 -- 通过拖动滑块在一个固定区间内进行选择

## Basic

<dc-slider-basic />

```ts
<template>
  <div>
    <kl-form-item type="slider" v-model="value"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: number = 25

  handleChange (value: number) {
    console.log(value)
  }
}
</script>
```

## 范围选择

<dc-slider-range />

```ts
<template>
  <div>
    <kl-form-item type="slider" v-model="value" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: number[] = [2,7]

  @Provide()
  options = {
    range: true,
    min: 0,
    max: 10,
    step: 1,
    showStops: true
  }

  handleChange (value: number) {
    console.log(value)
  }
}
</script>
```

## 展示标记

<dc-slider-marks />

```ts
<template>
  <div>
    <kl-form-item type="slider" v-model="value" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: number[] = [30, 60]

  @Provide()
  options = {
    range: true,
    marks: {
      0: '0°C',
      8: '8°C',
      37: '37°C',
      50: {
        style: {
          color: '#1989FA'
        },
        label: this.$createElement('strong', '50%')
      }
    }
  }

  handleChange (value: number) {
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
| min | 最小值 | `number` | -- | `0` |
| max | 最大值 | `number` | -- | `100` |
| step | 步长 | `number` | -- | `1` |
| range | 是否为范围选择 | `boolean` | -- | `false` |
| marks | 标记， `key` 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | `object` | -- | -- |
| showStops | 是否显示间断点 | `boolean` | -- | `false` |
| showTooltip | 是否显示 `tooltip` | `boolean` | -- | `false` |
| vertical | 是否竖向模式 | `boolean` | -- | `false` |