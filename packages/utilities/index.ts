import Vue from 'vue'
import 'vue-router'
import { dataNodeProxy, ChannelDataNode, FilterQuery } from '@kenote/common'
import { assign, compact, get, isBoolean, isDate, isFunction, isNaN, isPlainObject, isString, map, merge, omit, pick, template } from 'lodash'
import type { Command, PlusKeywordsNode, PropDataItem } from '../../types'
import ruleJudgment from 'rule-judgment'
import jsYaml from 'js-yaml'
import nunjucks from 'nunjucks'

/**
 * 解析命令指向
 * @param value 
 */
 export function parseCommand<T> (value: string, tag?: string): Command.value<T> | null {
  if (!value) return null
  let tags = compact([ 'dialog', 'action', 'command', 'router', 'https?', tag ]).join('|')
  let regex = new RegExp(`^(${tags})\\:(\\S+)$`)
  let command = value.match(regex)
  if (!command) return null
  let [ , type, path ] = command
  if (/^(https?)/.test(type)) {
    return { type: 'http', path: value }
  }
  return { type, path } as Command.value<any>
}

/**
 * 运行指令
 * @param value 
 */
export function runCommand (self: Vue, commands?: Record<string, Function>) {
  return (value: string, row?: Record<string, any>, component?: Vue | Record<string, any>) => {
    let command = parseCommand(value)
    if (!command) return
    if (command.type === 'command') {
      let [ name, ...props ] = command.path.split('|')
      let runScript = get(commands ?? self, name)
      if (isFunction(runScript)) {
        runScript(...props)
      }
    }
    else if (command.type === 'action') {
      if (commands?.action) {
        commands?.action(command.path, row, component, self)
      }
    }
    else if (command.type === 'dialog') {
      if (commands?.dialog) {
        commands?.dialog(command.path, row, component, self)
      }
    }
    else if (command.type === 'router') {
      if (!self?.$router) return
      self.$router.push(command.path)
    }
    else if (command.type === 'http') {
      if (!document) return
      let link = document.createElement('a')
      let [ href, target ] = command.path.split('|')
      link.href = href
      if (target) {
        link.target = target
      }
      link.click()
    }
  }
}

/**
 * 检索频道数据节点，结果返回到列表
 * @param data 
 * @param keywords 
 * @param list 
 */
export function filterChannelDataNode (data: ChannelDataNode<PlusKeywordsNode>[], keywords: string, list: ChannelDataNode<PlusKeywordsNode>[] = []) {
  if (!keywords) return
  let keys = map(list, 'key')
  let query: FilterQuery<ChannelDataNode<PlusKeywordsNode>> = {
    $or: [
      { name: { $regex: new RegExp(keywords, 'i') } },
      { keywords: { $_in: [ keywords.toLocaleLowerCase() ] } }
    ]
  }
  let item = dataNodeProxy<ChannelDataNode<PlusKeywordsNode>>(data).find({ $and: [ { key: { $nin: keys } }, query, { children: { $exists: false } } ] })
  if (item) {
    list.push(item)
    filterChannelDataNode(data, keywords, list)
  }
  return
}

/**
 * 判断是否禁用
 * @param env 
 * @returns 
 */
export function isDisabled (env?: Record<string, any>) {
  return (disabled: boolean | FilterQuery<any> | string, props?: Record<string, any>) => {
    if (!disabled) return false
    let query = disabled
    let data = assign({}, env, props)
    if (isString(disabled)) {
      query = jsYaml.safeLoad(parseTemplate(disabled, data)) as FilterQuery<any>
      if (!isPlainObject(query)) return false
    }
    if (isBoolean(query)) return query
    let filter = ruleJudgment(query as FilterQuery<any>)
    return filter(data)
  }
} 

/**
 * 判断是否过滤
 * @param conditions 
 * @param env 
 */
export function isFilter (env?: Record<string, any>) {
  return (conditions: FilterQuery<any> | string, props?: Record<string, any>) => {
    if (!conditions) return true
    let query = conditions
    let data = assign({}, env, props)
    if (isString(conditions)) {
      query = jsYaml.safeLoad(parseTemplate(conditions, data)) as FilterQuery<any>
      if (!isPlainObject(query)) return true
    }
    let filter = ruleJudgment(query as FilterQuery<any>)
    return filter(data)
  }
}

/**
 * 获取过滤器
 * @param conditions 
 * @param props 
 */
export function getFilter (conditions: FilterQuery<any> | string, props: Record<string, any> = {}) {
  if (!conditions) return (data: any) => true
  let query: FilterQuery<any> = conditions as FilterQuery<any>
  if (isString(conditions)) {
    query = jsYaml.safeLoad(parseTemplate(conditions, { ...props })) as FilterQuery<any>
  }
  if (!isPlainObject(query)) return (data: any) => true
  return ruleJudgment(query)
}

/**
 * 获取过滤条件
 * @param conditions 
 * @param props 
 */
export function getConditions (conditions: FilterQuery<any> | string, props: Record<string, any> = {}) {
  if (!conditions) return null
  let query = conditions
  if (isString(conditions)) {
    query = jsYaml.safeLoad(parseTemplate(conditions, { ...props })) as FilterQuery<any>
  }
  if (!isPlainObject(query)) return null
  return query as FilterQuery<any>
}

/**
 * 解析模版
 * @param tpl 
 * @param context 
 */
export function parseTemplate (tpl: string, context: object, opts?: nunjucks.ConfigureOptions) {
  let env = new nunjucks.Environment(null, merge({ autoescape: false }, opts))
  env.addFilter(parseDate.name, value => String(parseDate(value))) // 解析时间字面量
  env.addFilter(parseContent.name, value => String.raw`${parseContent(value, context)}` ) // 解析某个对象属性的文本内容
  return env.renderString(tpl, context)
}

/**
 * 解析成日期时间
 * @param value 
 * @param nowValue 
 * @returns 
 */
export function parseDate (value: string | Date, nowValue?: Date | null) {
  if (isDate(value)) return value
  // 组合起来使用
  if (/(\_)/.test(value)) {
    let dates = value.split(/\_/)
    let now: Date | null = null
    for (let item of dates) {
      if (now && !/(day?(s|e)|week?(s|e))$/.test(item)) break
      now = parseDate(item, now)
    }
    return now
  }
  // 提取日期字面量的值
  let dateValue = parseDateString(value)
  let today = nowValue ?? new Date()
  let nowDayOfWeek = today.getDay() - 1
  // 当前时间
  if (value === 'now') {
    return new Date()
  }
  // 昨天 | 今天 | 明天
  else if ([ 'yesterday', 'today', 'tomorrow' ].includes(value)) {
    let index = [ 'yesterday', 'today', 'tomorrow' ].indexOf(value) - 1
    return parseDate([index, 'days'].join(' '))
  }
  // 某天的当前时间
  else if (/(day)$/.test(value)) {
    return new Date(today.setDate(today.getDate() + dateValue))
  }
  // 某天的开始时间
  else if (/(days)$/.test(value)) {
    return new Date(new Date(today.setDate(today.getDate() + dateValue)).setHours(0, 0, 0, 0))
  }
  // 某天的结束时间
  else if (/(daye)$/.test(value)) {
    return new Date(new Date(today.setDate(today.getDate() + dateValue)).setHours(23, 59, 59, 999))
  }
  // 某周的当前时间
  else if (/(week)$/.test(value)) {
    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - nowDayOfWeek + (dateValue * 7) + nowDayOfWeek)
      .setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
    return new Date(date)
  }
  // 某周的开始时间
  else if (/(weeks)$/.test(value)) {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - nowDayOfWeek + (dateValue * 7) + 0)
  }
  // 某周的结束时间
  else if (/(weeke)$/.test(value)) {
    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - nowDayOfWeek + (dateValue * 7) + 6)
      .setHours(23, 59, 59, 999)
    return new Date(date)
  }
  // 某月的当前时间
  else if (/(month)$/.test(value)) {
    return new Date(new Date(new Date().setMonth(dateValue)))
  }
  // 某月的开始时间
  else if (/(months)$/.test(value)) {
    return new Date(new Date(new Date().setMonth(dateValue, 1)).setHours(0, 0, 0, 0))
  }
  // 某月的结束时间
  else if (/(monthe)$/.test(value)) {
    let offset = dateValue - new Date().getMonth() + 1
    return new Date(parseDate(`${offset} months`)!.getTime() - 1)
  }
  // 某年的当前时间
  else if (/(year)$/.test(value)) {
    return new Date(new Date().setFullYear(dateValue))
  }
  // 某年的开始时间
  else if (/(years)$/.test(value)) {
    return new Date(new Date(new Date().setFullYear(dateValue, 0, 1)).setHours(0, 0, 0, 0))
  }
  // 某年的结束时间
  else if (/(yeare)$/.test(value)) {
    return new Date(new Date(new Date().setFullYear(dateValue, 11, 31)).setHours(23, 59, 59, 999))
  }
  return null
}

/**
 * 解析某个对象属性的文本内容
 * @param path 
 * @param env 
 * @returns 
 */
export function parseContent (path: string, env: Record<string, any>) {
  let val = get(env, path, '')
  return val.split('\n').join('\n\n').replace(/\"/g, '\\"')
}

/**
 * 映射对象
 * @param props 
 */
export function parseProps<T extends {}> (props?: Record<string, string>) {
  return (data: Record<string, any>) => {
    if (!props) return data as T
    let result = data
    let keys: string[] = []
    for (let [key, val] of Object.entries(props)) {
      result[key] = /(\{)/.test(val) ? parseTemplate(val, data) : get(data, val)
      if (key !== val) {
        keys.push(val)
      }
    }
    return omit(result, keys) as T
  }
}

/**
 * 提取日期字面量的值
 * @param value 
 * @returns 
 */
function parseDateString (value: string) {
  let [ label ] = value.split(/\s+/)
  let [ type ] = value.match(/(year|month|day|week)/) ?? []
  let date = {
    day: 0,
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  }
  let val: number = date?.[type!] ?? 0
  if (/(\d+){4}/.test(label)) {
    val = Number(label)
  }
  else if (!isNaN(Number(label))) {
    val += Number(label)
  }
  return val
}

/**
 * 为 MouseEvent 添加 path
 * @param evt 
 * @returns 
 */
export function parseMouseEvent (evt: MouseEvent & { path?: EventTarget[] }) {
  if (evt.path) {
    return evt
  }
  let target = <Node> evt.target
  evt.path = []
  while (target.parentNode !== null) {
    evt.path.push(target)
    target = target.parentNode
  }
  evt.path.push(document, window)
  return evt
}

/**
 * 转换格式化字符串
 * @param props 
 * @returns 
 */
export function toFormatString (props?: Partial<Record<keyof PropDataItem, string>>) {
  return (data: Record<string, any>, format: string = '{label}') => {
    if (props) {
      for (let item in Object.keys(props)) {
        if (props?.[item]) {
          format = format.replace(new RegExp(`{${item}}`, 'g'), `{${props?.[item]}}`)
        }
      }
    }
    return template(format, { interpolate: /{([\s\S]+?)}/g })(data)
  }
}