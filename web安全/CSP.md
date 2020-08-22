### Content Security Policy
网页安全政策.  白名单
启用CSP有两种方法:  
1. 通过http头信息中的Content-Security-Policy,字段  
2.通过网页的meta标签,  
```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```


### 详解
![图片](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091305.jpg)
再上图中,csp做了以下配置,  
脚本：只信任当前域名  
<object>标签：不信任任何URL，即不加载任何资源  
样式表：只信任cdn.example.org和third-party.org  
框架（frame）：必须使用HTTPS协议加载  
其他资源：没有限制  


### 限制选项  
script-src：外部脚本  
style-src：样式表  
img-src：图像   
media-src：媒体文件（音频和视频）  
font-src：字体文件  
object-src：插件（比如 Flash）  
child-src：框架  
frame-ancestors：嵌入的外部资源（比如<frame>、<iframe>、<embed>和<applet>）  
connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）  
worker-src：worker脚本  
manifest-src：manifest 文件  

字体 图片 样式 js 媒体(音频,视频)  插件  框架 http连接  嵌入的外部资源    

####  default-src
设置上面的各个选项的默认值,  
```js
Content-Security-Policy: default-src 'self', //全局配置
单一设置的配置会覆盖它 
```
### URL 限制  
```js
frame-ancestors：限制嵌入框架的网页  
base-uri：限制<base#href>  
form-action：限制<form#action>  
```
### 其他限制
block-all-mixed-content：HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）
upgrade-insecure-requests：自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议  
plugin-types：限制可以使用的插件格式  
sandbox：浏览器行为的限制，比如不能有弹出窗口等  
### 限制的选项 
主机名：example.org，https://example.com:443  
路径名：example.org/resources/js/  
通配符：*.example.org，*://*.example.com:*（表示任意协议、任意子域名、任意端口）  
协议名：https:、data:  
关键字'self'：当前域名，需要加引号  
关键字'none'：禁止加载任何外部资源，需要加引号  

多个值可以并列,用空格分隔

### report-uri
把恶意行为报告道哪里,
### 注意事项  
如果不设置某个限制选项,就是默认允许任何值  
script-src和object-src是必须设置的,除非设置了default-src.  
因为攻击者只要能注入脚本,其他限制都可以规避.object-src是因为flash可以执行外部脚本  

以上并不完善.还没有很理解. todo



[详见阮老师博客](http://www.ruanyifeng.com/blog/2016/09/csp.html)







