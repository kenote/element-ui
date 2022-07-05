<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  
}
</script>