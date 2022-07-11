# parseDate

解析日期时间字面量。

## Typescript

```ts
/**
 * nowValue -- 设置当前时间基点
 **/
function parseDate(value: string | Date, nowValue?: Date | null): Date | null
```

## Example

```ts
import { parseDate } from '@kenote/element-ui'

// 当前时间
parseDate('now')

// 昨天
parseDate('yesterday')

// 今天
parseDate('today')

// 明天
parseDate('tomorrow')

// 前1天
parseDate('-1 day')

// 后1天
parseDate('-1 day')

// 组合使用：上一年的今天的后面第3天开始时间
parseDate('-1 year_3 days')
```

### Porps

| 格式 | 单位 | 当前时间 | 开始时间 | 结束时间 |
| ------ | ------ | ------ | ------ | ------ |
| `day{s\|e}` | 天 | `day` | `days` | `daye` |
| `week{s\|e}` | 周 | `week` | `weeks` | `weeke` |
| `month{s\|e}` | 月 | `month` | `months` | `monthe` |
| `year{s\|e}` | 年 | `year` | `years` | `yeare` |