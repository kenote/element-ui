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
  value: number = 1

  @Provide()
  options = {
    min: 1,
    max: 10
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>