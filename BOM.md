> EcmaScript无疑是JavaScript的核心,但是如果要在Web中使用js,那么BOM无疑是真正的核心.  
BOM提供和和浏览器进行交互的能力,
### window对象
在浏览器里,BOM的核心对象时window，他表示浏览器的一个实例．在浏览器中，它既是通过js访问浏览器的  
一个接口,又是ECMAScript规定的Global对象.  location,navigator都是window的属性
#### 窗口关系及框架,用得较少
window.frames数组
#### 窗口位置
浏览器窗口是个矩形.
screenX,screenLeft  浏览器左边界到操作系统桌面左边界的水平距离
screenY,screenTop    浏览器顶部距离系统桌面顶部的垂直距离
#### 窗口大小
outerHeight,outerWidth 都是浏览器窗口本身的尺寸,单位 :像素
innerHeight,innerWidth,
>表示的是页面视图区的大小,显示网页的区域,不包括菜单栏,地址栏,标签栏,书签栏,**包括滚动条**(实际显示网页的地方)  

直接拿到DOM,他的height,width都是content的  
offsetHeight,offsetWidth,返回的是 content的宽/高+padding + border  
clientHeight,元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距  
排序: **直接DOM-content==>clientHeight(concent+padding)==>offsetHeight(content+padding+border)**
innerHeight一般等于clientHeight,,outerHeight一般全部包括
#### 导航和打开窗口
```js
var newWindow = window.open(strUrl,strWindowName,strWindowFeatures,replase=true)
//后续可以通过newWindow这个引用对这个窗口进行操作
```
例子:  
```js
let windowObjectReference;
let strWindowFeatures = `
    menubar=yes,
    location=yes,
    resizable=yes,
    scrollbars=yes, //这里也可以设置窗口距离左上角的偏移量
    status=yes,
    //height,left,top,location,width
`;
function openRequestedPopup() {
    windowObjectReference = 
    window.open(
        "http://www.cnn.com/", 
        "CNN_WindowName", 
        strWindowFeatures
    );
}
```

#### 弹出对话框 
alert prompt confirm
### location 对象
既是window的对象,也是document的对象,这两者引用的是同一个对象  
它将url解析为独立的片段  

```js
var url = document.createElement('a');
url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org (可能会带端口号)
console.log(url.hostname);  // developer.mozilla.org  (不带端口号)
console.log(url.port);      // (blank - https assumes port 443)
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org
```
#### location.assign()
location.replace(),不会生成历史记录,流氓网站最喜欢用  
location.reload() 刷新网页  
location.reload(true) //强制从服务器刷新
可以修改页面,或者 修改location的上面列出的属性的值,或者用history.go(-1,0,1)  
history.back()  / forward() 分别是 history.go(-1) / (1)的语法糖.  
### 获取查询字符串参数
```js
var str = "https://developer.mozilla.org/zh-CN/docs/Web/API/Location?name=helloworld&age=180";
var kv = str.slice(str.indexOf('?') + 1, str.length - 1);
var arr = kv.split('&');
var obj = {};
arr.map((item) => {
  var kkvv = item.split('=');
  Object.assign(obj,         // 不会重复的
    kkvv
  )
})
console.log(obj)
 
```

### navigator
识别浏览器客户端的
navigator.userAgent
