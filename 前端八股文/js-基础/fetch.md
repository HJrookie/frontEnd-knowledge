### fetch是啥
fetch用来替代XmlHttpRequest对象的,提供了一个获取资源的接口,包括跨域的请求;  
会返回一个promise,然后.then或者.catch去进行后续操作.
### 特点  
1. 404,或者500的话,它还是resolve的状态,但是resolve的ok属性是false;  
只有当网络错误,或者请求被阻止时,才是error;  
2. fetch由CSP的connect-src属性控制.而不是它请求的资源;  
### 概念和用法
fetch(一个url,可选的init配置项)  
或者是fetch(Request对象)  
```js
//例1:  
let url = "https://api.github.com/users"
let myInit = {
    mwthod:'GET',
    headers:{'Content-Type','image/jpeg'},
    mode:'cors',
    cache:'default'
}
fetch(url,myInit)
.then(res=>{

})
// 例子2
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
let req = new Request(url,myInit);
fetch(req)
.then(res=>{console.log(res.ok)})
```




### fetch的成功判定  
需要判断promise.ok === true 和 promise是否被resolve  



### 和ajax的区别  
1.当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。  
2. fetch可以接受跨域cookies;你也可以使用fetch简历跨域会话,  
3. fetch不会发送cookies,除非使用credentials的初始化选项.

### credentials属性配置
为了让浏览器发送包含凭据的请求（即使是跨域源），要将credentials: 'include'添加到传递给 fetch()方法的init对象。
```js
fetch('https://example.com', {
  credentials: 'include'  
})
// 如果是 想让请求url和调用的脚本在同一个源,将credentials设置为same-origin 
// 不想带凭据, 设置为  omit
```
### note
resonse.json()  
response.arrayBuffer()
blob() text()  formData()


post例子:  
```js
let data = {
    name:'test',
    age:12
}
fetch(url,{
    method:'POST',
    body:data,
    headers:{
        'Content-Type':'application/json'
    }
})
```
### init对象
[详见这里](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
init对象可以配置的东西有哪些:  
method,credentials,mode,body,headers,cache,redirect,referrer,referrerPolicy,integrity  
mode有三个选项,same-origin,cors,no-cors  
same-origin:不允许跨域,遵守同源策略;否则返回error,response的type是baseic;  
cors:支持跨域,response type是cors  
no-cors,用于跨域,适用于server不支持cors,比较特殊,type是opaque;
可以发送跨域请求,但是不能访问响应的内容,body是null(不明白可以干嘛)









