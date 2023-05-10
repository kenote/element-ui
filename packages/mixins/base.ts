import { Component, Vue, Prop } from 'vue-property-decorator'
import { isDisabled, parseProps, toFormatString, getFilter } from '../'
import _ from 'lodash'

@Component<KlBaseMixin>({
  name: 'KlBaseMixin'
})
export default class KlBaseMixin extends Vue {

  @Prop({ default: undefined })
  env!: Record<string, any>

  _ = _

  isDisabled = isDisabled(this.env)

  parseProps = parseProps

  toFormatString = toFormatString

  getFilter = getFilter

  parseTag (value: string, name: string): { label?: string, type?: '' | 'success' | 'info' | 'warning' | 'danger'} {
    let [ label, type ] = value.split('_')
    return _.get({ label, type }, name)
  }
}