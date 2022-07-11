<template>
  <div>
    <el-button type="primary" @click="handleCommand('action:open_left')">左侧打开</el-button>
    <el-button type="success" @click="handleCommand('action:open_right')">右侧打开</el-button>
    <el-button type="warning" @click="handleCommand('action:open_top')">顶部打开</el-button>
    <el-button type="danger" @click="handleCommand('action:open_bottom')">底部打开</el-button>

    <kl-drawer class="dark:bg-dark-700" 
      placement="left" 
      :visible="drawer === 'left'" 
      :offset="4"
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      左侧打开
    </kl-drawer>
    <kl-drawer class="dark:bg-dark-700" 
      placement="right" 
      :visible="drawer === 'right'" 
      :offset="4"
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      右侧打开
    </kl-drawer>
    <kl-drawer class="dark:bg-dark-700" 
      placement="top" 
      :visible="drawer === 'top'" 
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      顶部打开
    </kl-drawer>
    <kl-drawer class="dark:bg-dark-700" 
      placement="bottom" 
      :visible="drawer === 'bottom'" 
      :width="18.75"
      unit="rem"
      @close="handleCommand('command:close')" >
      底部打开
    </kl-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { runCommand } from '@/packages/utilities'

@Component
export default class Demo extends Vue {

  @Provide()
  drawer: string = ''

  handleCommand (value: string, row?: Record<string, any>) {
    return runCommand(this, {
      action: (type: string) => {
        let [ action, placement ] = type.split(/\_/)
        if (action === 'open') {
          this.drawer = placement
        }
        else if (action === 'close') {
          this.handleClose()
        }
      },
      // aside: () => {
      //   if (this.drawer === 'aside') {
      //     this.handleCloseDrawer()
      //     return
      //   }
      //   this.drawer = 'aside'
      // },
      close: () => {
        this.handleClose()
      }
    })(value, row)
  }

  handleClose () {
    this.drawer = ''
  }
}

</script>

<style lang="less" scoped>
.el-button {
  margin: 10px;
}
</style>