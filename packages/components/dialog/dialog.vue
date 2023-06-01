<template>
  <el-dialog
    :title="title"
    :width="toStyleSize(width)"
    :fullscreen="fullscreen"
    :visible="visible"
    :append-to-body="true"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :destroy-on-close="true"
    :show-close="showClose"
    :center="center"
    @close="handleClose">
    <div slot="title" class="el-dialog__header_left">
      <span class="el-dialog__title">{{ title }}</span>
      <el-button v-if="showFullscreen" 
        :icon="fullscreen ? 'el-icon-copy-document' : 'el-icon-full-screen'" 
        style="float:right" 
        @click="fullscreen = !fullscreen">
      </el-button>
    </div>
    <section :style="{ 
      minHeight: `${toStyleSize(height)}`, 
      display: 'flex', 
      ...!fullscreen ? { maxHeight: `${toStyleSize(height)}` } : null
    }">
      <perfect-scrollbar :options="{ suppressScrollX: true }" style="flex: 1">
        <slot></slot>
      </perfect-scrollbar>
    </section>
    <span slot="footer" class="dialog-footer" v-if="showFooter">
      <div class="dialog-footer-left">
        <slot name="tools"></slot>
      </div>
      <el-button @click="handleClose">{{ cancelButtonText }}</el-button>
      <el-button v-if="showFooter == 'confirm'" type="primary" @click="handleSubmit" :loading="loading">{{ confirmButtonText }}</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Provide, Mixins, Watch } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'

@Component<KlDialog>({
  name: 'KlDialog'
})
export default class KlDialog extends Mixins(KlBaseMixin) {

  @Prop({ default: false })
  loading!: boolean

  @Prop({ default: '' })
  title!: string

  @Prop({ default: false })
  visible!: boolean

  @Prop()
  width!: number | string

  @Prop({ default: '100px' })
  height!: number | string

  @Prop({ default: false })
  center!: boolean

  @Prop({ default: true })
  closeOnClickModal!: boolean

  @Prop({ default: true })
  closeOnPressEscape!: boolean

  @Prop({ default: true })
  showClose!:boolean

  @Prop({ default: false })
  showFullscreen!: boolean | 'open'

  @Prop({ default: false })
  showFooter!: boolean | 'confirm'

  @Prop({ default: '确 定' })
  confirmButtonText!: string

  @Prop({ default: '取 消' })
  cancelButtonText!: string

  @Provide()
  fullscreen: boolean = false

  @Watch('visible')
  onVisibleChange (val: boolean, oldVal: boolean) {
    if (val === oldVal) return
    if (val && this.showFullscreen == 'open') {
      this.fullscreen = true
    }
  }

  handleClose () {
    this.$emit('close')
    this.fullscreen = false
  }

  handleSubmit () {
    this.$emit('submit')
    this.fullscreen = false
  }
}
</script>

<style lang="less">

.el-dialog {
  display: flex;
  flex-direction: column;

  .el-dialog__body {
    flex: 1;
    min-height: 100px;
    padding: 10px 20px;
  }

  >div:last-of-type {
    padding: 10px 20px 20px;
  }

  .el-dialog__header {
    line-height: initial;

    .el-dialog__header_left {
      width: calc(100% - 30px);

      .el-button {
        border: 0;
        padding: 3px;
        font-size: 14px;
        background-color: transparent !important;

        &:hover {
          background-color: transparent !important;
        }

        &:focus {
          background-color: transparent !important;
          color: #606266;
        }
      }
    }

    .el-dialog__headerbtn .el-dialog__close {
      font-size: 18px;
      &:hover {
        animation: rotating 1.2s linear infinite;
      }
    }
  }
    
  .dialog-footer {
    display: flex;

    .dialog-footer-left {
      flex: 1;
      justify-content: flex-start;
      align-items: center;
      display: flex;
      margin-right: 15px;

      >:not(:first-child) {
        margin-left: 10px;
      }
    }

    .el-button {
      border-radius: 0;
      min-width: 95px;
    }

    .el-dropdown__caret-button {
      min-width: auto;
    }
  }
}
</style>