# Cascader

级联选择器 -- 当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

## Basic

<dc-cascader-basic />

```ts
<template>
  <div>
    <kl-form-item type="cascader" v-model="value" 
      :data="data"
      :width="300"
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string[] = ['zhinan', 'shejiyuanze',  'fankui']

  @Provide()
  data = [
    { 
      value: "zhinan",
      label: "指南",
      children: [ 
        { 
          value: "shejiyuanze",
          label: "设计原则",
          children: [ 
            { value: "yizhi", label: "一致" },
            { value: "fankui", label: "反馈" },
            { value: "xiaolv", label: "效率", disabled: true },
            { value: "kekong", label: "可控" } 
          ] 
        },
        { 
          value: "daohang",
          label: "导航",
          children: [ 
            { value: "cexiangdaohang", label: "侧向导航" },
            { value: "dingbudaohang", label: "顶部导航" } 
          ] 
        } 
      ] 
    },
    { 
      value: "ziyuan",
      label: "资源",
      children: [ 
        { value: "axure", label: "Axure Components" },
        { value: "sketch", label: "Sketch Templates" },
        { value: "jiaohu", label: "组件交互文档" } 
      ] 
    } 
  ]

  handleChange (value: string[]) {
    console.log(value)
  }
}
</script>
```

## 多选

<dc-cascader-mult />

```ts
<template>
  <div>
    <kl-form-item type="cascader" v-model="value" 
      :data="data"
      :width="300"
      :options="options"
      :props="props"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataItem } from '@/types'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string[][] = [
    ['zhinan', 'shejiyuanze',  'fankui'],
    ['zhinan', 'shejiyuanze',  'kekong'],
  ]

  @Provide()
  data = [
    { 
      value: "zhinan",
      label: "指南",
      children: [ 
        { 
          value: "shejiyuanze",
          label: "设计原则",
          children: [ 
            { value: "yizhi", label: "一致" },
            { value: "fankui", label: "反馈" },
            { value: "xiaolv", label: "效率", disabled: true },
            { value: "kekong", label: "可控" } 
          ] 
        },
        { 
          value: "daohang",
          label: "导航",
          children: [ 
            { value: "cexiangdaohang", label: "侧向导航" },
            { value: "dingbudaohang", label: "顶部导航" } 
          ] 
        } 
      ] 
    },
    { 
      value: "ziyuan",
      label: "资源",
      children: [ 
        { value: "axure", label: "Axure Components" },
        { value: "sketch", label: "Sketch Templates" },
        { value: "jiaohu", label: "组件交互文档" } 
      ] 
    } 
  ]

  @Provide()
  options = {
    clearable: true
  }

  @Provide()
  props: Partial<Record<keyof PropDataItem, string> & { [x: string]: any }> = {
    multiple: true
  }

  handleChange (value: string[][]) {
    console.log(value)
  }
}
</script>
```

## 面板

<dc-cascader-panel />

```ts
<template>
  <div>
    <kl-form-item type="cascader-panel" v-model="value" 
      :data="data"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string[] = ['zhinan', 'shejiyuanze',  'fankui']

  @Provide()
  data = [
    { 
      value: "zhinan",
      label: "指南",
      children: [ 
        { 
          value: "shejiyuanze",
          label: "设计原则",
          children: [ 
            { value: "yizhi", label: "一致" },
            { value: "fankui", label: "反馈" },
            { value: "xiaolv", label: "效率", disabled: true },
            { value: "kekong", label: "可控" } 
          ] 
        },
        { 
          value: "daohang",
          label: "导航",
          children: [ 
            { value: "cexiangdaohang", label: "侧向导航" },
            { value: "dingbudaohang", label: "顶部导航" } 
          ] 
        } 
      ] 
    },
    { 
      value: "ziyuan",
      label: "资源",
      children: [ 
        { value: "axure", label: "Axure Components" },
        { value: "sketch", label: "Sketch Templates" },
        { value: "jiaohu", label: "组件交互文档" } 
      ] 
    } 
  ]

  @Provide()
  options = {
    clearable: true
  }

  handleChange (value: string[]) {
    console.log(value)
  }
}
</script>
```

### Cascader Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `array` | -- | -- |
| placeholder | 输入框占位文本 | `string` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| data | 数据源 | `array[{ value, label, disabled, children }]` | -- | `[]` |
| props | 配置选项，具体见下表 | `object` | -- | -- |
| size | 尺寸大小 | `string` | `medium / small / mini` | -- |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | `auto` | `100%` |

### Cascader Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| clearable | 是否显示清除按钮 | `boolean` | -- | `false` |
| filterable | 是否可搜索 | `boolean` | -- | `false` |
| filterMethod | 自定义搜索方法 | `(node, keyword) => boolean` | -- | -- |
| showAllLevels | 输入框中是否显示选中值的完整路径 | `boolean` | -- | `true` |
| separator | 选项分隔符 | `string` | -- | `/` |

### CascaderPanel Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| value / v-model | 绑定值 | `array` | -- | -- |
| disabled | 禁用 | `boolean` | -- | `false` |
| data | 数据源 | `array[{ value, label, disabled, children }]` | -- | `[]` |
| props | 配置选项，具体见下表 | `object` | -- | -- |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 值变更时触发 | `(value: any, oldVal: any) => void` |

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| expandTrigger | 次级菜单的展开方式 | `string` | `click / hover` | `click` |
| multiple | 是否多选 | `boolean` | -- | `false` |
| checkStrictly | 是否严格的遵守父子节点不互相关联 | `boolean` | -- | `false` |
| emitPath | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 `false`，则只返回该节点的值 | `boolean` | -- | `true` |
| value | 指定选项的值为选项对象的某个属性值 | `string` | -- | `value` |
| label | 指定选项标签为选项对象的某个属性值 | `string` | -- | `label` |
| children | 指定选项的子选项为选项对象的某个属性值 | `string` | -- | `children` |
| disabled | 指定选项的禁用为选项对象的某个属性值 | `string` | -- | `disabled` |