<template>
  <div>
    <el-submenu v-if="children?.length > 0" :index="index" :popper-class="popperClass">
      <template slot="title">
        <i v-if="icon" v-bind:class="icon"></i>
        {{ name }}
      </template>
      <kl-sidebar-item  v-for="(item, key) in children"
        :key="key"
        :name="item.name"
        :icon="item.icon"
        :index="item.route ?? item.key"
        :children="item.children"
        :tag="item.tag"
        :disabled="item.disabled"
        :eenv="env"
        :popper-class="popperClass"
        :tag-class="tagClass"
        >
      </kl-sidebar-item>
    </el-submenu>
    <el-menu-item v-else :index="index" :disabled="isDisabled(disabled)">
      <i v-if="icon" v-bind:class="icon"></i>
      {{ name }}
      <el-tag v-if="tag" class="kl-sidebar-item_tag" v-bind:class="tagClass" :type="parseTag(tag, 'type')" effect="dark">{{ parseTag(tag, 'label') }}</el-tag>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { ChannelDataNode, FilterQuery } from '@kenote/common'
import type { PlusKeywordsNode } from '../../../types'
import KlBaseMixin from '../../mixins/base'

@Component<KlSidebarItem>({
  name: 'KlSidebarItem',
})
export default class KlSidebarItem extends Mixins(KlBaseMixin) {

  @Prop({ default: '' })
  name!: string

  @Prop({ default: '' })
  icon!: string

  @Prop({ default: undefined })
  children!: ChannelDataNode<PlusKeywordsNode>[]

  @Prop({ default: '' })
  index!: string

  @Prop({ default: '' })
  tag!: string

  @Prop({ default: false })
  disabled!: boolean | FilterQuery<any> | string

  @Prop({ default: '' })
  popperClass!: string

  @Prop({ default: '' })
  tagClass!: string

}
</script>

<style lang="less">
.kl-sidebar-item_tag {
  float: right;
  margin-top: 9px;
  border-radius: 15px;
  min-width: 30px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  scale: .95;
}
</style>