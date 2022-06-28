# filterChannelDataNode

检索频道数据节点，结果返回到列表

## Typescript

```ts
function filterChannelDataNode(data: ChannelDataNode<PlusNode>[], keywords: string, list?: ChannelDataNode<PlusNode>[]): void

PlusNode {
  label         ?: string
  keywords      ?: string[]
}
```

## Example

```ts
import { filterChannelDataNode, PlusNode } from '@kenote/element-ui'
import { CommonDataNode, initMaps } from '@kenote/common'
import { trim } from 'lodash'

let data = initMaps([
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
            route: '/utilities/parse-command'
          },
          {
            key: 'run-command',
            name: 'runCommand',
            keywords: [ 'utilities', '工具', 'command', '指令', 'run-command' ],
            route: '/utilities/run-command'
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
            route: '/utilities/filter-channel-datanode'
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
      {
        key: 'basic',
        name: '基础',
        children: [
          {
            key: 'button',
            name: '按钮',
            keywords: [ 'components', '组件', 'button', '按钮' ],
            route: '/component/button'
          }
        ]
      }
    ]
  },
])
let keywords: string = 'channel'
let list: ChannelDataNode<PlusNode>[] = []

filterChannelDataNode(data, trim(keywords), list)
// => [
//   {
//     key: 'filter-channel-datanode',
//     name: 'filterChannelDataNode',
//     keywords: [ 'utilities', '工具', 'filter', '检索', 'channel', 'datanode' ],
//     route: '/utilities/filter-channel-datanode'
//   }
// ]
```