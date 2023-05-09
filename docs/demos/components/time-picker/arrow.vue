<template>
  <div>
    <kl-form-item type="time" v-model="value" 
      placeholder="请选择时间" 
      value-format="HH:mm:ss"
      :options="options"
      :picker-options="pickerOptions"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: Date | number | string = new Date()

  @Provide()
  options = {
    arrowControl: true
  }

  @Provide()
  pickerOptions = {
    selectableRange: '18:30:00 - 20:30:00'
  }

  handleChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>