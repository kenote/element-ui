<template>
  <div>
    <kl-form-item type="date" v-model="value" 
      placeholder="请选择日期" 
      format="yyyy-MM-dd"
      value-format="timestamp"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: Date | number | string = new Date()

  handleChange (value: Date | number | string) {
    console.log(value, typeof value)
  }
}
</script>