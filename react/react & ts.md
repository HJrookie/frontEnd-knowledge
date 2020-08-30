### 要注意的点
- function中的参数 ({msg}) 要写成 ({msg}:{msg:any})  
不然:  `Binding element 'msg' implicitly has an 'any' type.`
- in关键字来判断某个key在不在对象里
- 也可以用类型推断
