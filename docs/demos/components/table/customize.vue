<template>
  <div class="kl-table-body">
    <kl-table
      :columns="columns"
      :data="data"
      :customize="customize"
      @command="handleCommand"
      :env="env" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import type { TableColumn, Selection } from '@/types'
import './style.less'
import dayjs from 'dayjs'
import { runCommand } from '@/packages'
import { set } from 'lodash'

@Component
export default class Demo extends Vue {

  @Provide()
  env = {
    groups: [
      { id: 1, name: '创建者', level: 9999 },
      { id: 2, name: '超级管理员', level: 9998 },
      { id: 3, name: '高级管理员', level: 7000 },
      { id: 4, name: '普通管理员', level: 5000 },
    ]
  }

  @Provide()
  columns: TableColumn[] = [
    {
      key: 'id',
      name: 'ID',
      width: 50,
      fixed: 'left'
    },
    {
      key: 'dots',
      width: 70,
      dots: [
        {
          key: 'new',
          style: 'color: #428bca',
          conditions: {
            'row.id': 1
          }
        },
        {
          key: 'card',
          name: 'iconfont icon-gaikuang',
          conditions: {
            'row.id': 1
          }
        },
      ]
    },
    {
      key: 'title',
      name: '标题',
      minWidth: 300,
      click: 'action:detail'
    },
    {
      key: 'status',
      name: '状态',
      width: 120,
      status: [
        {
          key: 'release',
          name: '已发布',
          style: 'danger',
          conditions: {
            'row.release': true
          }
        },
        {
          key: 'waiting',
          name: '待发布',
          style: 'successs',
          conditions: {
            'row.release': false
          }
        },
      ]
    },
    {
      key: 'group',
      name: '角色',
      width: 180,
      emits: [
        {
          key: 'switch-group',
          name: '用户组',
          type: 'select',
          formitem: {
            props: {
              value: 'id',
              label: 'name'
            }
          },
          dataBlock: {
            key: 'groups',
            query: {
              level: {
                $gte: 9999
              }
            }
          },
          disabled: {
            'row.level': {
              $gte: 9999
            }
          },
          command: 'action:switchGroup'
        }
      ]
    },
    {
      key: 'token',
      name: '密钥',
      clipboard: '点击复制',
      width: 350
    },
    {
      key: 'create_at',
      name: '创建时间',
      width: 180,
      format: {
        type: 'date',
        func: 'dateFormat',
        options: ['YYYY-MM-DD HH:mm:ss']
      },
      sortable: true
    },
    {
      key: 'actions',
      name: '操作',
      fixed: 'right',
      width: 300,
      emits: [
        {
          key: 'edit',
          name: '编辑',
          type: 'dropdown',
          disabled: {
            'row.release': true
          },
          command: 'action:edit',
          children: [
            {
              key: 'receiver',
              name: '接收用户',
              disabled: {
                'row.release': true
              },
              command: 'dialog:receiver'
            }
          ]
        },
        {
          key: 'release',
          name: '发布',
          type: 'button',
          style: 'success',
          disabled: true,
          command: 'action:release'
        },
        {
          key: 'remove',
          name: '删除',
          type: 'button',
          style: 'danger',
          command: 'action:remove'
        },
      ]
    }
  ]

  @Provide()
  data: any[] = [
    { 
      id: 1, 
      title: '关于CDN|DCDN免费证书及CSR证书功能下线公告', 
      release: false, 
      token: 'b0afd804-9b4c-4e56-9f6d-a8eadbe61fbb',
      create_at: '2023-06-19T06:54:27.298Z', 
      group: 1, 
      level: 9999
    },
    { 
      id: 2, 
      title: 'ECS配置内网域名互访，管理更轻松', 
      release: true, 
      token: '94fce0cf-b660-4475-86dc-29460a89696e',
      create_at: '2023-04-21T06:37:50.747Z', 
      group: 3, 
      level: 7000
    },
  ]

  @Provide()
  customize: Record<string, Function> = {
    dateFormat: (date: any, format: string = 'YYYY-MM-DD') => dayjs(date).format(format)
  }

  handleCommand (value: string, row: Record<string, any>, component: Vue | Record<string, any>) {
    return runCommand(this, {
      action: (type: string, params: Record<string, any>) => {
        console.log(type)
        if (type == 'switchGroup') {
          let node = this.data?.find( v => v.id == params.id )
          if (node) {
            set(node, 'group', component?.['group'])
            set(node, 'level', this.env.groups?.find( v => v.id == component?.['group'])?.level)
          }
        }
      },
      dialog: (type: string, params: Record<string, any>) => {
        console.log(type)
      }
    })(value, row, component)
  }

}
</script>