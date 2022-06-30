
import type { ChannelDataNode, FilterQuery } from '@kenote/common'
import type { Command, PlusKeywordsNode } from '.'

/**
 * 解析命令指向
 * @param value 
 */
export declare function parseCommand<T>(value: string): Command.value<T> | null
export declare function parseCommand<T>(value: string, tag: string): Command.value<T> | null

/**
 * 运行指令
 * @param value 
 */
export declare function runCommand(self: Vue): (value: string) => void
export declare function runCommand(self: Vue, commands: Record<string, Function>): (value: string, row?: Record<string, any>, component?: Vue | Record<string, any>) => void

/**
 * 检索频道数据节点，结果返回到列表
 * @param data 
 * @param keywords 
 * @param list 
 */
export declare function filterChannelDataNode(data: ChannelDataNode<PlusKeywordsNode>[], keywords: string, list: ChannelDataNode<PlusKeywordsNode>[]): void

/**
 * 解析成日期时间
 * @param value 
 * @param nowValue 
 * @returns 
 */
 export declare function parseDate (value: string | Date): Date | null
 export declare function parseDate (value: string | Date, nowValue: Date | null): Date | null

 /**
 * 解析某个对象属性的文本内容
 * @param path 
 * @param env 
 * @returns 
 */
export declare function parseContent (path: string, env: Record<string, any>): string

/**
 * 解析模版
 * @param tpl 
 * @param context 
 */
export declare function parseTemplate (tpl: string, context: object): string

/**
 * 判断是否禁用
 * @param env 
 * @returns 
 */
export declare function isDisabled(): (disabled: boolean | FilterQuery<any> | string, props?: Record<string, any>) => boolean
export declare function isDisabled(env: Record<string, any>): (disabled: boolean | FilterQuery<any> | string, props?: Record<string, any>) => boolean

/**
 * 判断是否过滤
 * @param conditions 
 * @param env 
 */
export declare function isFilter(): (conditions: FilterQuery<any> | string, props?: Record<string, any>) => boolean
export declare function isFilter(env: Record<string, any>): (conditions: FilterQuery<any> | string, props?: Record<string, any>) => boolean