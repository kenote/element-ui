<template>
  <div>
    <kl-form-item type="monthrange" v-model="value" 
      :placeholder="['开始月份', '结束月份']" 
      value-format="yyyy-MM"
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
    parseDate('-1 month'),
    parseDate('month')
  ]

  handleChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>