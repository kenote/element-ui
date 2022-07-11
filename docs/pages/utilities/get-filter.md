# getFilter

获取过滤器

## Typescript

```ts
getFilter(conditions: FilterQuery<any> | string, props?: Record<string, any>): (data: any) => boolean
```

## Example

```ts
import { getFilter } from '@kenote/element-ui'

const data = [
  { name: 'user1', level: 1 },
  { name: 'user2', level: 2 },
  { name: 'user3', level: 3 },
  { name: 'user4', level: 4 },
  { name: 'user5', level: 5 },
]

let filter = getFilter({
  level: {
    $where: value => value < 3
  }
})

data.filter( filter )

let filter = getFilter(`
  level:
    $lt: {{ minLevel }}
`, { minLevel: 3 })

data.filter( filter )
```