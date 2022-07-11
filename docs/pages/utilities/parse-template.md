# parseTemplate

解析字符串模版

## Typescript

```ts
function parseTemplate (tpl: string, context: object, opts?: nunjucks.ConfigureOptions): string
```

## Example

```ts
import { parseTemplate } from '@kenote/element-ui'
import nunjucks from 'nunjucks'

// 默认关闭自动转义
parseTemplate(tpl, context)

// 关闭自动转义
parseTemplate(tpl, context, { autoescape: false })

// 打开自动转义
parseTemplate(tpl, context, { autoescape: true })
```
