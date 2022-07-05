<template>
  <div class="m-auto w-full max-w-[var(--screen-max-width)]  flex flex-row -lg:overflow-y-auto -lg:h-full">
    <!-- <vc-sidebar v-if="sidebar" :data="sidebar"></vc-sidebar> -->
    <div class="w-[var(--sidebar-width)] fixed top-[var(--header-height)] bottom-0 <lg:hidden">
      <perfect-scrollbar :options="{ suppressScrollX: true }" class="h-[calc(100vh-var(--header-height))]">
        <vc-sidebar v-if="sidebar" :data="sidebar"></vc-sidebar>
      </perfect-scrollbar>
    </div>
    <div class="w-full lg:pt-11 pb-11" v-bind:class="sidebar ? `lg:pl-$sidebar-width` : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ChannelDataNode } from '@kenote/common'
import type { PlusKeywordsNode } from '@/types'

@Component<VcMain>({
  name: 'vc-main'
})
export default class VcMain extends Vue {

  @Prop({ default: undefined })
  sidebar!: ChannelDataNode<PlusKeywordsNode>[]

}
</script>