<template>
  <header class="m-auto max-w-[var(--screen-max-width)] w-full h-full flex px-2 md:px-6">
    <div class="flex items-center mr-2 lg:hidden" v-if="sidebar">
      <button class="inline-flex text-xl p-2" @click="handleCommand('command:aside')">
        <span class="iconfont icon-menu-fold !text-2xl "></span>
      </button>
    </div>
    <div class="flex items-center flex-1 lg:flex-none logo">
      <router-link class="inline-flex items-center text-2xl lg:text-2xl font-semibold" to="/">
        <img class="inline-flex mr-2 lg:mr-3 h-8 " src="/logo1.png" />
        <span>Element UI</span> 
      </router-link>
    </div>
    <!-- <div class="flex items-center order-last ml-2 lg:order-none lg:flex-1 lg:ml-4 xl:ml-10">
      
    </div> -->
    <div class="hidden lg:flex items-center flex-1 justify-end ">
      <kl-channel-searchbar
        :data="channels"
        placeholder="搜索文档"
        @command="handleChannelNode"
        />
      <nav class="inline-flex space-x-2 px-3">
        <div class="item min-w-16" v-for="item in channels" :key="item.key">
          <router-link v-if="item.route" 
            class="p-2 inline-flex items-center transition duration-50 hover:text-blue-300" 
            :to="item.route">
            {{item.name}}
          </router-link>
        </div>
      </nav>
    </div>
    <div class="flex items-center lg:space-x-3 lg:pl-3 xl:pl-6">
      <button class="inline-flex text-xl p-2" @click="handleCommand('command:theme')">
        <span v-if="theme == 'dark'" class="iconfont icon-moon !text-2xl "></span>
        <span v-else class="iconfont icon-sun !text-2xl"></span>
      </button>
      <button class="inline-flex text-xl p-2 lg:hidden" @click="handleCommand('command:nav')">
        <span class="iconfont icon-menu-unfold !text-2xl "></span>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { ChannelDataNode } from '@kenote/common'
import type { PlusKeywordsNode } from '@/types'

@Component<VcHeader>({
  name: 'vc-header',
})
export default class VcHeader extends Vue {
  
  @Prop({ default: '' })
  theme!: string

  @Prop({ default: [] })
  channels!: ChannelDataNode<PlusKeywordsNode>[]

  @Prop({ default: false })
  sidebar!: boolean

  @Emit('command')
  handleCommand (value: string) {}

  @Emit('channel-node')
  handleChannelNode (value: ChannelDataNode<PlusKeywordsNode>) {}

  handleRoute (value: any) {

  }
}
</script>