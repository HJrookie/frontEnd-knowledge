### CSRF Cross Site Requet Forgery 跨站请求伪造  
用户登陆了页面A,生成了一个Cookie,在浏览器里保存着.  
有在另一个标签页访问了页面B,这个页面中有一些攻击性js代码,并发出一个请求访问A,  
这个请求会带上用户的cookie,去做一些危险的操作;  
这种第三方网站引导发出的Cookie,就称为第三方Cookie,  
除了用于CSRF攻击,还用户用户追踪;  
比如，Facebook 在第三方网站插入一张看不见的图片。
```html
<img src="facebook.com" style="visibility:hidden;">
```
这样子,浏览器加载的时候,就会向facebook发送带有cookie的请求,  
facebook就知道你是谁,访问了什么网站;
### 防御  
1. 验证Referer,记录了请求的来源.最简单,所有敏感的操作的请求都去验证一下Referer,  
但是如果Referer被篡改,在ie6上,Referer是可以被篡改的.  
2. token验证  

3. 将token带到http自定义header里去,
4. sameSite属性.  


### 一些讨论 

对的，domain 是由服务端设置的，这个 domain 和当前浏览器的 url 是没有关系的，是指代请求地址的域名，例如 https://api.com/update 这个接口可以设置 Cookie 在 api.com 这个 domain 下面。但是并不妨碍你在你的 https://web.com 网站里面使用这个接口，使用的时候，因为你这个接口仍然是发给 api.com 的，所以当然要把 api.com 下的 Cookie 带上。但是这就如文章中所说，给了 CSRF 可乘之机，所以又加上了 SameSite 属性。  

SameSite 属性就是用来限制当前页面的 url 的 domain 要和 Cookie 的 domain 同源（也有其他的设置，这是最严格模式）。这样就杜绝了 CSRF

### SameSite
可以防止CSRF攻击,限制第三方Cookie;
可以设置三个值,Strict,Lax,None;  
#### Strict
最严格,完全禁止第三方Cookie,跨站点时,任何情况都不会发送Cookie;  
换言之,只有当前网页url和目标一致时,才会带上cookie;  
这种过于严格.  
跨子域(设置withCrendential)携带主域的cookie仍然可以
#### Lax 
稍微放宽一些规则,大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。  
链接,  
跨子域(设置withCrendential)携带主域的cookie仍然可以
```html
<a href="..."></a>  a标签
```  
预加载,
```html
<link rel="prerender" href="..."/>
```  
get表单  
```html
<form method="GET" action="...">
```
会发送cookie.  
post表单,iframe,ajax,image不会发送  

#### None
Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。  
不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
```js
Set-Cookie: widget_session=abc123; SameSite=None; Secure //是有效的
Set-Cookie: widget_session=abc123; SameSite=None;   //无效的
```










