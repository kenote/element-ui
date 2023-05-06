<template>
  <div>
    <kl-form-item type="dates" v-model="values.dates" style="margin-bottom: 10px;"
      placeholder="请选择日期" 
      value-format="yyyy-MM-dd"
      @change="handleDateChange" />
    <kl-form-item type="months" v-model="values.months" style="margin-bottom: 10px;"
      placeholder="请选择月份" 
      value-format="yyyy-MM"
      @change="handleMonthChange" />
    <kl-form-item type="years" v-model="values.years" style="margin-bottom: 10px;"
      placeholder="请选择年份" 
      value-format="yyyy"
      @change="handleYearChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  values: Record<string, Array<Date | number | string>> = {
    dates: [new Date()],
    years: [new Date()],
    months: [new Date()],
  }

  handleDateChange (value: Array<Date | number | string>) {
    console.log(value)
  }

  handleYearChange (value: Array<Date | number | string>) {
    console.log(value)
  }

  handleMonthChange (value: Array<Date | number | string>) {
    console.log(value)
  }
}
</script>