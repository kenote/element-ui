<template>
  <div class="kl-sidebar">
    <div class="header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <perfect-scrollbar :options="{ suppressScrollX: true }" style="flex: 1">
      <el-menu mode="vertical"
        :default-active="defaultActive"
        :collapse="collapse"
        :unique-opened="uniqueOpened"
        :router="router"
        @select="handleSelect">
        <sidebar-item v-for="(item, key) in data ?? []"
          :key="key"
          :name="item.name"
          :icon="item.icon"
          :children="item.children"
          :index="item.route ?? item.key"
          :tag="item.tag"
          :popper-class="popperClass"
          :tag-class="tagClass"
          :env="env">
        </sidebar-item>
      </el-menu>
    </perfect-scrollbar>
    <div class="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Mixins } from 'vue-property-decorator'
import { ChannelDataNode } from '@kenote/common'
import SidebarItem from './sidebar-item.vue'
import type { PlusKeywordsNode } from '@/types'
import KlBaseMixin from '../../mixins/base'

@Component<KlSidebar>({
  name: 'KlSidebar',
  components: {
    SidebarItem
  }
})
export default class KlSidebar extends Mixins(KlBaseMixin) {

  @Prop({ default: '' })
  defaultActive!: string

  @Prop({ default: false })
  collapse!: boolean

  @Prop({ default: false })
  uniqueOpened!: boolean

  @Prop({ default: false })
  router!: boolean

  @Prop({ default: undefined })
  data!: ChannelDataNode<PlusKeywordsNode>[]

  @Prop({ default: '' })
  popperClass!: string

  @Prop({ default: '' })
  tagClass!: string

  @Emit('select')
  handleSelect (index: string) {}

}
</script>

<style lang="less">
.el-menu {
  border-right: 0;
  padding-left: 0 !important;
  margin-bottom: 0 !important;

  &.el-menu--horizontal {
    border-bottom: 0;
  }

  li+li {
    margin-top: 0;
  }

  .el-submenu .el-menu-item {
    padding: 0 16px;
  }
}

.kl-sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e6e6e6;
  background-color: #fff;
  color: #303133;
  font-size: 14px;
  height: inherit;
  justify-content: space-between;

  .header {
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: center;
    font-weight: 400;
    border-bottom: 1px solid #e6e6e6;

    i {
      margin-right: 6px;
    }
  }

  .footer {
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: center;
    font-weight: 400;
    border-top: 1px solid #e6e6e6;
    opacity: .7;

    i {
      margin-right: 6px;
    }
  }

  .el-menu--collapse {
    width: inherit;

    &>.el-menu-item .el-submenu__icon-arrow, &>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
      display: inherit;
    }
  }
}
</style>