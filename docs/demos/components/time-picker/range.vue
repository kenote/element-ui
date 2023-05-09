<template>
  <div>
    <kl-form-item type="timerange" v-model="value" 
      :placeholder="['开始时间', '结束时间']"
      value-format="HH:mm:ss"
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
    parseDate('days'),
    parseDate('daye')
  ]

  handleChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>