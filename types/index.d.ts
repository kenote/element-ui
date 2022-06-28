import { ChannelDataNode as KlChannelDataNode } from '@kenote/common'

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

// export * from '../packages/components'
export const Plugin: Vue.PluginObject<any>
export { 
  filterChannelDataNode, 
  parseCommand, 
  runCommand, 
  parseDate, 
  parseContent, 
  parseTemplate, 
  isDisabled, 
  isFilter 
} from './utilities'