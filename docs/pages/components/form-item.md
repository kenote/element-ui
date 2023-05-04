# FormItem

表单单元模型

```ts
<template>
  <kl-form-item type="input" v-model="value" width="300" placeholder="请输入内容" :options="options" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = ''

  @Proviod()
  options = {
    // ...
  }

  handleChange (value: any, oldVal:any) {
    console.log(value, oldVal)
  }

}
</script>
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `any` | -- | -- |
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

## Input - 单行输入框

<dc-form-item type="input" />

```ts
<template>
  <kl-form-item type="input" v-model="value" width="300" placeholder="请输入内容" :options="options" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = ''

  @Proviod()
  options = {
    clearable: true
  }

}
</script>
```

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| clearable | 是否可清空 | `boolean` | -- | `false` |
| minlength | 最小输入长度 | `number` | -- | -- |
| miaxlength | 最大输入长度 | `number` | -- | -- |
| showWordLimit | 是否显示输入字数统计 | `boolean` | -- | `false` |
| prefixIcon | 输入框头部图标 | `string` | -- | -- |
| suffixIcon | 输入框尾部图标 | `string` | -- | -- |

## Password - 密码输入框

<dc-form-item type="password" />

```ts
<template>
  <kl-form-item type="password" v-model="value" width="300" placeholder="请输入密码" :options="options" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = ''

  @Proviod()
  options = {
    clearable: true,
    showPassword: true,
  }

}
</script>
```

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| clearable | 是否可清空 | `boolean` | -- | `false` |
| minlength | 最小输入长度 | `number` | -- | -- |
| miaxlength | 最大输入长度 | `number` | -- | -- |
| showPassword | 是否显示切换密码图标 | `boolean` | -- | `false` |

## InputNumber - 数字输入框

<dc-form-item type="input-number" />

```ts
<template>
  <kl-form-item type="input-number" v-model="value" width="300" :options="options" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import type { FormItemType } from '@/types'

@Component
export default class Demo extends Vue {

  @Provide()
  value = 5

  @Proviod()
  options = {
    min: 1,
    max: 10
  }

}
</script>
```

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| min | 允许的最小值 | `number` | -- | -- |
| max | 允许的最大值 | `number` | -- | -- |
| step | 设置步长 | `number` | -- | -- |
| stepStrictly | 只能输入 step 的倍数 | `boolean` | -- | `false` |
| precision | 数值精度 | `number` | -- | -- |
| controls | 是否使用控制按钮 | `boolean` | -- | `true` |
| controlsPosition | 控制按钮位置 | `string` | `right` | -- |

## Textarea - 多行文本框

<dc-form-item type="textarea" />

```ts
<template>
  <kl-form-item type="textarea" v-model="value" width="300" placeholder="请输入文本内容" :options="options" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = ''

  @Proviod()
  options = {
    maxlength: 500,
    showWordLimit: true,
    rows: 5,
    resize: 'none'
  }

}
</script>
```

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| minlength | 最小输入长度 | `number` | -- | -- |
| miaxlength | 最大输入长度 | `number` | -- | -- |
| showWordLimit | 是否显示输入字数统计 | `boolean` | -- | `false` |
| rows | 输入框行数 | `number` | -- | -- |
| autosize | 自适应内容高度，可传入对象，如，{ minRows: 2, maxRows: 6 } | `boolean / object` | -- | `false` |
| resize | 控制是否能被用户缩放 | `string` | `none, both, horizontal, vertical` | -- |


## Radio - 单选框

<dc-form-item type="radio" />

```ts
<template>
  <kl-form-item type="radio" v-model="value" :data="data" :props="props" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = '1'

  @Proviod()
  data = [
    { key: '1', name: '选项一' },
    { key: '2', name: '选项二' },
    { key: '3', name: '选项三' },
  ]

  @Proviod()
  props = {
    label: 'name'
  }

}
</script>
```

## RadioButton - 单选框按钮
<dc-form-item type="radio-button" />

```ts
<template>
  <kl-form-item type="radio-button" v-model="value" :data="data" :props="props" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = '1'

  @Proviod()
  data = [
    { key: '1', name: '选项一' },
    { key: '2', name: '选项二' },
    { key: '3', name: '选项三' },
  ]

  @Proviod()
  props = {
    label: 'name'
  }

}
</script>
```

## Checkbox - 多选框

<dc-form-item type="checkbox" />

```ts
<template>
  <kl-form-item type="checkbox" v-model="value" :data="data" :props="props" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = ['1', '3']

  @Proviod()
  data = [
    { key: '1', name: '选项一' },
    { key: '2', name: '选项二' },
    { key: '3', name: '选项三' },
  ]

  @Proviod()
  props = {
    label: 'name'
  }

}
</script>
```

## CheckboxButton - 多选框按钮

<dc-form-item type="checkbox-button" />

```ts
<template>
  <kl-form-item type="checkbox-button" v-model="value" :data="data" :props="props" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = ['1', '3']

  @Proviod()
  data = [
    { key: '1', name: '选项一' },
    { key: '2', name: '选项二' },
    { key: '3', name: '选项三' },
  ]

  @Proviod()
  props = {
    label: 'name'
  }

}
</script>
```

## Select - 下拉框

<dc-form-item type="select" />

```ts
<template>
  <kl-form-item type="select" placeholder="请选择项目" v-model="value" :data="data" :props="props" :options="options" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value = ''

  @Proviod()
  data = [
    { key: '1', name: '选项一' },
    { key: '2', name: '选项二' },
    { key: '3', name: '选项三' },
  ]

  @Proviod()
  props = {
    label: 'name'
  }

  @Proviod()
  options: {
    clearable: true,
    filterable: true
  }

}
</script>
```

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| clearable | 是否可清空 | `boolean` | -- | `false` |
| filterable | 是否可搜索 | `boolean` | -- | `false` |
| multiple | 是否多选 | `boolean` | -- | `false` |
| multipleLimit | 多选时用户最多可以选择的项目数，为 0 则不限制 | `number` | -- | `0` |
| allowCreate | 是否允许用户创建新条目，需配合 `filterable` 使用 | `boolean` | -- | `false` |
| popperClass | Select 下拉框的类名 | `string` | -- | -- |

