<template>
  <div>
    <kl-form-item type="text" v-model="value" 
      placeholder="请输入内容"
      :width="300" 
      :options="options"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string = ''

  @Provide()
  options = {
    clearable: true,
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>