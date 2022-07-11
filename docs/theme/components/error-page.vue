<template>
  <div class="h-screen flex justify-center">
    <el-empty description="Page Not Found">
      <el-link @click="onClick">Back to our site</el-link>
    </el-empty>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    onClick () {
      this.$router.push('/')
    }
  }
})
</script>