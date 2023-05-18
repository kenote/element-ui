<template>
  <div>
    <kl-form-item type="slider" v-model="value"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: number = 25

  handleChange (value: number) {
    console.log(value)
  }
}
</script>