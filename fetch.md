### fetch
fetch和ajax区别:  
1. 收到代表错误的状态码时,返回的Promise不会被标记为reject,即使HTTP状态码是  
400,404或者500,Promise状态是resolve,但是resolve的返回值的ok属性设置为false,只有当网络故障,或则好请求被阻止时,才会标记为rejct  
2. fetch不接受寡欲cookies,也不能建立跨域会话,  
3. 不会发送cookie,除非使用了credentials的初始化选项  

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

#### 支持的请求参数
```js
postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
```