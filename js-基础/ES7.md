### async,await
await只能用在async函数中,用在其他地方报错  
async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。  
当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。  
promise 返回的promise如果有错误,最好用try catch,  
[写得不错的](https://www.cnblogs.com/yuanyingke/p/10280681.html)


### try catch 结合 async await 和 fetch
这么搞挺有意思的
```js
async function test(){
    try{
    let response = await fetch('https://api.github.com/users')
    let data = await response.json();   //response.json()方法返回的是一个promise
    console.log(data)
}catch(e){
    console.log('error',e)
}
    
}

 test();
```