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
            key: 'parse-command',
            name: 'parseCommand',
            keywords: [ 'utilities', '工具', 'command', '指令', 'parse-command' ],
            route: '/utilities/parse-command',
            description: '解析字符串指令'
          },
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
          }
        ]
      }
    ]
  },
]