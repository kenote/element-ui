<template>
  <kl-dialog :title="title" 
    :width="width" 
    :height="height"
    :visible="visible" 
    :center="center"
    show-footer="confirm"
    :show-close="showClose"
    :loading="loading"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    @submit="handleClose(true)"
    @close="handleClose(false)">
    <kl-form ref="dialogForm"
      :columns="columns" 
      :rules="rules"
      :default-values="defaultValues"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :label-suffix="labelSuffix"
      :validate="validate"
      :options="{ hide: true }"
      :hide-required-asterisk="hideRequiredAsterisk"
      :status-icon="statusIcon"
      :value-format="valueFormat"
      :exclude="exclude"
      :merge-field="mergeField"
      :unique-method="uniqueMethod"
      :action="action"
      :loading="loading"
      @submit="submit"
      />
    <template slot="tools">
      <kl-form-expand :data="options?.emits" :env="env" @command="command" />
    </template>
  </kl-dialog>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import KlDialog from '../dialog/dialog.vue'
import KlForm from './form.vue'
import KlFormMixin from '../../mixins/form'
import KlFormExpand from './form-expand.vue'

@Component<KlDiakogForm>({
  name: 'KlDiakogForm',
  components: {
    KlDialog,
    KlForm,
    KlFormExpand
  }
})
export default class KlDiakogForm extends Mixins(KlFormMixin) {

  @Prop({ default: '标题' })
  title!: string

  @Prop({ default: false })
  visible!: boolean

  @Prop({ default: 500 })
  width!: number | string

  @Prop({ default: 'fit-content' })
  height!: number | string

  @Prop({ default: false })
  center!: boolean

  @Prop({ default: true })
  closeOnClickModal!: boolean

  @Prop({ default: true })
  closeOnPressEscape!: boolean

  @Prop({ default: false })
  showClose!:boolean

  @Prop({ default: '确 定' })
  confirmButtonText!: string

  @Prop({ default: '取 消' })
  cancelButtonText!: string

  handleClose (submit: boolean) {
    let dialogForm = <KlForm> this.$refs['dialogForm']
    if (submit) {
      dialogForm.handleSubmit()
    }
    else {
      this.$emit('close')
    }
  }
}
</script>