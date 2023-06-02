<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开 Dialog</el-button>
    <kl-dialog title="标题" 
      :width="400" 
      :visible="visible" 
      :show-footer="true"
      :show-fullscreen="true"
      @close="visible = false">
      <p>这是一段信息</p>
    </kl-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  visible: boolean = false
}
</script>