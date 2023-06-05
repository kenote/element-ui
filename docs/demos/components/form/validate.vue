<template>
  <div>
    <kl-form 
      :columns="columns" 
      :rules="rules"
      :default-values="defaultValues"
      :validate="validate"
      :options="options"
      :unique-method="handleUnique"
      @submit="handleSubmit"
      />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { FormItem, Verify, SubmitOptions } from '@/types'
import * as validate from './validate'

@Component
export default class Demo extends Vue {

  @Provide()
  defaultValues = {
    username: '',
    password: '',
    passed: '',
  }

  @Provide()
  columns: FormItem[] = [
    {
      key: 'username',
      type: 'text',
      label: '用户名',
      width: 300,
      placeholder: '请输入用户名',
      options: {
        
      },
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
    {
      key: 'passed',
      type: 'password',
      label: '确认密码',
      width: 300,
      placeholder: '请输入确认密码',
      options: {
        showPassword: true
      }
    },
  ]

  @Provide()
  rules: Record<string, Verify.Rule[]> = {
    username: [
      { required: true, message: '账号不能为空' },
      { validator: ['validUsername'], trigger: ['blur', 'change'] },
      { validator: ['validUnique', 'username', null], message: '该账号已占用', trigger: ['blur', 'change'] }
    ],
    password: [
      { required: true, message: '密码不能为空' },
      { pattern: /^(?=.*[A-Za-z])[A-Za-z0-9$@$!%*#?&]{8,20}$/, message: '密码支持 8 - 20 位的字母、数字和英文符号' },
    ],
    passed: [
      { required: true, message: '确认密码不能为空' },
      { validator: ['validCompare', 'password'], message: '两次输入的密码不一致', trigger: ['blur', 'change'] }
    ],
  }

  @Provide()
  validate: Record<string, Function> = validate

  @Provide()
  options: SubmitOptions = {
    reset: '重置'
  }

  async handleUnique (name: string) {
    return !['admin'].includes(name)
  }

  handleSubmit (values: any) {
    console.log(values)
  }
}
</script>