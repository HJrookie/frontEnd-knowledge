#### 初始状态 pending,然后可以转化为 fulfilled,rejected  
状态转换了之后,就不能再变化了.  
`then 里的函数,需要之前的 promise resolve 或者 reject 之后才能执行,`  
promise resolve 之后, 给它添加 .then , 还是可以执行 then 里的逻辑的  
.then ,catch, finally 都是异步的,放在 微任务队列里  
.then 其实是可以接受两个回调 `.then(()={},()=>{}),不过一般不建议,传第二个`,用 catch 来代替第二个,可以捕获.then的错误    
.finally 总是会返回,正确的值(value 或者 error),   

```js
// 会正确的报错, reject 了3
Promise.reject(3).finally(() => {})
// resolve 的值是 2
Promise.resolve(2).finally(() => {})
```

#### Promise.all
接受一个 promise 的 iterable(array,map,set),返回一个新的 promise, 如果入参不是 promise,先用 Promise.resolve 转化,  
当所有都 resolve,或者某一个 reject 之后,返回结果(resolve 的值的数组,或者 最先 reject 的错误信息)  
`如果参数里的某一个 promise 定义了 .catch 来处理 reject,` 那么如果它 reject 了,不会执行 promise.all 新返回的 值的`.catch`,  
而是 执行 它自身的那个 .catch  

#### Promise.race  
返回最先到达 终结状态的那个 promise 的返回值  

#### Promise.allSettled() 
返回一个 promise,这个 promise 总是 fulfilled,  
```js
const promise  = Promise.allSettled([Promise.resolve(1),Promise.reject(2)]);
promise.then(results=>{
// 这个 results 是个数组.存放了 resolve 或者 reject 的参数  
// [{status:'fulfilled', value: 1 },  {status: 'rejected',reason :2  }  ]
})
```

#### Promise.allSettled() 
有一个成功,返回的 promise 就是 fulfilled 状态. 都失败的时候, 才是 rejected 状态,并且抛出 AggregateError 错误.  
```js
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
```


#### Promise.resolve()  
根据参数不同,表现不同  
1. 参数就是 promise 实例,直接返回它  
2. 参数是 thenable 对象,会将这个对象转化成 promise 对象,然后立即执行它的 then 方法.  
3. 不是对象,或者是个 原始值,返回 resolve 了的 promise  
4. 没有参数, 返回 resolve 了的 promise 
