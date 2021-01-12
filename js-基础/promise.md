### 干嘛的
Promise 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值  
### 创建Promise
```js
let promise1 = new Promise((resolve,reject)=>{
    //do something
})
```
## 语法
new Promise( function(resolve, reject) {...} /* executor */  );  

>executor是带有 resolve 和 reject 两个参数的函数 。Promise构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给executor（executor 函数在Promise构造函数返回所建promise实例对象前被调用）。resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，要么调用reject 函数将promise的状态改为rejected。如果在executor函数中抛出一个错误，那么该promise 状态为rejected。executor函数的返回值被忽略。  


promise对象可以像同步方法一样立即返回值,但是并不是立即返回最终执行结果.  
而是返回了一个能代表未来结果的promise对象  
他有三种状态: pending,fulfilled,rejected  

### primise 执行的顺序问题
let promise = new Promise((resolve,reject)=>{

}) 里面的代码是立即执行的, resolve或者 reject 之后,new Promise 中的后续代码还会继续执行  
promise.then()  .then 里面的代码 不会在 resolve 之后立即执行,要等 所有同步代码执行完之后,才会执行    

### promise实例
```js
let p = new Promise((resolve,reject) => {
    reject('reject');
});

let resultP = p.then(null,result => {
    console.log(result);
});

console.log(resultP);

// 结果：
Promise { <pending> }  //这里先打印,执行到这里是,promise还是pending状态的
reject

```
上面的自上往下执行,先打印出promise,在执行.then里的回调,如果一个promise不返回一个东西,或者不resolve,或者reject的话,那么下一个.then接收到的参数是undefined
promise   

### 注意的点
promise.race是有一个resolve,返回的那个promise就resolve  
实际上返回的promise的状态取决于最先被resolve,或者reject的promise  
promise.all 中任意一个被拒绝.其他所有都立即被拒绝  
promise.all 会等到所有都resolve之后,再返回  
.then方法会创建,并且返回一个新的promise,会随着前面Promise的解决而解决,  
.then,.catch都会返回一个promise


### promise.allSettled()
promise.all有个缺点,如果有个reject,其余的都不会执行了,直接退出.
promise.allSettled就是为了解决这个问题  

### promise.any
返回第一个成功的promise,只要有一个promise成功,这个方法终止;  
如果都失败了,它会返回一个AggregateError对象,有个error属性,是所有  
失败值组成的数组  
