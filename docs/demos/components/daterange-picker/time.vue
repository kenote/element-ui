<template>
  <div>
    <kl-form-item type="datetimerange" v-model="value" 
      :placeholder="['开始日期时间', '结束日期时间']" 
      value-format="yyyy-MM-dd HH:mm:ss"
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { parseDate } from '@/packages'

@Component
export default class Demo extends Vue {

  @Provide()
  value: Array<Date | number | string> = [
    parseDate('-1 day'),
    parseDate('now')
  ]

  @Provide()
  options = {
    defaultTime: ['00:00:00', '23:59:59']
  }

  handleChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>