# @kenote/element-ui

Component extension based on `element-ui`

## Usage

```ts
// main.ts
import Vue from 'vue'
import * as KlElment from '@kenote/element-ui'
import '@kenote/element-ui/lib/style.css'

Vue.use(KlElment.Plugin)
```

```html
// demo.vue
<template>
  <div>
    <kl-channel-searchbar 
      :data="channels" 
      @command="handleCommand" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import type { ChannelDataNode } from '@kenote/common'
import type { PlusKeywordsNode } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  channels: ChannelDataNode<PlusKeywordsNode>[] = []

  handleCommand (value: ChannelDataNode<PlusKeywordsNode>) {
    console.log(value)
  }
}
</script>
```

---
MIT License.