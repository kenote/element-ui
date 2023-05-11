<template>
  <div>
    <kl-form-item type="checkbox-button" v-model="value" 
      :data="data"
      @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PropDataItem } from '@/types'

@Component
export default class Demo extends Vue {

  @Provide()
  value: string[] = ['1']

  @Provide()
  data: PropDataItem[] = [
    { key: '1', label: '选项一' },
    { key: '2', label: '选项二' },
    { key: '3', label: '选项三' },
  ]

  handleChange (value: string) {
    console.log(value)
  }
}
</script>