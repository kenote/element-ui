# 安装

需要预先安装依赖模块 

- `element-ui` 
- `vue-fragment`

## npm 安装

```bash
npm i @kenote/element-ui --save
```

## 组件调用

```vue
<template>
  <div>
    <kl-channel-searchbar
      :data="channels"
      @command="handleCommand" />
  </div>
</template>

<script>
import { ChannelDataNode } from '@kenote/common'

export default {
  data() {
    channels: []
  },
  methods: {
    handleCommand (value: ChannelDataNode<any>) {
      console.log(value)
    }
  }
}
</script>
```