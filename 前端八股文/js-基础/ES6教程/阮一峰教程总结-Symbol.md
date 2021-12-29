#### 一些点
1. 它是基本数据类型. 其他的 bool,string,number, null,undefined,object,synbol,bigint   
2. 不可以 new,   
3. Symbol(1).toString()  // "Symbol(1)", 但是不直观,因此有了 description 属性  

#### 静态属性
```js
const ss = Symbol(1);
ss.description  // "1"
```
#### 作为对象的 key
```js
var obj = {
// 这两个 symbol 是不一样的
  [Symbol(1)]:33,  
  [Symbol(1)]:33
}
key 是 symbol 的话,是不能用 `a.k`的方式访问的,这个 k,是字符串  
```
#### 作为 唯一标识,
```js
const color = {
  RED: Symbol('RED'),
  BLUE: Symbol("BLUE")
};
color.RED === color.RED;  // true
```
#### Object.getOwnPropertySymbols()
Symbol类型的 key,只有两个方法可以获得 key; `Reflect.ownKeys 和 Object.getOwnPropertySymbols `

#### Symbol.for()  Symbol.keyFor()  
for 这个方法, 会在全局环境搜索目前是否有相同的 key,如果有,就不再创建了.Symbol()每次都创建  
全局的特性,可以跨 iframe, 或者 多 service worker 中取到相同的值
```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```




