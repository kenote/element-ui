
import { ChannelDataNode, FilterQuery } from '@kenote/common'
import { Command, PlusKeywordsNode, PropDataItem, Verify } from './'
import nunjucks from 'nunjucks'

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
export declare function parseTemplate (tpl: string, context: object, opts: nunjucks.ConfigureOptions): string


/**
 * 判断是否禁用
 * @param env 
 * @returns 
 */
export declare function isDisabled (): (disabled?: boolean | FilterQuery<any> | string, props?: Record<string, any>) => boolean
export declare function isDisabled (env: Record<string, any>): (disabled: boolean | FilterQuery<any> | string, props?: Record<string, any>) => boolean

/**
 * 判断是否过滤
 * @param conditions 
 * @param env 
 */
export declare function isFilter (): (conditions?: FilterQuery<any> | string, props?: Record<string, any>) => boolean
export declare function isFilter (env: Record<string, any>): (conditions?: FilterQuery<any> | string, props?: Record<string, any>) => boolean

/**
 * 获取过滤器
 * @param conditions 
 * @param props 
 */
export declare function getFilter(conditions?: FilterQuery<any>): (data: any) => boolean
export declare function getFilter(conditions?: string, props?: Record<string, any>): (data: any) => boolean

/**
 * 获取过滤条件
 * @param conditions 
 * @param props 
 */
export declare function getConditions(conditions?: FilterQuery<any>): FilterQuery<any> | null
export declare function getConditions(conditions?: string, props?: Record<string, any>): FilterQuery<any> | null

/**
 * 映射对象
 * @param props 
 */
export declare function parseProps<T = Record<string, string>> (): (data: Record<string, any>) => T
export declare function parseProps<T = Record<string, string>> (props: Record<string, string>): (data: Record<string, any>) => T

/**
 * 为 MouseEvent 添加 path
 * @param evt 
 */
export declare function parseMouseEvent (evt: MouseEvent & { path?: EventTarget[] }): MouseEvent & { path?: EventTarget[] }


/**
 * 转换格式化字符串
 * @param props 
 * @returns 
 */
export declare function toFormatString (): (data: Record<string, any>) => string
export declare function toFormatString (): (data: Record<string, any>, format: string) => string
export declare function toFormatString (props: Partial<Record<keyof PropDataItem, string>>): (data: Record<string, any>) => string
export declare function toFormatString (props: Partial<Record<keyof PropDataItem, string>>): (data: Record<string, any>, format: string) => string

/**
 * 转换样式尺寸大小
 * @param value 
 * @returns 
 */
export declare function toStyleSize(value?: number | string): string | undefined

/**
 * 解析验证规则
 * @param validate 
 * @returns 
 */
export declare function parseRules(validate: Record<string, Function>): (rules: Record<string, Verify.Rule[]>) => Record<string, Verify.Rule[]>
export declare function parseRules(validate: Record<string, Function>): (rules: Record<string, Verify.Rule[]>, self?: any) => Record<string, Verify.Rule[]>

/**
 * 解析参数
 * @param params 
 * @returns 
 */
export declare function parseParams(params: any): () => Record<string, any>
export declare function parseParams(params: any): (data: Record<string, any>) => Record<string, any>