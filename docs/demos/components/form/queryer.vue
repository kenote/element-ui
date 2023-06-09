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
      @update-plan="handleUpdatePlan"
      />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { FormItemColumn, SubmitOptions, PlanDataItem } from '@/types'
import * as uuid from 'uuid'
import { merge, set, remove } from 'lodash'

@Component
export default class Demo extends Vue {

  @Provide()
  loading: boolean = false

  @Provide()
  defaultValues = {
    findtype: 'username'
  }

  @Provide()
  columns: FormItemColumn[] = [
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
    ],
    draft: {
      data: [],
      associate: 'query_001'
    }
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

  handleUpdatePlan (type: string, options: PlanDataItem, next: <T>(node: T) => void) {
    if (type == 'create') {
      let node: PlanDataItem = merge(options, { value: uuid.v4() })
      this.options.draft?.data?.push(node)
      next<PlanDataItem>(node)
    }
    else if (type == 'update') {
      let node = this.options.draft?.data?.find( v => v.value == options?.value )
      if (node) {
        set(node, 'content', options?.content)
        console.log(node)
        next<PlanDataItem>(node)
      }
    }
    else if (type == 'remove') {
      remove(this.options.draft?.data??[], v => v.value == options?.value )
      next<boolean>(true)
    }
  }
}
</script>