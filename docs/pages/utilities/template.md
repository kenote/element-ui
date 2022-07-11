# 模版语法

基于 `Nunjucks` 模板引擎创建

## 变量

变量会从模板上下文获取
```ts
// 如果变量的值为 undefined 或 null 将不显示

/**
 * { username: "admin" }
 */
{{ username }}

/**
 * {
 *   foo: {
 *     bar: 3
 *   }
 * }
 */
{{ foo.bar }}
{{ foo["bar"] }}
```

## 过滤器

过滤器是一些可以执行变量的函数，通过管道操作符 (|) 调用，并可接受参数。
```ts
{{ foo | title }}
{{ foo | join(",") }}
{{ foo | replace("foo", "bar") | capitalize }}
```

### 标签

标签是一些特殊的区块，它们可以对模板执行一些操作。

### `if`

`if` 为分支语句，与 javascript 中的 `if` 类似。
```ts
{% if variable %}
  It is true
{% endif %}
```

如果 `variable` 定义了并且为 true (译者注：这里并非布尔值，和 javascript 的处理是一样的) 则会显示 "It is true"，否则什么也不显示。
```ts
{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}
```

### `for`

`for` 可以遍历数组 (arrays) 和对象 (dictionaries)。
```ts
// 遍历数组
// items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}]
// 如果`items`数组是空数组的话则会渲染else语句中的内容
{% for item in items %}
  {{ item.title }}
{% else %}
  This would display if the 'item' collection were empty
{% endfor %}

// 遍历对象
// food = {
//   'ketchup': '5 tbsp',
//   'mustard': '1 tbsp',
//   'pickle': '0 tbsp'
// }
{% for ingredient, amount in food %}
  Use {{ amount }} of {{ ingredient }}
{% endfor %}

// 数组分解
// points = [[0, 1, 2], [5, 6, 7], [12, 13, 14]]
{% for x, y, z in points %}
  Point: {{ x }}, {{ y }}, {{ z }}
{% endfor %}
```

在循环中可获取一些特殊的变量

- `loop.index`: 当前循环数 (1 indexed)
- `loop.index0`: 当前循环数 (0 indexed)
- `loop.revindex`: 当前循环数，从后往前 (1 indexed)
- `loop.revindex0`: 当前循环数，从后往前 (0 based)
- `loop.first`: 是否第一个
- `loop.last`: 是否最后一个
- `loop.length`: 总数

### `set`

`set` 可以设置和修改变量。
```ts
{{ username }}
{% set username = "joe" %}
{{ username }}

// 可以设置新的变量，并一起赋值
{% set x, y, z = 5 %}
```

### `raw`

如果你想输出一些 Nunjucks 特殊的标签 (如 `{{`)，可以使用 `{% raw %}` 将所有的内容输出为纯文本。
```ts
{% raw %}
{{ username }}
{% endraw %}
```

### `filter`

`filter`区块允许我们使用区块中的内容来调用过滤器。不同于使用`|`语法，它会将区块渲染出的内容传递给过滤器。
```ts
{% filter title %}
may the force be with you
{% endfilter %}

{% filter replace("force", "forth") %}
may the force be with you
{% endfilter %}
```

## 空白字符控制

模板在正常情况会将变量 (variable) 和标签区块 (tag blocks) 周围的空白字符完全输出。有时，你不想输出一些额外的空白字符，但代码又需要一些空白字符来显得整洁。

你可以在开始和结束区块 (start or end block tag) 添加 (`-`) 来去除前面和后面的空白字符。
```ts
{% for i in [1,2,3,4,5] -%}
  {{ i }}
{%- endfor %}
```
上面准确的输出为 "12345"，`-%}` 会去除标签右侧的空白字符，`{%-` 会去除标签之前的空白字符。

## 表达式

你可以使用和 javascript 一样的字面量。

### 运算 (Math)

Nunjucks 支持运算 (但尽量少用，把逻辑放在代码中)，可使用以下操作符：

- Addition: `+`
- Subtraction: `-`
- Division: `/`
- Division and integer truncation: `//`
- Division remainder: `%`
- Multiplication: `*`
- Power: `**`

```ts
{{ 2 + 3 }}       (outputs 5)
{{ 10/5 }}        (outputs 2)
{{ numItems*2 }}
```

### 比较 (Comparisons)

- `==`
- `===`
- `!=`
- `!==`
- `>`
- `>=`
- `<`
- `<=`

```ts
{% if numUsers < 5 %}...{% endif %}
{% if i == 0 %}...{% endif %}
```

### Logic

- `and`
- `or`
- `not`
- 可使用大括号来分组

```ts
{% if users and showUsers %}...{% endif %}
{% if i == 0 and not hideFirst %}...{% endif %}
{% if (x < 5 or y < 5) and foo %}...{% endif %}
```

### If 表达式

和 javascript 的三元运算符 (ternary operator) 一样，可使用 if 的内联表达式：
```ts
{{ "true" if foo else "false" }}
```

### 函数调用 (Function Calls)

如果你传入一个函数，则可以直接调用
```ts
{{ foo(1, 2, 3) }}
```

### 正则表达式

你可以像在JavaScript中一样创建一个正则表达式:
```ts
{{ /^foo.*/ }}
{{ /bar$/g }}
```

## 自动转义 (Autoescaping)

如果在环境变量中设置了 autoescaping，所有的输出都会自动转义，但可以使用 `safe` 过滤器，Nunjucks 就不会转义了。
```ts
{{ foo }}           // &lt;span%gt;
{{ foo | safe }}    // <span>
```

如果未开启 autoescaping，所有的输出都会如实输出，但可以使用 `escape` 过滤器来转义。
```ts
{{ foo }}           // <span>
{{ foo | escape }}  // &lt;span&gt;
```

## 全局函数 (Global Functions)

以下为一些内置的全局函数

### range([start], stop, [step])

如果你需要遍历固定范围的数字可以使用 `range`，`start` (默认为 0) 为起始数字，`stop` 为结束数字，`step` 为间隔 (默认为 1)。
```ts
{% for i in range(0, 5) -%}
  {{ i }},
{%- endfor %}
```

### cycler(item1, item2, ...itemN)

`cycler` 可以循环调用你指定的一系列的值。
```ts
{% set cls = cycler("odd", "even") %}
{% for row in rows %}
  <div class="{{ cls.next() }}">{{ row.name }}</div>
{% endfor %}
```

上面的例子中奇数行的 class 为 "odd"，偶数行的 class 为 "even"。你可以使用`current`属性来获取当前项（在上面的例子中对应`cls.current`）。

### joiner([separator])

当合并多项的时候，希望在他们之间又分隔符 (像逗号)，但又不希望第一项也输出。`joiner` 将输出分割符 (默认为 ",") 除了第一次调用。
```ts
{% set comma = joiner() %}
{% for tag in tags -%}
  {{ comma() }} {{ tag }}
{%- endfor %}
```

如果 `tags` 为 `["food", "beer", "dessert"]`, 上面将输出 `food, beer, dessert`。

## 内置的过滤器

Nunjucks已经实现了jinja中的大部分过滤器，同时也新增了一些属于自己的过滤器。

### `abs`

返回绝对值
```ts
{{ -3 | abs }}
```

### `batch`

对数组分段
```ts
{% set items = [1,2,3,4,5,6] %}
{% set dash = joiner("-") %}
{% for item in items | batch(2) %}
  {{ dash() }} {% for items in item %}
    {{ items }}
  {% endfor %}
{% endfor %}
```

### `capitalize`

首字母大写，其余小写
```ts
{{ "This Is A Test" | capitalize }}
```

### `default(value, default, [boolean])`

(简写为 `d`)

如果`value`全等于`undefined`则返回`default`，否则返回`value`。 如果`boolean`为true，则会在`value`为JavaScript中的假值时（比如：false, ""等）返回`default`。
```ts
{{ value | d('--') }}
```

### `dictsort`

对 dict 和 yield (key, value) 对进行排序：
```ts
{% set items = {
  'e': 1,
  'd': 2,
  'c': 3,
  'a': 4,
  'f': 5,
  'b': 6
} %}
{% for item in items | dictsort %}
  {{ item[0] }}
{% endfor %}
```

### `dump`

调用`JSON.stringify`一个对象并将结果转储到模板中。
```ts
{% set items = ["a", 1, { b : true}] %}
// 默认
{{ items | dump }}
// 使用2个空格格式化
{{ items | dump(2) }}
// 使用制表符格式化
{{ items | dump('\t') }}
```

### `escape`

(简写为 `e`)

将字符串中的字符 &、<、>、' 和 ' 转​​换为 HTML 安全序列。如果您需要在 HTML 中显示可能包含此类字符的文本，请使用此选项。将返回值标记为标记字符串
```ts
{{ "<html>" | escape }}
```

### `first`

获取数组或字符串的第一个元素/字母
```ts
{% set items = [1,2,3] %}
{{ items | first }}

{% set word = 'abc' %}
{{ word | first }}
```

### `float`

将值转换为浮点数。如果转换失败，则返回 0.0。可以使用第一个参数覆盖此默认值。
```ts
{{ "3.5" | float }}
```

### `groupby`

按公共属性对一系列对象进行分组：
```ts
{% set items = [
    { name: 'james', type: 'green' },
    { name: 'john', type: 'blue' },
    { name: 'jim', type: 'blue' },
    { name: 'jessie', type: 'green' }
  ]
%}

{% for type, items in items | groupby("type") %}
  {{ type }} :
  {% for item in items %}
    {{ item.name }}
  {% endfor %}
{% endfor %}

// 属性可以使用点符号来使用嵌套属性，例如date.year.
{% set posts = [
    {
      date: {
        year: 2019
      },
      title: 'Post 1'
    },
    {
      date: {
        year: 2018
      },
      title: 'Post 2'
    },
    {
      date: {
        year: 2019
      },
      title: 'Post 3'
    }
  ]
%}

{% for year, posts in posts | groupby("date.year") %}
  :{{ year }}:
  {% for post in posts %}
    {{ post.title }}
  {% endfor %}
{% endfor %}
```

### `indent`

使用空格缩进字符串。默认行为是不缩进第一行。默认缩进为 4 个空格。
```ts
{{ "one\ntwo\nthree" | indent }}

// 使用 6 个空格缩进
{{ "one\ntwo\nthree" | indent(6) }}

// 使用 6 个空格缩进；并首行缩进
{{ "one\ntwo\nthree" | indent(6, true) }}
```

### `int`

将值转换为整数。如果转换失败，则返回 0。
```ts
{{ "3.5" | int }}
```

### `join`

返回一个字符串，它是序列中字符串的串联：
```ts
{% set items =  [1, 2, 3] %}
{{ items | join }}

// 默认情况下，元素之间的分隔符是一个空字符串，可以使用可选参数定义：
{% set items = ['foo', 'bar', 'bear'] %}
{{ items | join(",") }}

// 适应数组集合
{% set items = [
  { name: 'foo' },
  { name: 'bar' },
  { name: 'bear' }]
%}
{{ items | join(",", "name") }}
```

### `last`

获取数组或字符串的最后一个元素/字母
```ts
{% set items = [1,2,3] %}
{{ items | last }}

{% set word = 'abc' %}
{{ word | last }}
```

### `length`

返回数组或字符串的长度，或对象中的键数：
```ts
{{ [1,2,3] | length }}
{{ "test" | length }}
{{ {key: value} | length }}
```

### `list`

将值转换为列表。如果它是一个字符串，则返回的列表将是一个字符列表。
```ts
{% for i in "foobar" | list %}{{ i }},{% endfor %}
```

### `lower`

将字符串全部转换为小写：
```ts
{{ "fOObAr" | lower }}
```

### `random`

从数组中选择一个随机值。（每次刷新页面时都会更改）。
```ts
{{ [1,2,3,4,5,6,7,8,9] | random }}
```

### `reject`

通过对每个对象应用测试并拒绝测试成功的对象来过滤一系列对象。

如果未指定测试，则每个对象都将被评估为布尔值。
```ts
{% set numbers=[0, 1, 2, 3, 4, 5] %}

{{ numbers | reject("odd") | join }}
{{ numbers | reject("even") | join }}
{{ numbers | reject("divisibleby", 3) | join }}
{{ numbers | reject() | join }}
```

### `rejectattr`（仅单参数形式）

通过对每个对象的指定属性应用测试来过滤一系列对象，并拒绝测试成功的对象。

这与`selectattr`过滤器相反。

如果未指定测试，则属性的值将被评估为布尔值。
```ts
{% set foods = [{tasty: true}, {tasty: false}, {tasty: true}]%}
{{ foods | rejectattr("tasty") | length }}
```

### `replace`

替换字符

```ts
// 用另一个替换一个项目。第一项是要替换的项，第二项是替换的值。
{% set numbers = 123456 %}
{{ numbers | replace("4", ".") }}
// -> 123.56

// 在值之前和之后插入替换的项目，方法是添加引号并替换它们周围的项目
{% set letters = aaabbbccc%}
{{ letters | replace("", ".") }}
// -> .a.a.a.b.b.b.c.c.c.

// 直到给定数量的项目的每个实例（要替换的项目，要替换的项目，要替换的数量）
{% set letters = "aaabbbccc" %}
{{ letters | replace("a", "x", 2) }}
// -> xxabbbccc

// 可以在列表中搜索要替换的模式
{% set letters = "aaabbbccc" %}
{{ letters | replace("ab", "x", 2) }}
// -> aaxbbccc
```

### `reverse`

反转字符串
```ts
{{ "abcdef" | reverse }}

// 反转数组
{% for i in [1, 2, 3, 4] | reverse %}
    {{ i }}
{% endfor %}
```

### `round`

四舍五入
```ts
{{ 4.5 | round }}

// 四舍五入到最接近的整数（向下舍入）
{{ 4 | round(0, "floor") }}

// 指定要四舍五入的位数
{{ 4.12346 | round(4) }}
```

### `select`

通过对每个对象应用测试并仅选择测试成功的对象来过滤一系列对象。

如果未指定测试，则每个对象都将被评估为布尔值。
```ts
{% set numbers=[0, 1, 2, 3, 4, 5] %}

{{ numbers | select("odd") | join }}
{{ numbers | select("even") | join }}
{{ numbers | select("divisibleby", 3) | join }}
{{ numbers | select() | join }}
```

### `selectattr`（仅单参数形式）

通过对每个对象的指定属性应用测试来过滤一系列对象，并且只选择测试成功的对象。

这与`rejectattr`.

如果未指定测试，则属性的值将被评估为布尔值。
```ts
{% set foods = [{tasty: true}, {tasty: false}, {tasty: true}]%}
{{ foods | selectattr("tasty") | length }}
```

### `slice`

切片迭代器并返回包含这些项目的列表列表
```ts
{% set arr = [1,2,3,4,5,6,7,8,9] %}

<div class="columwrapper">
  {%- for items in arr | slice(3) %}
    <ul class="column-{{ loop.index }}">
    {%- for item in items %}
      <li>{{ item }}</li>
    {%- endfor %}
    </ul>
  {%- endfor %}
</div>
```

### `sort(arr, reverse, caseSens, attr)`

`arr`使用 JavaScript 的`arr.sort`函数进行排序。如果`reverse`为真，结果将相反。Sort 默认情况下不区分大小写，但设置`caseSens` 为 true 使其区分大小写。如果`attr`通过，`attr`将从每个项目进行比较。
```ts
{{ [ 3, 1, 5 ] | sort }}
{{ [ 3, 1, 5 ] | sort(true) }}

{% set items = [{ id: 3 }, { id: 1 }, { id: 5 }] %}
{% for item in items | sort(false, true, 'id') %}
  {{item.id}}
{% endfor %}
```

### `string`

将对象转换为字符串
```ts
{% set item = 1234 %}
{% for i in item | string | list %}
    {{ i }},
{% endfor %}
```

### `sum`

输出数组中项目的总和
```ts
{% set items = [1,2,3] %}
{{ items | sum }}
```

### `title`

使字符串的第一个字母大写
```ts
{{ "foo bar baz" | title }}
```

### `trim`

去除前导和尾随空格
```ts
{{ "  foo " | trim }}
```

### `truncate`

返回字符串的截断副本。长度由第一个参数指定，默认为 255。如果第二个参数为 true，过滤器将按长度剪切文本。否则它将丢弃最后一个单词。如果文本实际上被截断，它将附加一个省略号（“...”）。可以使用第三个参数指定与“(...)”不同的省略号。
```ts
// 截断为 3 个字符
{{ "foo bar" | truncate(3) }}

// 截断为 6 个字符并将“...”替换为“？”
{{ "foo bar baz" | truncate(6, true, "?") }}
```

### `upper`

将字符串转换为大写
```ts
{{ "foo" | upper }}
```

### `urlencode`

转义字符串以在 URL 中使用，使用 UTF-8 编码。接受字典和常规字符串以及成对的可迭代对象。
```ts
{{ "&" | urlencode }}
```

### `wordcount`

计算并输出字符串中的单词数
```ts
{% set foo = "Hello World" %}
{{ foo | wordcount }}
```

## 自定义过滤器

### `parseDate`

将字面量字符串转换 `Date`

```ts
{{ 'now' | parseDate }}
```