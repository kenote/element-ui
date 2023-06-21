import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { isDisabled, isFilter, parseProps, toFormatString, getFilter, toStyleSize, parseTemplate } from '../'
import _ from 'lodash'

@Component<KlBaseMixin>({
  name: 'KlBaseMixin'
})
export default class KlBaseMixin extends Vue {

  @Prop({ default: undefined })
  env!: Record<string, any>

  _ = _

  isDisabled = isDisabled(this.env)

  isFilter = isFilter(this.env)

  parseProps = parseProps
  parseTemplate = parseTemplate

  toFormatString = toFormatString

  getFilter = getFilter

  toStyleSize = toStyleSize

  parseTag (value: string, name: string): { label?: string, type?: '' | 'success' | 'info' | 'warning' | 'danger'} {
    let [ label, type ] = value.split('_')
    return _.get({ label, type }, name)
  }

  @Emit('command')
  command (type: string, row: Record<string, any>, component?: Vue | Record<string, any>) {}
}