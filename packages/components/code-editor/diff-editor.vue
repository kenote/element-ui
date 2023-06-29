<template>
  <div ref="diffEditor" 
    :style="{ 
      width: toStyleSize(width), 
      height: toStyleSize(height) 
    }" 
    v-bind:class="border ? 'code-editer__broder' : ''" />
</template>

<script lang="ts">
import { Component, Prop, Mixins, Provide, Emit, Watch } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'
import Emitter from 'element-ui/lib/mixins/emitter'
import { monaco } from './monaco-editor'

@Component<KlDiffEditor>({
  name: 'KlDiffEditor',
  mounted() {
    this.initialEditor()
  },
})
export default class KlDiffEditor extends Mixins(KlBaseMixin, Emitter) {
  [x: string]: any

  @Prop({ default: false })
  border!: boolean

  @Prop()
  width!: number | string

  @Prop({ default: 500 })
  height!: number | string

  @Prop({ default: '' })
  original!: string

  @Prop({ default: '' })
  modified!: string

  @Prop({ default: 'javascript' })
  language!: string

  @Prop({ default: 'vs' })
  theme!: string

  @Provide()
  editor?: monaco.editor.IStandaloneDiffEditor

  @Emit('change')
  change (value: string) {}

  @Watch('theme')
  onThemeChange (val: string, oldVal: string) {
    if (val === oldVal) return
    monaco.editor.setTheme(val)
  }

  initialEditor () {
    let diffEditor = <HTMLTextAreaElement> this.$refs?.['diffEditor']
    this.editor = monaco.editor.createDiffEditor(diffEditor, {
      fontSize: 14,
      automaticLayout: true
    })
    this.editor.setModel({
      original: monaco.editor.createModel(this.original, this.language),
      modified: monaco.editor.createModel(this.modified, this.language),
      
    })
    this.editor.onDidUpdateDiff(evt => {
      let value = this.editor?.getModifiedEditor().getValue()
      this.change(value??'')
      ;(<any>this)?.dispatch('ElFormItem', 'el.form.change', value)
    })
  }

}
</script>

<style lang="less">
.code-editer__broder {
  border: 1px #99999957 solid;
}

.monaco-diff-editor.vs-dark .diffOverview {
  background: #1e1e1e;
}
</style>