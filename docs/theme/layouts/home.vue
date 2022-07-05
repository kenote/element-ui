<template>
  <vc-layout 
    :screen-width="screenWidth" 
    :theme="theme" 
    :channels="channels" 
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

@Component<HomeLayout>({
  name: 'home'
})
export default class HomeLayout extends Mixins(LayoutMixin) {

}
</script>