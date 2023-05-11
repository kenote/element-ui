<template>
  <div>
    <kl-form-item type="input-number" v-model="value"
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: number = 0.1

  @Provide()
  options = {
    min: 0,
    max: 10,
    step: 0.1,
    precision: 2,
    controlsPosition: 'right'
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>