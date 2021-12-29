#### Proxy 和 Reflect 可以拿来实现 元编程
new Proxy(原对象(函数也可以),handler(get,set...))
```js
var obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log("get", propKey, target, receiver);
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log("set", propKey, target, value, receiver);
      return Reflect.set(target, propKey, value, receiver);
    },
  }
);

```

#### 用法
1. obj 可作为其他对象的 原型对象,结合`Object,create`  


#### handler 可以拦截多少种操作 
1. get   
2. set  
3. deleteProperty   
4. apply  
5. ownKeys    
6. has  
7. construct   
8. preventExtensions    
9. isExtensible  
10. getPrototypeOf   
11. setPrototypeOf   
12. getOwnPropertyDescriptor   
13. defineProperty  
