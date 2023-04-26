import { FilterQuery } from '@kenote/common'

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
} from './utilities'