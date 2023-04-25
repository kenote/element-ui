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
import type { ChannelDataNode, FilterQuery } from '@kenote/common'
import type { PlusKeywordsNode } from '@/types'
import { channels } from '@/docs/config'

@Component
export default class Demo extends Vue {

  @Provide()
  channels: ChannelDataNode<PlusKeywordsNode>[] = channels

  @Provide()
  filter: FilterQuery<ChannelDataNode<PlusKeywordsNode>> = {
    route: {
      $where: value => {
        return value !== '/utilities/parse-command'
      }
    }
  }

  handleCommand (value: ChannelDataNode<PlusKeywordsNode>) {
    console.log(value)
  }

}
</script>