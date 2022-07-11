# isDisabled

判断是否禁用

## Typescript

```ts

function isDisabled (env?: Record<string, any>): (disabled: boolean | FilterQuery<any> | string, props?: Record<string, any>) => boolean
```

## Example

```ts
<template>
  <div>
    <el-button :disabled="isDisabled({ level: { $lt: 3 }}, { level: 1 })">
      按钮1
    </el-button>
    <el-button :disabled="isDisabled(`
      level:
        $gt: {{ minLevel }}
    `, { level: 5 })">
      按钮2
    </el-button>
  </div>
</template>

<script>
import { isDisabled } from '@kenote/element-ui'

export default {
  data() {
    return {
      env: {
        minLevel: 3
      }
    }
  },
  methods: {
    isDisabled: isDisabled(this.env)
  }
}
</script>
```