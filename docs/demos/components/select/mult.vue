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
    { value: '1', label: '黄金糕' },
    { value: '2', label: '双皮奶' },
    { value: '3', label: '蚵仔煎' },
    { value: '4', label: '龙须面' },
    { value: '5', label: '北京烤鸭' },
  ]

  @Provide()
  options = {
    clearable: true,
    filterable: true,
    multiple: true,
    multipleLimit: 3
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>