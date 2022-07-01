<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex flex-row h-[var(--header-height)] border-b-1 border-[var(--kenote-bc)]">
      <vc-header :theme="theme" :channels="channels" :sidebar="!!sidebar" @command="handleCommand" @channel-node="handleChannelNode"></vc-header>
    </div>
    <div class="flex flex-1 flex-row top-[var(--header-height)] bottom-0 left-0 right-0 fixed">
      <perfect-scrollbar v-if="screenWidth > 1024" ref="main" :options="{ suppressScrollX: true }" class="w-full">
        <vc-main :sidebar="sidebar">
          <slot></slot>
        </vc-main>
      </perfect-scrollbar>
      <vc-main v-else ref="main" :sidebar="sidebar">
        <slot></slot>
      </vc-main>
    </div>
    <kl-drawer class="dark:bg-dark-700"
      ref="nav" 
      placement="right" 
      :visible="drawer === 'nav'" 
      :offset="4"
      :width="18.75"
      unit="rem"
      :lock="lock === 'nav'"
      @close="handleCommand('command:closeDrawer')" >
      <kl-channel-searchbar class="m-6 mb-0"
        :data="channels"
        placeholder="搜索文档"
        size="default"
        @command="handleChannelNode"
        @focus="handleFocus('nav')"
        @blur="handleBlur"
        />
      <nav class="flex-1">
        <ul class="py-4 px-4 lg:pt-10 text-lg">
          <li v-for="item in channels" :key="item.key">
            <router-link :to="item.route" class="
              transition 
              duration-100 
              relative 
              flex 
              items-center 
              justify-between 
              pl-3 
              py-1 
              border-gray-100 
              dark:border-dark-400
              text-gray-700
              dark:text-gray-400
              hover:text-blue-300 
              hover:dark:text-primary 
              active 
              !border-primary 
              dark:border-primary 
              !text-primary 
              dark:text-primary ">
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </nav>
    </kl-drawer>
    <kl-drawer class="dark:bg-dark-700" 
      ref="aside" 
      placement="left" 
      :visible="drawer === 'aside'" 
      :offset="4"
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:closeDrawer')" >
      <vc-sidebar v-if="sidebar" :data="sidebar" class="text-lg"></vc-sidebar>
    </kl-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { ChannelDataNode } from '@kenote/common'
import type { PlusKeywordsNode } from '@/types'

@Component<VcLayout>({
  name: 'vc-layout'
})
export default class VcLayout extends Vue {

  @Prop({ default: 0 })
  screenWidth!: number

  @Prop({ default: '' })
  drawer!: string

  @Prop({ default: '' })
  lock!: string
  
  @Prop({ default: '' })
  theme!: string

  @Prop({ default: [] })
  channels!: ChannelDataNode<PlusKeywordsNode>[]

  @Prop({ default: undefined })
  sidebar!: ChannelDataNode<PlusKeywordsNode>[]

  @Emit('command')
  handleCommand (value: string) {}

  @Emit('channel-node')
  handleChannelNode (value: ChannelDataNode<PlusKeywordsNode>) {}

  @Watch('drawer')
  onDrawerHandle (val: string, oldVal: string) {
    if (val === oldVal) return
    this.lock = ''
  }

  handleFocus (name: string) {
    this.lock = name
  }

  handleBlur () {
    this.lock = ''
  }
}
</script> 