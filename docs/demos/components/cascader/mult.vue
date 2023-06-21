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
import type { PropDataItem } from '@/types'

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