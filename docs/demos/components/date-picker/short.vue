<template>
  <div>
    <kl-form-item type="date" v-model="value"
      placeholder="请选择日期" 
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
  value: Date | number | string = new Date()

  @Provide()
  pickerOptions = {
    shortcuts: [
      {
        text: '今天',
        onClick (picker) {
          picker.$emit('pick', parseDate('today'))
        }
      },
      {
        text: '昨天',
        onClick(picker) {
          picker.$emit('pick', parseDate('yesterday'))
        }
      },
      {
        text: '一周前',
        onClick(picker) {
          picker.$emit('pick', parseDate('-1 week'))
        }
      }
    ]
  }

  handleChange (value: Date | number | string) {
    console.log(value)
  }
}
</script>