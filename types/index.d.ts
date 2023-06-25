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
  value         ?: string | number
  label          : string
  disabled      ?: boolean
  children      ?: PropDataItem[]
  content       ?: string
}

export declare interface FormItemColumn {
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
  draft         ?: PlanOptions
}

export declare type PlanDataItem = PropDataItem & { associate?: string }

export declare interface PlanOptions {
  name          ?: string
  data          ?: PlanDataItem[]
  placeholder   ?: string
  width         ?: number | string
  associate     ?: string
}

export declare interface EmitOptions {
  key            : string
  name           : string
  type           : 'button' | 'dropdown' | 'link-text' | 'select'
  style         ?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  disabled      ?: boolean | FilterQuery<any> | string
  children      ?: Omit<EmitOptions, 'type' | 'children'>[]
  command       ?: string
  conditions    ?: FilterQuery<any> | string
  formitem      ?: Omit<FormItemColumn, 'key' | 'type' | 'disabled' | 'conditions'>
  dataBlock     ?: BlockOptions
}

export declare interface BlockOptions {
  key            : string
  query         ?: FilterQuery<any> | string
}

export declare interface TableColumn {
  key            : string
  name          ?: string
  width         ?: number | string
  minWidth      ?: number | string
  fixed         ?: true | 'left' | 'right'
  align         ?: 'left' | 'center' | 'right'
  sortable      ?: boolean | 'custem'
  format        ?: ParseData.format | ParseData.format[]
  defaultValue  ?: string | number
  alpha         ?: FilterQuery<any> | string
  clipboard     ?: boolean | string
  template      ?: string
  click         ?: string
  status        ?: StatusCell[]
  dots          ?: StatusCell[]
  emits         ?: EmitOptions[]
}

export declare interface Pagination {
  size          ?: number
  page          ?: number
  sort          ?: string[]
}

export declare interface Sorter {
  request       ?: RequestConfig
  options       ?: SubmitOptions
}

export declare interface Selection {
  open           : boolean
  disabled      ?: boolean | FilterQuery<any> | string
}

export declare interface StatusCell {
  key            : string
  name          ?: string
  style         ?: string
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
export * from './codemirror'
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
  parseRules,
  parseParams,
  formatString
} from './utilities'