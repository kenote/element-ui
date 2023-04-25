# ChannelSearchbar

频道搜索器，用于搜索频道下子页面

## Example

<dc-channel-searchbar />

### Code

```ts
<template>
  <div>
    <kl-channel-searchbar 
      :data="channels" 
      placeholder="搜索文档" 
      :filter="filter"
      @command="handleCommand" />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { ChannelDataNode, FilterQuery } from '@kenote/common'
import { PlusKeywordsNode } from '@kenote/element-ui'

const channels: ChannelDataNode<PlusKeywordsNode>[] = [
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
      {
        key: 'basic',
        name: '基础',
        children: [
          {
            key: 'searchbar',
            name: 'Searchbar 频道搜索框',
            keywords: [ 'components', '组件', 'searchbar', '频道搜索框' ],
            route: '/components/searchbar',
            description: '频道搜索框，用于搜索频道下子页面'
          }
        ]
      }
    ]
  }
]

@Component
export default class Demo extends Vue {

  @Provide()
  channels: ChannelDataNode<PlusKeywordsNode>[] = channels

  @Provide()
  filter: FilterQuery<ChannelDataNode<PlusKeywordsNode>> = {
    route: {
      $where: value => {
        return value != '/utilities/parse-command'
      }
    }
  }

  handleCommand (value: ChannelDataNode<PlusKeywordsNode>) {
    console.log(value)
  }

}
</script>
```

### 定义下拉样式

```less
:root {
  // 下拉列表背景色
  --kenote-popper-bg: #ffffff;
  // 下拉列表边框颜色
  --kenote-popper-bc: #e4e7ed;
  // 下拉列表悬停时背景色
  --kenote-popper-hover: #F5F7FA;
  // 下拉列表文字颜色
  --kenote-popper-text: #1f2937;
  // 副文本颜色
  --kenote-paratext: #949494;
  // 关键字颜色
  --kenote-keywords: #ef432c;
}

.searchbar-popper {
  background-color: var(--kenote-popper-bg);
  border-color: var(--kenote-popper-bc);

  &[x-placement^=bottom] .popper__arrow {
    border-bottom-color: var(--kenote-popper-bc);

    &::after {
      border-bottom-color: var(--kenote-popper-bg);
    }
  }

  li {
    color: var(--kenote-popper-text);
    border-bottom: 1px solid;
    border-color: var(--kenote-popper-bc);

    .description {
      color: var(--kenote-paratext);
    }

    .keywords {
      color: var(--kenote-keywords);
    }
    
    &.highlighted,
    &:hover {
      color: var(---kenote-popper-text);
      background-color: var(--kenote-popper-hover);
    }
  }
}
```

## API

### Porps

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| data | 频道数据 | `ChannelDataNode[]` | -- | -- |
| placeholder | 输入框占位文本 | `string` | -- | `搜索内容` |
| props | 对象映射表 | `Record\<string, any\>` | -- | `{ value: "name" }` |
| filter | 单元过滤器 | `FilterQuery\<ChannelDataNode\>` | -- | -- |
| popper-class | 下拉列表的类名 | `string` | -- | `searchbar-popper` |
| size | 输入框尺寸 | `string` | `medium / small / mini` | `default` |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| command | 点击下拉条目时触发 | `(value: ChannelDataNode) => void` |
| focus | 获得焦点时触发 | `(event: Event) => void` |
| blur | 失去焦点时触发 | `(event: Event) => void` |