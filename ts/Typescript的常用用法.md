### 值得注意的地方
1. interface既可以定义对象的shape,也可以定义函数的shape  
#### 对象shape
就是可选属性,任意属性,可以有多个任意属性,但是同类型的只能有一个
```ts
// 这是可以的
interface Test{
    [p1:string]:string,
    [p2:number]:string,
}
```
#### 函数shape
就是限制输入输出类型,参数个数,返回值类型
```ts
interface TestFunc{
    (x: number, y:number):string;
}

```

#### 函数各种参数
一般来说,可选参数后面不能有必须参数;  
默认参数,ts会识别为可选参数,默认参数后面可以跟必须参数;(要想使用默认参数,可传undefined)  
剩余参数, `...rest`,这样子,只能是最后一个参数

### 访问属性的符号
```js
let obj = {name:'bob',age:12}
// 1. ?.
console.log(obj?.name)  //真实值或者undefined
// 2. !.
console.log(obj!.name)  //强制告诉编译器他有name属性,实际有没有不好说

// 3. ??     a ?? b  a如果是null或者undefined,返回b,否则a    和 || 有一些区别
console.log(null ?? 12)     // 12
console.log(undefined ?? 12)   // 12
console.log(0 ?? 12)         // 0 
console.log('' ?? 12)         // ''



```












