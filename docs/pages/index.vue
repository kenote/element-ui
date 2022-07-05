<template>
  <div class="px-6 md:px-8">
    <header class="flex items-center justify-center h-$full-header md:px-6">
      <div>
        <div class="space-y-2 mb-12 md:mb-14">
          <figure>
            <img class="mx-auto  w-auto max-h-120px block select-none sm:h-24 h-16" src="/logo1.png" />
          </figure>
          <div class="text-center">
            <h1 class="text-3xl leading-10 font-semibold sm:text-5xl sm:leading-16">
              Element UI
            </h1>
            <p class="m-0 mt-1 text-lg opacity-75 leading-6 px-4 sm:text-xl">
              基于 Element UI 的 Vue 拓展组件
            </p>
            <div class="flex space-x-4 mt-8 justify-center">
              <router-link class="inline-flex items-center justify-center
  px-3 py-2
  border border-transparent rounded-md
  bg-primary
  hover:bg-primary-600
  shadow-sm
  text-base text-white font-medium
  transition duration-50
  ring-primary focus:ring-3 ring-opacity-50 text-base px-3 py-2.5 md:text-lg md:px-4 md:py-3 border-2" to="/guide">
                起步
              </router-link>
              <router-link class="inline-flex items-center justify-center
  px-3 py-2
  border border-transparent rounded-md
  bg-primary1
  hover:bg-primary-600
  shadow-sm
  text-base text-white font-medium
  transition duration-50
  ring-primary focus:ring-3 ring-opacity-50 bg-transparent border border-primary text-primary hover:text-gray-100 text-base px-3 py-2.5 md:text-lg md:px-4 md:py-3 border-2" to="/components">
                了解更多
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
    </header>

    <footer class="mx-auto container !max-w-screen-2xl px-6">
      <div class="px-6 pb-9 sm:px-6 sm:pb-18">
        <p class="text-center text-sm text-gray-400">
          MIT Licensed | Copyright © 2020-2022 kenote Contributors
        </p>
      </div>
    </footer>
  </div>
</template>

<route lang="yaml">
meta: 
  layout: home
</route>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {

}

</script>