<template>
  <vc-layout ref="layout"
    :screen-width="screenWidth" 
    :theme="theme" 
    :channels="channels" 
    :sidebar="sidebar" 
    :drawer="drawer" 
    @channel-node="handleChannelNode"
    @command="handleCommand">
    <transition  name="fade" mode="out-in">
      <router-view />
    </transition>
  </vc-layout>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LayoutMixin from '../mixins/layout'

@Component<BasicLayout>({
  name: 'basic',
})
export default class BasicLayout extends Mixins(LayoutMixin) {

}
</script>