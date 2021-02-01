#### 干嘛的
1. 可以获取到 语言内部的方法    
2. 修改一些函数的返回结果,例如`Object.defineProperty` 如果失败,会抛出错误,使用 Reflect.-- 则返回 false    
3. 把一些操作符的操作 变成 函数, 例如 `in => has`  
4. Reflect 相当于保存了 Proxy 可以代理的函数的默认行为, 来供代理时 调用  
