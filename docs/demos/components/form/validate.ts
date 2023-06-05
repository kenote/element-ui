
/**
 * 验证比较两次输入的值
 * @param field 
 * @param self 
 * @returns 
 */
export function validCompare (field: string, self?: Record<string, any>) {
  return (rule: any, value: any, callback: (message?: string) => any) => {
    let password = field
    if (self) {
      password = self?.values?.[field]
    }
    let valid = password === value
    if (!valid) {
      return callback(rule?.message??'两次输入的值不一致')
    }
    return callback()
  }
}

/**
 * 验证用户名格式
 * @returns 
 */
export function validUsername () {
  return async (rule: any, value: any, callback: (message?: string) => any) => {
    if (!value) return callback()
    let valid = /^[a-zA-Z]{1}[a-zA-Z0-9\_\-]/.test(value)
    if (!valid) {
      return callback('英文字符开头，5 - 20 个字符；支持小写英文、数字、下划线和中划线组合')
    }
    if (value.length > 20 || value.length < 5) {
      return callback('账号名限定 5 - 20 位字符')
    }
    return callback()
  }
}

/**
 * 验证独特性字段
 * @param field -- 字段名
 * @param exclude -- 需要排除的对象字段；如 `auth._id`
 * @param self -- 关联 Vue 组件对象
 * @returns 
 */
export function validUnique (field: string, exclude: string | null, self?: Record<string, any>) {
  return async (rule: any, value: any, callback: (message?: string) => any) => {
    if (!value) return callback()
    let uniqueFunc = self?.['uniqueMethod']
    if (uniqueFunc) {
      let valid = await uniqueFunc(value, exclude, field)
      if (!valid) {
        return callback(rule?.message)
      }
    }
    return callback()
  }
}