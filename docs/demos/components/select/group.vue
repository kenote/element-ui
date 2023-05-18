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

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  data = [
    {
      label: '热门城市',
      children: [
        { value: 'Shanghai', label: '上海' },
        { value: 'Beijing', label: '北京' },
      ]
    },
    {
      label: '城市名',
      children: [
        { value: 'Chengdu', label: '成都' },
        { value: 'Shenzhen', label: '深圳' },
        { value: 'Guangzhou', label: '广州' },
        { value: 'Dalian', label: '大连' },
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