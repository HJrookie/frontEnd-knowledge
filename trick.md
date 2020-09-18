```js
Array.from({length})
Array(length)

// 执行一段代码很多次
function doSomething(func,count){
    Array(count).fill().map(()=>{
        func()
})
}

function test(){
    console.log(1)
}
doSomething(test,20)
```
