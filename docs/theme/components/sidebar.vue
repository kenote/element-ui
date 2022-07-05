<template>
  <!-- <div class="w-[var(--sidebar-width)] fixed top-[var(--header-height)] bottom-0 " v-bind:class="show ? `` : `<lg:hidden`">
    <perfect-scrollbar :options="{ suppressScrollX: true }" class="h-[calc(100vh-var(--header-height))]"> -->
      <div class="sticky  overflow-y-auto ml-5 dark:text-dark-40">
        <nav>
          <ul class="py-4 px-4 lg:pt-10">
            <li max-depth="2" v-for="nav in data" :key="nav.key">
              <h5 class="transition duration-100 font-bold py-2 ">{{nav.name}}</h5>
              <ul class="mb-2" v-if="nav.children">
                <li v-for="item in nav.children" :key="item.key">
                  <router-link :to="item.route" class="
                    transition 
                    duration-100 
                    relative 
                    flex 
                    items-center 
                    justify-between 
                    pl-3 
                    py-1 
                    border-l 
                    border-gray-200 
                    dark:border-dark-100
                    
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
            </li>
          </ul>
        </nav>
      </div>
    <!-- </perfect-scrollbar>
  </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ChannelDataNode } from '@kenote/common'
import type { PlusKeywordsNode } from '@/types'

@Component<VcSidebar>({
  name: 'vc-sidebar'
})
export default class VcSidebar extends Vue {

  @Prop({ default: [] })
  data!: ChannelDataNode<PlusKeywordsNode>[]

  @Prop({ default: false })
  show!: boolean

}
</script>