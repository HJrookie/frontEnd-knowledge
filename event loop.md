### 背景知识
1. js是单线程的  
2. 所有任务分为同步的任务,和异步的  
3. 同步的任务在主线程做,异步的任务放到任务队列里去,当异步的任务做完后,通知主线程,且主线程闲着的时候,异步任务才能进入主线程 
4. 任务队列里除了IO,还有用户操作的事件,ajax也在,定时器也会在 
5. 异步任务必须指定回调,当主线程开始执行异步任务,就是执行它的回调
6. 定时器在任务队列里比较特殊,主线程会检查它等待的时间,到了规定的时间,才能被主线程执行  
7. 左边的叫执行上下文栈,右边叫任务队列  
8. setTImeout(f,0),就是立即把这个函数添加到任务队列里,当主线程一个一个把任务队列里前面的事儿,做完了,就轮到他了  
   


### Node环境中的Event Loop
这里面多了nextTick 和 SetImmediate方法  
nextTick是在下次Event Loop之前(在主线程读取任务队列之前执行)执行,就是在所有异步任务之前.  
SetImmediate方法和SetTImeOut(f,0)比较像  
例子: 
```js
process.nextTick(function A() {  //这里先执行
  console.log(1);
  process.nextTick(function B(){console.log(2);}); // 这里也先执行
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED
```
就算有多个nextTick还是会在人物队列之前执行,

## 微任务,宏任务
macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
microtasks: process.nextTick, Promise, **MutationObserver**  
#### 执行顺序 
先把微任务里面的执行完,就算里面东西很多,事儿很多.promise.then会一直在微任务中,nextTIck也是  
然后再去执行宏任务中的东西;微任务优先级最高;  
> 换句话说,JS 的 event loop 执行时会区分 task 和 microtask，引擎在每个 task 执行完毕，从队列中取下一个 task 来执行之前，会先执行完所有 microtask 队列中的 microtask。
#### 为啥要用 microtask？  
根据HTML Standard，在每个 task 运行完以后，UI 都会重渲染，  
那么在 microtask 中就完成数据更新，当前 task 结束就可以得到最新的 UI 了。  
反之如果新建一个 task 来做数据更新，task运行完再更新ui,那么渲染就会进行两次。  
（当然，浏览器实现有不少不一致的地方，上面 Jake 那篇文章里已经有提到。）


### 终极例子
```js
console.log(1)
Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log("2")  // 这里比3要快,
  }).then(() => {
    sleep(3);
    console.log(6)  //这里在Promis最后,比settim快
  }) //这里没有sleep,还是会先打印3,在打印6,应该还是把.then里面的加到micro队列尾部了
}).then(() => {
  console.log("3") //这里比6快,即比上一个.then里面的promise.then先执行
})
console.log(4)

let r = setTimeout(() => {
  console.log(5)
}, 100)

function sleep(delay) {
  let time = new Date();
  while (new Date() - time < delay * 1000) {}
}

// 1
// 4
// 2
// 3
// 等了3秒
// 6 
// 等了0.1秒
// 5 
```

#### 例子2
```js
console.log(1)
Promise.resolve().then(()=>{
   
    console.log(2)

}).then(()=>{
    setTimeout(()=>{
    console.log(5)
},0)
})
console.log(3)
setTimeout(()=>{
    console.log(4) //这里的要比.then里的setTimeout块
},0)

// 1 3 2 4 5
```

#### 例子3
```js
console.log(1)
Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log("2")  // 这里第 1
  }).then(() => {
    
    console.log(6)  // 第3
  }) 
}).then(() => {
  console.log("3")   // 第 2

Promise.resolve().then(() => {
    console.log("7")  // 第4
  }).then(() => {
    console.log(8)  //第5
  }) 
})
console.log(4)

let r = setTimeout(() => {
  console.log(5)
}, 0)

function sleep(delay) {
  let time = new Date();
  while (new Date() - time < delay * 1000) {}
}
// 1 4 2 3 6 7 8 5 
```

