import { FilterQuery, Method } from '@kenote/common'
import { IncomingHttpHeaders } from 'http'

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
  // key           ?: string
  value         ?: string
  label          : string
  disabled      ?: boolean
  children      ?: PropDataItem[]
}

export declare interface PropDataGroup {
  label          : string
  options        : PropDataItem[]
}

export declare interface RequestConfig {
  method        ?: Method
  url           ?: string
  headers       ?: IncomingHttpHeaders
  parama        ?: any
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
  toFormatString
} from './utilities'