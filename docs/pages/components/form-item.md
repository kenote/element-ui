# FormItem

表单单元模型

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| key | 可以作为是元素的键名 | `string` | -- | -- |
| type | 单元元素的类型 | `string` | -- | -- |
| label | 单元元素的标签 | `string` | -- | -- |
| placeholder | 如果可用，输入框的占位文本 | `string \ string[]` | -- | -- |
| disabled | 单元元素的禁用模式 | `boolean / object / string` | -- | `false` |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | -- | -- |
| size | 如果可用，输入框尺寸 | `string` | `medium / small / mini` | -- |
| readonly | 如果可用，单元元素的只读模式 | `boolean` | -- | `false` |
| format | 输入框字符格式化 | `string` | -- | -- |
| value-format | 输出值进行格式化 | `string` | -- | -- |
| picker-options | 时间日期选择器特有的选项 | `object` | -- | -- |
| data | 用于可多选的选项数据源 | `object[]` | -- | -- |
| porps | 数据源的字段别名 | `object` | -- | -- |
| options | 单元元素的特定选项 | `object` | -- | -- |
| conditions | 单元元素按条件展现 | `object / string` | -- | -- |
| label-width | 单元元素的标签区域宽度 | `number / string` | -- | -- |
| label-options | 单元元素的标签区域选项 | `object` | -- | -- |
| request-options | 数据源使用远程时的`http`配置 | `object` | -- | -- |

## 示例

```yaml
---
- key: username
  type: text
  label: 用户名,
  width: 300,
  placeholder: 请输入用户名
- key: password
  type: password
  label: 密码,
  width: 300,
  placeholder: 请输入密码
  options:
    showPassword: true
```

- ### 数据源

```yaml
---
- key: type
  type: select
  label: 类型
  data:
    - value: 1
      label: 黄金糕
    - value: 2
      label: 双皮奶
    - value: 3
      label: 蚵仔煎
    - value: 4
      label: 龙须面
    - value: 5
      label: 北京烤鸭
```

- ### 远程数据源

```yaml
---
- key: type
  type: select
  label: 类型
  request:
    method: get
    url: http://localhost:4000/user/get-type
```

- ### 字段别名

```yaml
---
- key: type
  type: select
  label: 类型
  data:
    - key: 1
      name: 黄金糕
    - key: 2
      name: 双皮奶
    - key: 3
      name: 蚵仔煎
  props:
    value: key
    label: name
```

- ### 标签区域选项

```yaml
---
- key: findname
  type: text
  label: 查询名称
  width: 300
  placeholder: 请输入查询名称
  labelWidth: 130
  labelOptions: 
    key: findtype
    options:
      username: 用户名
      nickname: 昵称
      email: 电子邮箱
      mobile: 手机号
```