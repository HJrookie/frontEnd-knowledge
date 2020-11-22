#### any
any 意味着编译器不检查类型,允许访问它上面的任何属性或者方法(可能它并没有这个属性或方法) ,一般在使用第三方库的时候可能发生  
```js
let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;   // d 也是 any 类型. 但是如何在这种情况下获取到准确的类型
```
#### null Undefined
默认情况,null,undefined是所有其它类型的子类型  
开启`--strictNullChecks`时,null,undefined 只能复制给  unknown,any,以及他们的自身;  
此外,undefined 可以复制给 void;  

#### never 做一些检查
一个函数 always throws an exception or one that never returns(死循环)  







