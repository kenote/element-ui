<template>
  <div ref="codeEditor" 
    :style="{ 
      width: toStyleSize(width), 
      height: toStyleSize(height) 
    }" 
    v-bind:class="border ? 'code-editer__broder' : ''" />
</template>

<script lang="ts">
import { Component, Prop, Mixins, Provide, Emit, Watch, Model } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'
import Emitter from 'element-ui/lib/mixins/emitter'
import { monaco } from './monaco-editor'
import { isBoolean } from 'lodash'

function getMinimap (value?: monaco.editor.IEditorMinimapOptions | boolean) {
  if (isBoolean(value)) {
    return <monaco.editor.IEditorMinimapOptions> {
      enabled: value
    }
  }
  return value
}

@Component<KlCodeEditor>({
  name: 'KlCodeEditor',
  mounted() {
    this.code = this.value??''
    this.initialEditor()
  },
})
export default class KlCodeEditor extends Mixins(KlBaseMixin, Emitter) {
  [x: string]: any

  @Prop({ default: 'javascript' })
  language!: string

  @Prop({ default: 'vs' })
  theme!: string

  @Prop({ default: false })
  border!: boolean

  @Prop({ default: 4 })
  tabSize!: number

  @Prop({ default: false })
  minimap!: monaco.editor.IEditorMinimapOptions | boolean

  @Prop()
  width!: number | string

  @Prop({ default: 500 })
  height!: number | string

  @Prop({ default: false })
  readOnly!: boolean

  @Provide()
  code: string = ''

  @Provide()
  editor?: monaco.editor.IStandaloneCodeEditor

  @Model('update')
  value!: string

  @Emit('update')
  update (value: string) {}

  @Emit('change')
  change (value: string) {}

  @Watch('value')
  onValueChange (val: string, oldVal: string) {
    if (val === oldVal) return
    this.code = val
    this.editor?.setValue(val)
  }

  @Watch('code')
  onCodeChange (val: string, oldVal: string) {
    if (val === oldVal) return
    this.update(val)
  }

  @Watch('theme')
  onThemeChange (val: string, oldVal: string) {
    if (val === oldVal) return
    monaco.editor.setTheme(val)
  }

  @Watch('language')
  onLanguageChange (val: string, oldVal: string) {
    if (val === oldVal) return
    monaco.editor.setModelLanguage(this.editor?.getModel()!, val)
  }

  @Watch('tabSize')
  onTabSizeChange (val: number, oldVal: number) {
    if (val === oldVal) return
    this.editor?.getModel()?.updateOptions({ tabSize: val })
  }

  @Watch('minimap')
  onMinimapChange (val: monaco.editor.IEditorMinimapOptions | boolean, oldVal: monaco.editor.IEditorMinimapOptions | boolean) {
    if (val === oldVal) return
    this.editor?.updateOptions({ minimap: getMinimap(val) })
  }

  initialEditor () {
    let codeEditor = <HTMLTextAreaElement> this.$refs?.['codeEditor']
    this.editor = monaco.editor.create(codeEditor, {
      value: this.code,
      language: this.language,
      model: monaco.editor.createModel(this.code, this.language),
      theme: this.theme,
      automaticLayout: true,
      fontSize: 14,
      tabSize: this.tabSize,
      minimap: getMinimap(this.minimap),
      readOnly: this.readOnly
    })
    this.editor.onDidChangeModelContent( evt => {
      let value = this.editor?.getValue()
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
.monaco-editor {
  height: 100% !important;

  .overflow-guard {
    height: inherit !important;
  }
}
</style>