# runCommand

运行指令

## Typescript

```ts
/**
 * self -- 当前组件对象
 * commands -- 指令集对象
 * value -- 指令值
 * row -- 传递的指令参数
 * component -- 传递组件对象或其他对象
 */
function runCommand(self: Vue, commands?: Record<string, Function>): 
  (value: string, row?: Record<string, any>, component?: Vue | Record<string, any>) => void
```

## Example

### 基础使用

```vue
<template>
  <div>
    <!-- 打开网页 -->
    <el-button @click="handleCommand('https://baidu.com')">百度</el-button>
    <!-- 新窗口打开网页 -->
    <el-button @click="handleCommand('https://baidu.com|__blank')">百度</el-button>
    <!-- 内部路由跳转 -->
    <el-button @click="handleCommand('router:/accout/baseinfo')">路由跳转</el-button>
  </div>
</template>

<script>
import { runCommand } from '@kenote/element-ui'

export default {
  methods: {
    handleCommand (value: string) {
      return runCommand(this)(value)
    }
  }
}
</script>
```

### 简单指令

```vue
<template>
  <div>
    <el-button @click="handleCommand('command:test1')">指令1</el-button>
    <el-button @click="handleCommand('command:test2')">指令2</el-button>
    <el-button @click="handleCommand('command:test3')">指令3</el-button>
  </div>
</template>

<script>
import { runCommand } from '@kenote/element-ui'

export default {
  methods: {
    handleCommand (value: string) {
      return runCommand(this, {
        test1: () => {
          console.log('test1')
        },
        test2: () => {
          console.log('test2')
        },
        test3: () => {
          console.log('test3')
        },
      })(value)
    }
  }
}
</script>
```

### 分类指令

```vue
<template>
  <div>
    <el-button @click="handleCommand('action:edit')">Action 指令</el-button>
    <el-button @click="handleCommand('dialog:user')">Dialog 指令</el-button>
    <!-- 穿参 -->
    <el-button @click="handleCommand('action:edit', { uid: 1 })">Action 指令（穿参）</el-button>
    <el-button @click="handleCommand('dialog:user', { uid: 1 })">Dialog 指令（穿参）</el-button>
  </div>
</template>

<script>
import { runCommand } from '@kenote/element-ui'

export default {
  methods: {
    handleCommand (value: string, row?: Record<string, any>) {
      return runCommand(this, {
        // 处理 Action 指令
        action: (type: string, row?: Record<string, any>) => {
          console.log(`action:${type}`, row)
        },
        // 处理 Dialog 指令
        dialog: (type: string, row?: Record<string, any>) => {
          console.log(`dialog:${type}`, row)
        },
      })(value, row)
    }
  }
}
</script>
```