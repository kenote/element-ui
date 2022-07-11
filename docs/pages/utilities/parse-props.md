# parseProps

映射 `object` 对象的键值

## Typescript

```ts
/**
 * props -- 映射表
 */
function parseProps(props: Record<string, string>): (data: Record<string, any>) => Record<string, any>
```

## Example

```ts
import { parseProps } from '@kenote/element-ui'

const data = [
  { 
    key: 'key', 
    name: 'name',
    description: 'description'
  }
]

conat props = {
  value: 'name'
}

data.map( parseDate(props) )
```