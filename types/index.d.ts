import { FilterQuery, Method } from '@kenote/common'
import { IncomingHttpHeaders } from 'http'
import { DatePickerOptions } from 'element-ui/types/date-picker'
import { FilterData, ParseData } from 'parse-string'

export declare namespace Command {

  type type = 'dialog' | 'action' | 'command' | 'router' | 'http'

  interface value<T> {
    type     : type | T
    path     : string
  }
}

export declare interface PlusKeywordsNode {
  keywords      ?: string[]
  tag           ?: string
  disabled      ?: boolean | FilterQuery<any> | string
}

export type FormItemType = 
  | 'input' 
  | 'input-number' 
  | 'password'
  | 'radio' | 'radio-button' 
  | 'checkbox' | 'checkbox-button' 
  | 'select' 
  | 'group-picker' | 'avatar-picker' | 'item-picker'
  | 'year' | 'years' | 'month' | 'months' | 'date' | 'dates' | 'week' | 'datetime' | 'time' | 'datetimerange' | 'daterange' | 'monthrange' | 'timerange'
  | 'switch'
  | 'slider'
  | 'color-picker'
  | 'cascader' | 'cascader-panel'
  | 'rate'
  | 'transfer'
  | 'codemirror'
  | 'textarea' 
  | 'text'

export declare interface PropDataItem {
  value         ?: string
  label          : string
  disabled      ?: boolean
  children      ?: PropDataItem[]
}

export declare interface FormItem {
  key            : string
  type           : FormItemType
  label         ?: string
  placeholder   ?: string | string[]
  disabled      ?: boolean | FilterQuery<any> | string
  width         ?: number | string
  size          ?: string
  readonly      ?: boolean
  format        ?: string
  valueFormat   ?: string
  pickerOptions ?: DatePickerOptions
  data          ?: Array<Partial<PropDataItem> & { [x: string]: any }>
  props         ?: Partial<Record<keyof PropDataItem, string> & { [x: string]: any }>
  options       ?: Record<string, any>
  conditions    ?: FilterQuery<any> | string
  labelOptions  ?: { key: string, options: Record<string, string> }
  labelWidth    ?: string | number
}

export declare interface SubmitOptions {
  reset         ?: string
  changeSubmit  ?: string
  next          ?: (values: any) => void
  emits         ?: EmitOptions[]
  hide          ?: boolean
}

export declare interface EmitOptions {
  key            : string
  name           : string
  type           : 'button' | 'dropdown' | 'link-text'
  style         ?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  disabled      ?: boolean | FilterQuery<any> | string
  children      ?: Omit<EmitOptions, 'type' | 'children'>[]
  command       ?: string
  conditions    ?: FilterQuery<any> | string
}

export declare namespace Verify {

  type Rule = Partial<Omit<FilterData.rule, 'validator'>> & Verify.PlusFields

  type Validator = (rule: any, value: any, done: (message?: string) => any) => (message?: string) => any
  type PromiseValidtor = (rule: any, value: any, done: (message?: string) => any) => Promise<(message?: string) => any>

  interface PlusFields {
    type          ?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'data' | 'url' | 'hex' | 'email'
    trigger       ?: 'blur' | 'change' | Array<'blur' | 'change'>
    validator     ?: Validator | PromiseValidtor | Array<string | number | boolean | null>
    field         ?: string
    fullField     ?: string
  }
}

export declare interface RequestConfig {
  method        ?: Method
  url           ?: string
  headers       ?: IncomingHttpHeaders
  params        ?: any
}

export * from './account'
export * from '../packages/components'
export * from '../packages/mixins'
export const Plugin: Vue.PluginObject<any>
export { 
  filterChannelDataNode, 
  getConditions,
  getFilter,
  isDisabled, 
  isFilter,
  parseCommand, 
  parseContent,
  parseDate,
  parseProps,
  parseTemplate,
  parseMouseEvent,
  runCommand,
  toFormatString,
  toStyleSize,
  parseRules
} from './utilities'