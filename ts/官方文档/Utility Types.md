### 1. Record
```typescript
type User = {
 name : string;
 age : number;
}
type RecordTest =  Record< 'a' | 'b' | 'c' ,User>;

// 结果
type RecordTest = {
    a: User;
    b: User;
    c: User;
}
```

#### enum 可以用 Record 来定义 shape
```typescript
function parseEnum(value: Record<string,string|number>){}


### 2. Extract<Type, Union>  
最终结果是 Type 上可以 赋值到 Union 上的 type
```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
//    ^ = type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>;
//    ^ = type T1 = () => void
```

### 3. Exclude<Type, ExcludedUnion>
Exclude<A, B> 相当于是 A-B. A 减去 `A ∩ B`  

```typescript
type T3 = Exclude<1|2|3|4,3|4|5|6>;    // 1 | 2
```
