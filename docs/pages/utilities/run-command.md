# runCommand

运行指令

## Typescript

```ts
function runCommand(self: Vue, commands?: Record<string, Function>): 
  (value: string, row?: Record<string, any>, component?: Vue | Record<string, any>) => void
```

## Example

<du-runcommand />

```vue
<template>
  <div>
    <el-button @click="handleCommand('https://baidu.com|__blank')">百度</el-button>
    <el-button @click="handleCommand('router:/utilities/parse-command')">路由跳转</el-button>
    <el-button @click="handleCommand('command:test')">Command</el-button>
    <el-button @click="handleCommand('action:test')">Action</el-button>
    <el-button @click="handleCommand('dialog:test')">Dialog</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { runCommand } from '@kenote/element-ui'

@Component<Demo>({
  name: 'demo',
})
export default class Demo extends Vue {
  
  /**
   * 运行指令
   */
  handleCommand (value: string, row?: Record<string, any>, component?: Vue | Record<string, any>) {
    return runCommand(this, {
      // 处理简单指令，通过 command:<name> 获得
      test: () => {
        window.alert('command:test')
      },
      // 处理 Action 分类指令
      action: (type: string, row: Record<string, any> | null, component?: Vue) => {
        window.alert(`action:${type}`)
      },
      // 处理 Dialog 分类指令
      dialog: (type: string, row: Record<string, any> | null, component?: Vue) => {
        window.alert(`dialog:${type}`)
      },
    })(value, row, component)
  }
}
</script>
```