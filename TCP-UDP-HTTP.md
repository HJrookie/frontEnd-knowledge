### TCP,UDP区别


### HTTP协议常见状态码，以及意思
- 200 OK
- 201 Created,所需要的资源已经建立,其URI已经跟随Location头信息返回 
- 202 Accepted,但还没处理,不确定会不会被执行
- 301 永久重定向,Moved Permanently
- 302 Found
- 400 
- 401 Unauthorized
- 403 请求被拒绝了
- 404
- 500
- 502 Bad Gateway
- 503 Service Unavailable

### TCP,UDP
TCP: 面向连接的,三次握手,四次挥手,保证数据正确以及数据顺序,要求资源较多,面向字节流 只支持1对一的.,  
UDP: 无连接,尽最大努力交付的,可能会丢包,顺序会乱,需求资源少,面向报文,支持1对1,1对多,多对1,多对多

?JfEHg2tDL+rJ>%


### HTTPS
Hyper Text transter protocol Secure,一般也叫做http over secure,over tls,over ssl,还是用http通信,但是使用tls/ssl来加密数据包  
HTTPS的信任,基于预先安装在OS中的CA,证书颁发机构,简单来说,我们信任CA,CA相信某个网站,当我们访问该网站时,我们也相信他 


### AJAX
1. 创建对象.对于ie,ActiveXObject,一般的话,XMLHttpRequest
2. 设置事件,onreadystateCHange,onload  
```js
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","/ajax/test1.txt",true);
xmlhttp.send();
}
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
```
3. open("get",url,async)
4. send()

# HTTP是无状态的
### Long PUll
也是轮询，但是是阻塞的。没有消息的时候，就不返回，一直等待。直到拿到想要的结果

### Ajax 轮询
隔一段时间，请求一次  
同步请求,立即响应

## Long PUll,和Ajax轮询非常消耗资源,每次都要鉴权,建立连接,很麻烦

### webSocket()
对于HTTP 1.0来说,一个request对应一个response.这个请求就结束了  
对于HTTP 1.1增加了keep-alive属性,这样子可以建立一个HTTP链接，发送多个　　
请求，接受多个response.并且这里的HTTP请求只能由client发出.  
#### ws来了.ws和http协议有交集,但是也有不同之处
```js
GET /chat HTTP/1.1
Host: server.example.com
**Upgrade: websocket**   //多了这个
**Connection: Upgrade**  // 多了这个
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com

```


### HTTP
#### 通用头部:  
##### Cache-Control:  (HTTP缓存之一) 
在HTTP/1.1中,当设置为max-age=0,或者no-cache时,不代表客户端不能缓存,只是说  
每次都要重新验证其有效性. 意味着每次都要发送HTTP请求,  
 但是当缓存内容有效时,可以跳过请求体的下载
 > 
1. 可缓存性  
常用值:  
1.1 no-store才是不缓存的意思,每次都向服务器获取  
1.2 no-cache,客户端缓存,每次都要向源服务器验证  
1.3 public,可以被任何对象缓存(即使是通常不可缓存的内容.例如  
>1.没有max-age指令或Expires消息头,2. 该响应对应的请求方法是post)  
1.4 private,只能被单个用户缓存,不能作为共享缓存.例如用户本地浏览器的缓存.  
2. 到期时间设置  
2.1 max-age = <seconds>,设置缓存最大存储时间,超出后认为过期.相对于请求的事件来算的  
2.2 s-maxage = <sec>,覆盖max-age或者Expires头，但是仅适用于共享缓存(private缓存会忽略它)  
2.3 max-stale[=<sec>],愿意接受过期的资源,可设置一个可选的秒数,响应不能超过给定时间  
2.4 min-fresh=<sec>,客户端希望获取一个在指定时间内保持最新状态的响应 
##### Pragma  
HTTP/1.0里的,用来向后兼容只支持HTTP/1.0 协议的缓 存服务器(那时候没有Cache-Control(http 1.1))  
>常用值: no-cache(强制要求缓存服务器在返回缓存的版本之前,讲请求提交到源服务器进行验证)

#### expires (HTTP缓存之一) 
Connection,Upgrade,Date,,Via,Transfer-Encoding,
请求头部:  
Accept,Accept-encoding,Accept-language,Authorization,Cookie,
Range,Host,dnt,If-Match(Etag),If-modified-Since,If-None-Match,
Proxy-Authorization,  
Referer,User-Agent,Sec-Fetch-Dest,Sec-Fetch-Mode,Sec-Fetch-Site  

说的时候: cache,connection,uograde,Accept,Host,Referer,dnt,Range,  

HTTP 304响应,客户端发一个条件请求,请求头里带了If-Modified-Since: 服务器上次返回响应头中Last-Modified,  
以及If-None-Match,值为服务器上次返回的ETag响应头的值,服务器对内容做判断是否是最新的,如果是最新的,那么服务器返回304,然后从本地缓存中读取资源  
如果不是最新的,服务器返回200,响应体中就是当前资源最新的内容.    


### HTTP 1.0 1.1 1.2
#### 1.0 => 1.1
缓存 部分 host 长链接 状态码 
1. 缓存处理.1.0中主要是用header里的If-Modified-SInce,Expires来作为缓存判断的标准,1.1引入了更多的缓存控制策略,Etag,If-Unmodified-Since,If-Match,If-None-Match  
2. 带宽优化,以及网络连接的使用.客户端可以请求对象的某一部分,1.1中请求头中多了range,可以只请求资源的一部分.返回206,Partial Content  
3. 错误通知的管理.1.1中多了24得错误状态响应码;410 Gone.    
4. Host头处理,1.0中认为每台服务器中都绑定唯一的ip地址,因此,  
   请求头url中没有主机名.但是由于虚拟主机技术的的发展,一台物理  
   服务器上可以有多个虚拟主机,并且共享一个IP地址.HTTP 1.1得请求消息,  和相应详细都应支持Host头域,否则返回400  
5. 长连接,keep_alive,和请求的流水线处理(Pipelining).在要给tcp连接上可以传送多个http请求和响应,减少了建立和关闭连接的小号和延迟.1.1中默认开启connection,keep-alive
   

### HTTPS 和 HTTP
HTTPS需要到CA申请证书  
HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。

HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。

[更多的详情见文章..这文章太长了,一下子看不完,脑子疼](https://juejin.im/entry/5981c5df518825359a2b9476)


### HTTPS过程 
1. 客户端生成随机数,TLS版本号,支持的加密方法,发送给server  
2. server发送一个新的随机数,还有证书给client  
3. client确认证书有效,生成一个新的随机数,用公钥加密,发给server  
4. server用私钥解密收到的被加密过的随机数  
5. 然后他们根据约定好的加密方法,用上面的三个随机数生成session key,加密接下来的对话  
之后的对话使用session key来加密,这个是对称加密算法
#### Session恢复
session因为某种原因断了,可以用两种方法回复:  
1. session ID.每次对话都有一个session ID,客户端把这个发给server,server看自己这里有,就继续会话  
2. 缺点就是session Id只在一台服务器上有,如果多个服务器做lb的话,就不能恢复  
3. 第二个方法: session ticket
4. 客户端发给server一个session ticket,它是用ticket key加密过的session key,session ticket 来自server握手时,  
这个session ticket是server发过来的,只能有服务端解密,  
5. 服务端解密之后,就能拿到这次会话的一些信息

### 防止报文被篡改
原数据 --> 哈希算法 --> 摘要  --> 公钥加密 -->得到数字签名-->发给server   
(原数据以及摘要都会发送给server)    
server: 对元数据算摘要,用私钥解密,得到client传递的摘要,做对比,就知道是否修改了 
但是感觉上面的过程比较慢  
想了个新的方法: 原数据->des加密->hash摘要(连带着des加密后的数据发给server)  
server用相同方法求hash,bijiaohash是否不同.原数据可以用des揭秘出来

### HTTP2.0
1. 性能更好，传输更快。  
2. 新的二进制格式。HTTP 1.x的解析是基于文本，基于文本协议的格式解析存在天然缺陷，文本  
的表现形式很多，不容易做到健壮。二进制只认0,1.
3. 多路复用。连接共享。一个连接上可以有多个request，每个request对应一个id，server根据id  让不同的服务再去处理
4. header压缩，http1.1的header中有大量信息，每次都要重复发送，2.0里面使用encoder减少需要传输  
的header大小，并且双方各自cache header fields标，避免了重复header的传输，也减小了需要传输的大小  
5. 服务端推送
### 2.0多路复用，和1.1的pipeling
pipeling: 多个请求排队,串行化,单线程处理.后面的请求等到前面请求收到响应了,才能发送.  
如果这个请求超时了,后续请求被阻塞.即通常说的线头阻塞;  
2.0: 在同一个连接上,并发,大家一起发请求,互不影响.
### 服务端推送 
服务端推送能把客户端所需要的资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤。  
正因为没有发起请求，建立连接等操作，所以静态资源通过服务端推送的方式可以极大地提升速度。具体  
正常的过程: 
1. client -> server 要index.html
2. server 发给了client
3. client -> 要main.js,
4. server发给了client
服务端推送: 
1. client -> server 要index.html
2. server 发给了client,main,js也给你吧.  
### 头部压缩 
假定一个页面有100个资源需要加载（这个数量对于今天的Web而言还是挺保守的）, 而每一次请求都有1kb的消息头（这同样也并不少见，因为Cookie和引用等东西的存在）, 则至少需要多消耗100kb来获取这些消息头。HTTP2.0可以维护一个字典，差量更新HTTP头部，大大降低因头部传输产生的流量

# [上述http不同版本差异详见](https://juejin.im/entry/5981c5df518825359a2b9476)

### String.fromCharCode()参数是数字