<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开 Dialog</el-button>
    <kl-dialog title="登录" 
      :width="500" 
      height="fit-content"
      :visible="visible" 
      show-footer="confirm"
      :loading="loading"
      @submit="$refs['dialogForm']?.['handleSubmit']()"
      @close="visible = false">
      <kl-form ref="dialogForm"
        :columns="columns" 
        :rules="rules"
        :default-values="defaultValues"
        label-width="100"
        :options="{ hide: true }"
        :loading="loading"
        @submit="handleSubmit"
        />
    </kl-dialog>
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
      placeholder: '请输入账号',
      options: {
        clearable: true
      }
    },
    {
      key: 'password',
      type: 'password',
      label: '密码',
      width: 300,
      placeholder: '请输入密码',
      options: {
        clearable: true,
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
  
  handleSubmit (values: any) {
    this.loading = true
    setTimeout(() => {
      console.log(values)
      this.loading = false
      this.visible = false
    }, 500)
  }
}
</script>