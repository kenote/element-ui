<template>
  <div>
    <kl-form-item type="daterange" v-model="value" 
      :placeholder="['开始日期', '结束日期']" 
      format="yyyy-MM-dd"
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
    parseDate('day')
  ]

  handleChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>