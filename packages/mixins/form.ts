import { Component, Vue, Prop, Mixins, Emit } from 'vue-property-decorator'
import { KlBaseMixin } from './'
import type { RequestConfig, FormItem, Verify, SubmitOptions } from '../../types'
import type { ParseData } from 'parse-string'

@Component<KlFormMixin>({
  name: 'KlFormMixin'
})
export default class KlFormMixin extends Mixins(KlBaseMixin) {

  @Prop({ default: false })
  loading!:boolean

  @Prop({ default: false })
  inline!: boolean

  @Prop({ default: false })
  border!: boolean

  @Prop()
  columns!: FormItem[]

  @Prop()
  rules!: Record<string, Verify.Rule[]>

  @Prop({ default: undefined })
  defaultValues!: Record<string, any>

  @Prop({ default: 120 })
  labelWidth!: string | number

  @Prop({ default: 'right' })
  labelPosition!: string

  @Prop({ default: '' })
  labelSuffix!: string

  @Prop()
  validate!: Record<string, Function>

  @Prop({ default: '提 交' })
  submitName!: string

  @Prop()
  options!: SubmitOptions

  @Prop()
  uniqueMethod!: (name: string, path: string | null, type: string) => Promise<any>

  @Prop({ default: false })
  hideRequiredAsterisk!: boolean

  @Prop({ default: false })
  inlineMessage!: boolean

  @Prop({ default: false })
  statusIcon!: boolean

  @Prop({ default: false })
  disabled!: boolean

  @Prop()
  mergeField!: Record<string, string[]>

  @Prop()
  exclude!: string[]

  @Prop()
  valueFormat!: Record<string, ParseData.format | ParseData.format[]>

  @Prop()
  action!: RequestConfig

  @Emit('submit')
  submit (values: Record<string, any>, action: RequestConfig, options: SubmitOptions) {}

}