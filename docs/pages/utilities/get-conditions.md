# getConditions

获取过滤条件

## Typescript

```ts
function getConditions(conditions: FilterQuery<any> | string, props?: Record<string, any>): FilterQuery<any> | null
```

## Example

```ts
import { getConditions } from '@kenote/element-ui'
import ruleJudgment from 'rule-judgment'

const data = [
  { name: 'user1', level: 1 },
  { name: 'user2', level: 2 },
  { name: 'user3', level: 3 },
  { name: 'user4', level: 4 },
  { name: 'user5', level: 5 },
]

let query = getConditions({
  level: {
    $where: value => value < 3
  }
})

data.filter( ruleJudgment(query) )

let query = getConditions(`
  level:
    $lt: {{ minLevel }}
`, { minLevel: 3 })

data.filter( ruleJudgment(query) )
```