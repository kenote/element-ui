import { ChannelDataNode } from '@kenote/common'
import { PlusKeywordsNode } from '@/types'


export const channels: ChannelDataNode<PlusKeywordsNode>[] = [
  {
    key: 'guide',
    name: '指南',
    label: 'guide',
    route: '/guide',
    index: '/guide/installation',
    children: [
      {
        key: 'guide',
        name: '开发指南',
        children: [
          {
            key: 'installation',
            name: '安装',
            keywords: ['guide', 'install', '安装', '起步', '使用'],
            route: '/guide/installation',
            description: '安装使用 @kenote/element-ui'
          },
          {
            key: 'nuxt',
            name: '在 Nuxt 中使用',
            keywords: ['guide', 'nuxt', '起步'],
            route: '/guide/nuxt',
            description: '在 Nuxt 中使用 @kenote/element-ui 组件'
          },
          {
            key: 'vite',
            name: '在 Vite 中使用',
            keywords: ['guide', 'vite', '起步'],
            route: '/guide/vite',
            description: '在 Vite 中使用 @kenote/element-ui 组件'
          }
        ]
      }
    ]
  },
  {
    key: 'utilities',
    name: '工具集',
    label: 'utilities',
    route: '/utilities',
    children: [
      {
        key: 'command',
        name: '指令',
        children: [
          {
            key: 'run-command',
            name: 'runCommand',
            keywords: [ 'utilities', '工具', 'command', '指令', 'run-command' ],
            route: '/utilities/run-command',
            description: '运行指令集'
          }
        ]
      },
      {
        key: 'filter',
        name: '检索',
        children: [
          {
            key: 'filter-channel-datanode',
            name: 'filterChannelDataNode',
            keywords: [ 'utilities', '工具', 'filter', '检索', 'channel', 'datanode' ],
            route: '/utilities/filter-channel-datanode',
            description: '检索频道数据节点，结果返回到列表'
          },
          {
            key: 'is-disabled',
            name: 'isDisabled',
            keywords: [ 'utilities', '工具', '判断', '禁用' ],
            route: '/utilities/is-disabled',
            description: '判断是否禁用模式'
          },
          {
            key: 'is-filter',
            name: 'isFilter',
            keywords: [ 'utilities', '工具', '判断', '过滤' ],
            route: '/utilities/is-filter',
            description: '判断是否过滤'
          },
          {
            key: 'get-conditions',
            name: 'getConditions',
            keywords: [ 'utilities', '工具', '获取', '过滤', '条件' ],
            route: '/utilities/get-conditions',
            description: '获取过滤条件'
          },
          {
            key: 'get-filter',
            name: 'getFilter',
            keywords: [ 'utilities', '工具', '获取', '过滤' ],
            route: '/utilities/get-filter',
            description: '获取过滤器'
          },
        ]
      },
      {
        key: 'parse',
        name: '解析',
        children: [
          {
            key: 'parse-date',
            name: 'parseDate',
            route: '/utilities/parse-date',
            description: '解析日期时间字面量'
          },
          {
            key: 'parse-template',
            name: 'parseTemplate',
            keywords: [ 'utilities', '工具', '模版', '解析' ],
            route: '/utilities/parse-template',
            description: '解析字符串模版'
          },
          {
            key: 'parse-command',
            name: 'parseCommand',
            keywords: [ 'utilities', '工具', 'command', '指令', '解析' ],
            route: '/utilities/parse-command',
            description: '解析字符串指令'
          },
          {
            key: 'parse-props',
            name: 'parseProps',
            keywords: [ 'utilities', '工具', '映射', '对象', '解析' ],
            route: '/utilities/parse-props',
            description: '映射 object 对象的键值'
          },
          {
            key: 'template',
            name: '模版语法',
            route: '/utilities/template',
            description: ''
          }
        ]
      }
    ]
  },
  {
    key: 'components',
    name: '组件',
    label: 'components',
    route: '/components',
    children: [
      // {
      //   key: 'guide',
      //   name: '开发指南',
      //   children: [
      //     {
      //       key: 'install',
      //       name: '安装',
      //       route: '/components/',
      //     }
      //   ]
      // },
      {
        key: 'basic',
        name: '基础',
        children: [
          {
            key: 'channel-searchbar',
            name: 'ChannelSearchbar',
            keywords: [ 'components', '组件', 'searchbar', '频道搜索框' ],
            route: '/components/channel-searchbar',
            description: '频道搜索器，用于搜索频道下子页面'
          },
          {
            key: 'drawer',
            name: 'Drawer',
            route: '/components/drawer',
            description: '推拉抽屉'
          },
        ]
      },
      {
        key: 'form',
        name: '表单',
        children: [
          {
            key: 'login-form',
            name: 'LoginForm',
            keywords: [ 'components', '组件', 'form', '表单', 'login', '登录' ],
            route: '/components/login-form',
            description: '登录表单'
          },
          {
            key: 'qrcode',
            name: 'Qrcode',
            keywords: [ 'components', '组件', 'form', '表单', 'qrcode', '二维码' ],
            route: '/components/qrcode',
            description: '二维码'
          },
        ]
      }
    ]
  },
]