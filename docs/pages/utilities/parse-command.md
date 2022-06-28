# parseCommand

解析字符串指令

## Typescript

```ts
function parseCommand<T> (value: string, tag?: string): Command.value<T> | null

Command.value<T> {
  type     : 'dialog' | 'action' | 'command' | 'router' | 'http' | T
  path     : string
}
```

## Example

```ts
import { parseCommand, Command } from '@kenote/element-ui'

let command: Command.value | null = null

// 解析 URL
command = parseCommand('https://www.baidu.com')
// => { type: 'http', path: 'https://www.baidu.com' }

// 解析 路由
command = parseCommand('router:/home')
// => { type: 'router', path: '/home' }

// 解析 指令; 预设 action | command | dialog 指令
command = parseCommand('command:logout')
// => { type: 'command', path: 'logout' }

// 解析自定义指令
command = parseCommand('cli:update', 'cli')
// => { type: 'cli', path: 'update' }

// 无法解析的tag
command = parseCommand('test')
// => null
```

