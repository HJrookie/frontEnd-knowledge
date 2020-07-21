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
TCP: 面向连接的,三次握手,四次挥手,保证数据正确以及数据顺序,要求资源较多,流模式  
UDP: 无连接,尽最大努力交付的,可能会丢包,顺序会乱,需求资源少,数据报模式

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
通用头部:  Cache-Control,Connection,Upgrade,Date,Pragma,Via,Transfer-Encoding,
请求头部:  
Accept,Accept-encoding,Accept-language,Authorization,Cookie,
Range,Host,dnt,If-Match(Etag),If-modified-Since,If-None-Match,
Proxy-Authorization,  
Referer,User-Agent,Sec-Fetch-Dest,Sec-Fetch-Mode,Sec-Fetch-Site