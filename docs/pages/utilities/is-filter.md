# isFilter

判断是否过滤

## Typescript

```ts
function isFilter(env?: Record<string, any>): (conditions: FilterQuery<any> | string, props?: Record<string, any>) => boolean
```

## Example

```ts
<template>
  <div>
    <template v-if="isFilter({ level: { $lt: 3 }}, { level: 1 })">
      <!-- -->
    </template>
    <template v-else-if="isFilter(`
      level:
        $gt: {{ minLevel }}
    `, { level: 5 })">
      <!-- -->
    </template>
  </div>
</template>

<script>
import { isFilter } from '@kenote/element-ui'

export default {
  data() {
    return {
      env: {
        minLevel: 3
      }
    }
  },
  methods: {
    isFilter: isFilter(this.env)
  }
}
</script>
```