<template>
  <div>
    <kl-form-item type="year" v-model="values.year" style="margin-bottom: 10px;"
      placeholder="请选择年份" 
      value-format="yyyy"
      @change="handleYearChange" />
    <kl-form-item type="month" v-model="values.month" style="margin-bottom: 10px;"
      placeholder="请选择月份" 
      value-format="yyyy-MM"
      @change="handleMonthChange" />
    <kl-form-item type="week" v-model="values.week" style="margin-bottom: 10px;"
      placeholder="请选择星期" 
      format="yyyy年 第 WW 周"
      value-format="yyyy-MM-dd"
      @change="handleWeekChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  values: Record<string, Date | number | string> = {
    year: new Date(),
    month: new Date(),
    week: new Date()
  }

  handleYearChange (value: Date | number | string) {
    console.log(value, typeof value)
  }

  handleMonthChange (value: Date | number | string) {
    console.log(value, typeof value)
  }

  handleWeekChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>