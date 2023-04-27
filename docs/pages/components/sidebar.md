# Sidebar

侧栏导航

## Example

<dc-sidebar />

### Code

```ts
<template>
  <kl-sidebar :data="channels" :unique-opened="true" class="kl-sidebar-dark" popper-class="kl-popper-dark" :Env="Env" @select="handleSelect">
    <template slot="header">
      <i class="iconfont icon-system" />
      导航菜单
    </template>
    <template slot="footer">
      Version: v0.14.56
    </template>
  </k-sidebar>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { ChannelDataNode } from '@kenote/common'
import { PlusKeywordsNode } from '@kenote/element-ui'
import { channels } from '@/docs/config'

@Component
export default class Demo extends Vue {

  @Provide()
  Env: Record<string, any> = {
    auth: {
      group: { level: 9000 }
    }
  }

  @Provide()
  channels: ChannelDataNode<PlusKeywordsNode>[] = channels

  handleSelect (index: string) {
    console.log(index)
  }

}
</script>
```

### 自定义样式

```less
.kl-sidebar-dark, .kl-popper-dark {
  &.kl-sidebar, &.el-menu--vertical, &.el-menu--horizontal {
    background-color: rgb(68, 76, 84) ;
    border-right: 1px solid #373737;

    // 头部样式
    .header {
      background-color: #3c444a;
      color: rgb(255, 255, 255) !important;
      border-bottom: 1px solid #373737;
    }

    // 底部样式
    .footer {
      background-color: #3c444a;
      color: rgb(255, 255, 255) !important;
      border-top: 1px solid #373737;
    }

    // 菜单背景色
    .el-menu {
      background-color: rgb(68, 76, 84);
    }

    // 菜单单元样式
    .el-submenu__title, .el-menu-item {
      color: rgb(255, 255, 255) !important;
      background-color: rgb(68, 76, 84) !important;

      &:hover {
        background-color: rgb(54, 61, 67) !important;
      }
    }

    // 激活时样式
    .el-menu-item.is-active {
      background-color: #373d41 !important;
      color: rgb(255, 208, 75) !important;
    }
  }
}
```

## API

### Porps

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| data | 菜单数据 | `ChannelDataNode<any>[]` | -- | -- |
| collapse | 是否使用水平弹出菜单 | `boolean` | -- | `false` |
| unique-opened | 是否只保持一个子菜单的展开 | `boolean` | -- | `false` |
| router | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | `boolean` | -- | `false` |
| default-active | 当前激活菜单的 index | `string` | -- | -- |
| popper-class | 水平弹出菜单的自定义类名 | `string` | -- | -- |
| tag-class | Tag标签的自定义类名 | `string` | -- | -- |
| Env | 环境变量 | `object` | -- | -- |

### Slots 

| name | 说明 |
| ------ | ------ |
| header | 侧栏头部展示信息 |
| footer | 侧栏底部展示信息 |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| select | 选中回调 | `(index: string) => void` |