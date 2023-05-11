<template>
  <div>
    <kl-form-item type="textarea" v-model="value" 
      placeholder="请输入内容"
      :width="400" 
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
    maxlength: 500,
    showWordLimit: true,
    autosize: { minRows: 6, maxRows: 6 },
    resize: 'none'
  }

  handleChange (value: string) {
    console.log(value)
  }
}
</script>