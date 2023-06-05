# Form

表单

## Basic

<dc-form-basic />

```ts
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
import { FormItem } from '@kenote/element-ui'

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
```

## 验证

<dc-form-validate />

```ts
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
import { FormItem, Verify, SubmitOptions } from '@kenote/element-ui'
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
```

- #### validate.ts

```ts

/**
 * 验证比较两次输入的值
 * @param field 
 * @param self 
 * @returns 
 */
export function validCompare (field: string, self?: Record<string, any>) {
  return (rule: any, value: any, callback: (message?: string) => any) => {
    let password = field
    if (self) {
      password = self?.values?.[field]
    }
    let valid = password === value
    if (!valid) {
      return callback(rule?.message??'两次输入的值不一致')
    }
    return callback()
  }
}

/**
 * 验证用户名格式
 * @returns 
 */
export function validUsername () {
  return async (rule: any, value: any, callback: (message?: string) => any) => {
    if (!value) return callback()
    let valid = /^[a-zA-Z]{1}[a-zA-Z0-9\_\-]/.test(value)
    if (!valid) {
      return callback('英文字符开头，5 - 20 个字符；支持小写英文、数字、下划线和中划线组合')
    }
    if (value.length > 20 || value.length < 5) {
      return callback('账号名限定 5 - 20 位字符')
    }
    return callback()
  }
}

/**
 * 验证独特性字段
 * @param field -- 字段名
 * @param exclude -- 需要排除的对象字段；如 `auth._id`
 * @param self -- 关联 Vue 组件对象
 * @returns 
 */
export function validUnique (field: string, exclude: string | null, self?: Record<string, any>) {
  return async (rule: any, value: any, callback: (message?: string) => any) => {
    if (!value) return callback()
    let uniqueFunc = self?.['uniqueMethod']
    if (uniqueFunc) {
      let valid = await uniqueFunc(value, exclude, field)
      if (!valid) {
        return callback(rule?.message)
      }
    }
    return callback()
  }
}
```

## 查询器

<dc-form-queryer />

```ts
<template>
  <div>
    <kl-form
      :columns="columns" 
      :default-values="defaultValues"
      :options="options"
      @submit="handleSubmit"
      @command="handleCommand"
      :inline="true"
      label-width="120"
      submit-name="搜 索"
      :border="true"
      :loading="loading"
      />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { FormItem, SubmitOptions } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  loading: boolean = false

  @Provide()
  defaultValues = {
    findtype: 'username'
  }

  @Provide()
  columns: FormItem[] = [
    {
      key: 'start__end',
      type: 'daterange',
      label: '注册时间',
      placeholder: ['开始时间','结束时间'],
      options: {
        clearable: true
      },
    },
    {
      key: 'findname',
      type: 'text',
      label: '查询名称',
      width: 300,
      placeholder: '请输入查询名称',
      options: {
        clearable: true
      },
      labelWidth: 130,
      labelOptions: {
        key: 'findtype',
        options: {
          username: '用户名',
          nickname: '昵称',
          email: '电子邮箱',
          mobile: '手机号'
        }
      }
    },
  ]

  @Provide()
  options: SubmitOptions = {
    reset: '重置',
    emits: [
      {
        key: 'create',
        name: '创建用户',
        type: 'button',
        style: 'success',
        command: 'dialog:create'
      },
      {
        key: 'emits',
        name: '更多操作',
        type: 'dropdown',
        children: [
          { key: 'all', name: '删除全部', command: 'action:removeall' },
          { key: 'select', name: '删除选中', command: 'action:removeselect', disabled: true },
        ]
      }
    ]
  }

  handleSubmit (values: any) {
    this.loading = true
    setTimeout(() => {
      console.log(values)
      this.loading = false
    }, 800)
  }

  handleCommand (value: string) {
    console.log(value)
  }
}
</script>
```

## 弹窗表单

<dc-form-dialog />

```ts
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
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| columns | 表单单元集合 | `object[]` | -- | `[]` |
| rules | 表单验证规则 | `object` | -- | `{}` |
| validate | 验证函数集 | `object` | -- | -- |
| default-values | 表单默认值 | `object` | -- | -- |
| loading | 表单提交中状态 | `boolean` | -- | `fasle` |
| submit-name | 提交按钮名称 | `string` | -- | `提 交` |
| options | 功能扩展选项 | `object` | -- | -- |
| unique-method | 查询唯一性字段回调函数 | `Function` | -- | -- |
| value-format | 对表单单元数据格式化 | `object` | -- | -- |
| action | 提交选项 | `object` | -- | -- |
| exclude | 需要排除的字段 | `string[]` | -- | -- |
| merge-field | 需要合并的字段 | `object` | -- | -- |
| label-width | 表单域标签的宽度 | `number` | `string` | -- | `120` |
| label-position | 表单域标签的位置，则需要设置 `label-width` | `string` | `right/left/top` | `right` |
| label-suffix | 表单域标签的后缀 | `string` | -- | -- |
| hide-required-asterisk | 是否隐藏必填字段的标签旁边的红色星号 | `boolean` | -- | `fasle` |
| inline-message | 是否以行内形式展示校验信息 | `boolean` | -- | `fasle` |
| status-icon | 是否在输入框中显示校验结果反馈图标 | `boolean` | -- | `fasle` |
| inline | 行内表单模式 | `boolean` | -- | `fasle` |
| border | 是否显示表单边框线 | `boolean` | -- | `fasle` |
| disabled | 是否禁用该表单 | `boolean` | -- | `fasle` |

### Event

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| submit | 提交表单时触发 | `(value: any) => void` |
| command | 派发指令时触发 | `(value: string) => void` |
