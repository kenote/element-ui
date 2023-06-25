<template>
  <section>
    <codemirror v-model="code" :options="options" />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Provide, Emit, Watch, Model } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'
import Emitter from 'element-ui/lib/mixins/emitter'
import type { CodemirrorUtil } from '../../../types'

@Component<KlCodemirror>({
  name: 'KlCodemirror',
  mounted() {
    this.code = this.value??''
  },
})
export default class KlCodemirror extends Mixins(KlBaseMixin, Emitter, ) {

  @Provide()
  code: string = ''

  @Provide()
  options: CodemirrorUtil.Options = {
    tabSize: 2,
    foldGutter: true,
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    styleSelectedText: false,
    line: true,
    // scrollbarStyle: 'simple',
    // keyMap: 'simple',
    mode: 'text/javascript',
    theme: 'monokai',
    placeholder: '...',
    readOnly: false
  }

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
  }

  @Watch('code')
  onCodeChange (val: string, oldVal: string) {
    if (val === oldVal) return
    (<any>this)?.dispatch('ElFormItem', 'el.form.change', val)
    this.change(val)
    this.update(val)
  }
}
</script>