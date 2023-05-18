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
            description: '判断是否禁用模式',
            tag: 'new_info'
          },
          {
            key: 'is-filter',
            name: 'isFilter',
            keywords: [ 'utilities', '工具', '判断', '过滤' ],
            route: '/utilities/is-filter',
            description: '判断是否过滤',
            disabled: true
          },
          {
            key: 'get-conditions',
            name: 'getConditions',
            keywords: [ 'utilities', '工具', '获取', '过滤', '条件' ],
            route: '/utilities/get-conditions',
            description: '获取过滤条件',
            disabled: {
              'auth.group.level': {
                $lte: 9000
              }
            }
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
            key: 'to-format-string',
            name: 'toFormatString',
            keywords: [ 'utilities', '工具', '格式化', 'format' ],
            route: '/utilities/to-format-string',
            description: '转换格式化字符串'
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
          {
            key: 'form-item',
            name: 'FormItem',
            keywords: [ 'components', '组件', 'form', '表单', 'item', '元素' ],
            route: '/components/form-item',
            description: '表单元素'
          },
          
        ]
      },
      {
        key: 'form-item',
        name: '表单元素',
        children: [
          {
            key: 'input',
            name: 'Input',
            keywords: [ 'components', '组件', 'form', '表单', 'input', '输入框' ],
            route: '/components/input',
            description: '文本输入框'
          },
          {
            key: 'input-number',
            name: 'InputNumber',
            keywords: [ 'components', '组件', 'form', '表单', 'input', 'number', '输入框', '计数器' ],
            route: '/components/input-number',
            description: '计数器'
          },
          {
            key: 'radio',
            name: 'Radio',
            keywords: [ 'components', '组件', 'form', '表单', 'radio', '单选框' ],
            route: '/components/radio',
            description: '单选框'
          },
          {
            key: 'checkbox',
            name: 'Checkbox',
            keywords: [ 'components', '组件', 'form', '表单', 'checkbox', '多选框' ],
            route: '/components/checkbox',
            description: '多选框'
          },
          {
            key: 'select',
            name: 'Select',
            keywords: [ 'components', '组件', 'form', '表单', 'select', '下拉' ],
            route: '/components/select',
            description: '下拉选择器'
          },
          {
            key: 'date-format',
            name: '日期格式',
            keywords: [ 'components', '组件', 'form', '表单', 'date', '日期', 'format', '格式' ],
            route: '/components/date-format',
            description: '日期格式'
          },
          {
            key: 'date-picker',
            name: 'DatePicker',
            keywords: [ 'components', '组件', 'form', '表单', 'date', '日期' ],
            route: '/components/date-picker',
            description: '日期选择器'
          },
          {
            key: 'daterange-picker',
            name: 'DatePicker [范围]',
            keywords: [ 'components', '组件', 'form', '表单', 'date', '日期', 'range', '范围' ],
            route: '/components/daterange-picker',
            description: '日期范围选择器'
          },
          {
            key: 'time-picker',
            name: 'TimePicker',
            keywords: [ 'components', '组件', 'form', '表单', 'time', '时间' ],
            route: '/components/time-picker',
            description: '时间选择器'
          },
          {
            key: 'switch',
            name: 'Switch',
            keywords: [ 'components', '组件', 'form', '表单', 'switch', '开关' ],
            route: '/components/switch',
            description: '开关 -- 表示两种相互对立的状态间的切换，多用于触发「开/关」'
          },
          {
            key: 'slider',
            name: 'Slider',
            keywords: [ 'components', '组件', 'form', '表单', 'slider', '滑块' ],
            route: '/components/slider',
            description: '滑块 -- 通过拖动滑块在一个固定区间内进行选择'
          },
          {
            key: 'transfer',
            name: 'Transfer',
            keywords: [ 'components', '组件', 'form', '表单', 'transfer', '穿梭框' ],
            route: '/components/transfer',
            description: '穿梭框'
          },
          {
            key: 'cascader',
            name: 'Cascader',
            keywords: [ 'components', '组件', 'form', '表单', 'cascader', '级联选择器' ],
            route: '/components/cascader',
            description: '级联选择器'
          },
        ]
      },
      {
        key: 'navigation',
        name: '导航',
        children: [
          {
            key: 'channel-searchbar',
            name: 'ChannelSearchbar',
            keywords: [ 'components', '组件', 'searchbar', '频道搜索框' ],
            route: '/components/channel-searchbar',
            description: '频道搜索器，用于搜索频道下子页面'
          },
          {
            key: 'sidebar',
            name: 'Sidebar',
            route: '/components/sidebar',
            description: '侧栏导航'
          },
        ]
      }
    ]
  },
]