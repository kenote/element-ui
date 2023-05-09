<template>
  <div>
    <kl-form-item type="time" v-model="value" 
      placeholder="请选择时间" 
      value-format="HH:mm:ss"
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