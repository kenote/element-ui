# Drawer

推拉抽屉

## Example

<dc-drawer />

### Code

```vue
<template>
  <div>
    <el-button @click="handleCommand('action:open_left')">左侧打开</el-button>
    <el-button @click="handleCommand('action:open_right')">右侧打开</el-button>
    <el-button @click="handleCommand('action:open_top')">顶部打开</el-button>
    <el-button @click="handleCommand('action:open_bottom')">底部打开</el-button>

    <kl-drawer class="dark:bg-dark-700" 
      placement="left" 
      :visible="drawer === 'left'" 
      :offset="4"
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      左侧打开
    </kl-drawer>
    <kl-drawer class="dark:bg-dark-700" 
      placement="right" 
      :visible="drawer === 'right'" 
      :offset="4"
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      右侧打开
    </kl-drawer>
    <kl-drawer class="dark:bg-dark-700" 
      placement="top" 
      :visible="drawer === 'top'" 
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      顶部打开
    </kl-drawer>
    <kl-drawer class="dark:bg-dark-700" 
      placement="bottom" 
      :visible="drawer === 'bottom'" 
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      底部打开
    </kl-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { runCommand } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  drawer: string = ''

  handleCommand (value: string, row?: Record<string, any>) {
    return runCommand(this, {
      action: (type: string) => {
        let [ action, placement ] = type.split(/\_/)
        if (action === 'open') {
          this.drawer = placement
        }
      },
      close: () => {
        this.handleClose()
      }
    })(value, row)
  }

  handleClose () {
    this.drawer = ''
  }
}

</script>
```

## API

### Porps

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| placement | 打开方向 | string | top / bottom / left / right | \'right\' |
| width | 抽屉宽度/高度 | number | -- | 360 |
| unit | 尺寸单位 | string | px / rem /em | \'px\' |
| offset | 偏移距离 | number | -- | 0 |
| lock | 锁定状态 | boolean | -- | false |
| visible | 打开状态 | boolean | -- | false |

### Slot

| 名称 | 说明 |
| ------ | ------ |
| header | Drawer 头部区域内容 |
| footer | Drawer 底部区域内容 |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| open | Drawer 打开的回调 | -- |
| close | Drawer 关闭的回调 | -- |