<template>
  <div>
    <kl-form-item type="daterange" v-model="value"
      :placeholder="['开始日期', '结束日期']"  
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
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

  @Provide()
  pickerOptions = {
    shortcuts: [
      {
        text: '最近一周',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-1 week'), parseDate('week')])
        }
      },
      {
        text: '最近一个月',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-1 month'), parseDate('month')])
        }
      },
      {
        text: '最近三个月',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-3 month'), parseDate('month')])
        }
      },
      {
        text: '最近半年',
        onClick (picker) {
          picker.$emit('pick', [parseDate('-6 month'), parseDate('month')])
        }
      },
    ]
  }

  handleChange (value: Date | number | string) {
    console.log(value)
  }
}
</script>