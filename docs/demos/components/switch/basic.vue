<template>
  <div>
    <kl-form-item type="switch" v-model="value" 
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: boolean = true

  handleChange (value: boolean) {
    console.log(value)
  }
}
</script>