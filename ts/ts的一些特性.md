### recursive type references 递归类型引用
[recursive type references](https://github.com/microsoft/TypeScript/pull/33050)

```typescript
type ValueOrArray<T> = T | Array<ValueOrArray<T>>;

const a0: ValueOrArray<number> = 1;
const a1: ValueOrArray<number> = [1, [2, 3], [4, [5, [6, 7]]]];

type HypertextNode = string | [string, { [key: string]: any }, ...HypertextNode[]];

const hypertextNode: HypertextNode =
    ["div", { id: "parent" },
        ["div", { id: "first-child" }, "I'm the first child"],
        ["div", { id: "second-child" }, "I'm the second child"]
    ];

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

let data: Json = {
  caption: "Test",
  location: { x: 10, y: 20 },
  values: [0, 10, 20]
}
```
