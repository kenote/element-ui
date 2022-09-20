
export declare namespace Command {

  type type = 'dialog' | 'action' | 'command' | 'router' | 'http'

  interface value<T> {
    type     : type | T
    path     : string
  }
}

export declare interface PlusKeywordsNode {
  keywords      ?: string[]
}

export * from './account'
export * from '../packages/components'
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
  runCommand, 
} from './utilities'