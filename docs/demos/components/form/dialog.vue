<template>
  <div>
    <el-button type="text" @click="handleOpen(true)">点击登录</el-button>
    <kl-dialog-form title="登 录"
      :visible="visible"
      :columns="columns" 
      :rules="rules"
      :default-values="defaultValues"
      label-width="100"
      confirm-button-text="登 录"
      :loading="loading"
      @close="handleOpen(false)"
      @submit="handleSubmit"
      @command="handleCommand"
      />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { FormItem, Verify } from '@/types'

@Component
export default class Demo extends Vue {

  @Provide()
  visible: boolean = false

  @Provide()
  loading: boolean = false

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
      label: '账号',
      width: 300,
      placeholder: '请输入账号'
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

  @Provide()
  rules: Record<string, Verify.Rule[]> = {
    username: [
      { required: true, message: '账号不能为空' }
    ],
    password: [
      { required: true, message: '密码不能为空' }
    ],
  }

  handleOpen (value: boolean) {
    this.visible = value
  }

  handleSubmit (values: any) {
    this.loading = true
    setTimeout(() => {
      console.log(values)
      this.loading = false
      this.handleOpen(false)
    }, 800)
  }

  handleCommand (value: string) {
    console.log(value)
  }
}
</script>