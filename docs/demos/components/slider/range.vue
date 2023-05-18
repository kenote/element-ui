<template>
  <div>
    <kl-form-item type="slider" v-model="value" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: number[] = [2,7]

  @Provide()
  options = {
    range: true,
    min: 0,
    max: 10,
    step: 1,
    showStops: true
  }

  handleChange (value: number) {
    console.log(value)
  }
}
</script>