# toFormtString

转换格式化字符串

## Typescript

```ts
function toFormatString (props?: Partial<Record<keyof PropDataItem, string>>): (data: Record<string, any>, format?: string) => string
```

## Example

```ts
import { toFormatString } from '@kenote/element-ui'

const data = {
  key: '1',
  name: '名称'
}

toFormatString()(data, '{name}')
// => 名称

toFormatString({ label: 'name' })(data, '{key}-{label}')
// => 1-名称
```