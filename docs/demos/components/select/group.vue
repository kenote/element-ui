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
import { PropDataGroup } from '@/types'

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