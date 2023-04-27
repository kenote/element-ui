<template>
  <div class="demo">
    <ul style="display: flex; flex-wrap: wrap; list-style: none; padding: 0;">
      <li style="margin-bottom: 10px;margin-right: 10px;">
        <span class="text-sm" style="margin: 8px;">选择菜单</span>
        <el-select v-model="channelKey">
          <el-option label="导航菜单" value=""></el-option>
          <el-option v-for="item in channels"
            :key="item.key"
            :label="item.name"
            :value="item.key"
            ></el-option>
        </el-select>
      </li>
      <li style="margin-bottom: 10px;margin-right: 10px;">
        <span class="text-sm" style="margin: 8px;">弹出模式</span>
        <el-switch v-model="collapse"></el-switch>
      </li>
      <li style="margin-bottom: 10px;margin-right: 10px;">
        <span class="text-sm" style="margin: 8px;">暗黑样式</span>
        <el-switch v-model="dark"></el-switch>
      </li>
    </ul>
    <div class="flex" style="flex-wrap: wrap;">
      <div style="min-width: 280px; height: 420px;">
        <kl-sidebar :data="channels.find( v => v.key == channelKey )?.children??channels" @select="handleSelect"
          :unique-opened="true"
          :collapse="collapse"
          v-bind:class="dark && 'kl-sidebar-dark'"
          v-bind:popper-class="dark ? 'kl-popper-dark' : ''"
          tag-class="kl-sidebar-tag"
          :env="env"
          >
          <template slot="header">
            <i class="iconfont icon-system" />
            {{ channels.find( v => v.key == channelKey )?.name ?? '导航菜单' }}
          </template>
          <template slot="footer">
            Version: v0.14.56
          </template>
        </kl-sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import type { ChannelDataNode } from '@kenote/common'
import type { PlusKeywordsNode } from '@/types'
import { channels } from '@/docs/config'

@Component
export default class Demo extends Vue {

  @Prop({ default: 'default' })
  type!: string

  @Provide()
  env: Record<string, any> = {
    auth: {
      group: { level: 9000 }
    }
  }

  @Provide()
  channels: ChannelDataNode<PlusKeywordsNode>[] = channels

  @Provide()
  channelKey: string = ''

  @Provide()
  collapse: boolean = false

  @Provide()
  dark: boolean = false

  handleSelect (index: string) {
    console.log(index)
  }

}
</script>

<style lang="less">
.kl-sidebar-dark, .kl-popper-dark {
  &.kl-sidebar, &.el-menu--vertical, &.el-menu--horizontal {
    background-color: rgb(68, 76, 84) ;
    border-right: 1px solid #373737;

    .header {
      background-color: #3c444a;
      color: rgb(255, 255, 255) !important;
      border-bottom: 1px solid #373737;
    }

    .footer {
      background-color: #3c444a;
      color: rgb(255, 255, 255) !important;
      border-top: 1px solid #373737;
    }

    .el-menu {
      background-color: rgb(68, 76, 84);
    }

    .el-submenu__title, .el-menu-item {
      color: rgb(255, 255, 255) !important;
      background-color: rgb(68, 76, 84) !important;

      &:hover {
        background-color: rgb(54, 61, 67) !important;
      }
    }

    .el-menu-item.is-active {
      background-color: #373d41 !important;
      color: rgb(255, 208, 75) !important;
    }

    .el-menu--collapse .el-submenu .el-menu {
      border: 1px solid #373737;
    }
  }
}

.kl-sidebar-tag {
  border-radius: 16px;
}
</style>