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
  value: number[] = [30, 60]

  @Provide()
  options = {
    range: true,
    marks: {
      0: '0°C',
      8: '8°C',
      37: '37°C',
      50: {
        style: {
          color: '#1989FA'
        },
        label: this.$createElement('strong', '50%')
      }
    }
  }

  handleChange (value: number) {
    console.log(value)
  }
}
</script>