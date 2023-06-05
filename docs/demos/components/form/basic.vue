<template>
  <div>
    <kl-form 
      :columns="columns" 
      :default-values="defaultValues"
      @submit="handleSubmit"
      />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { FormItem } from '@/types'

@Component
export default class Demo extends Vue {

  @Provide()
  defaultValues = {
    username: '',
    password: ''
  }

  @Provide()
  columns: FormItem[] = [
    {
      key: 'username',
      type: 'text',
      label: '用户名',
      width: 300,
      placeholder: '请输入用户名'
    },
    {
      key: 'password',
      type: 'password',
      label: '密码',
      width: 300,
      placeholder: '请输入密码',
      options: {
        showPassword: true
      }
    },
  ]

  handleSubmit (value: any) {
    console.log(value)
  }
}
</script>