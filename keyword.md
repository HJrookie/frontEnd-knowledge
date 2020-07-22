### BFC

绝对定位 float  
overflow display
#### BFC特性
相互独立 互不影响,从上到下,margin重叠, 包含浮动元素,高度被计算在内  
每个元素左边缘与该元素的父元素的左侧向接触.(左到右).对于浮动元素也是如此.除非该元素自己形成了新的BFC

### 网络七层
####物理层
双绞线,光纤  电信号
----
####数据链路层
传输的是帧,
----
####网络层
IP,ICMP,ARP,RARP
----
####传输层
####会话-表示-应用层
HTTP,HTTPS,FTP,SFTP,DNS

### 三栏布局 flex

justify-content: space-between  
align-self/align-items  
vertical-align:middle, + inline-block  
content:'', + height: 100% + display:inline-block,+ "vertical-align"  


### 闭包和循环结合引起的问题

解决方案:

1. var 改成 let
2. 使用更多闭包
3. 匿名闭包,即 IIFE

#### HTTP 请求
### 幂等
HEAD,PUT,GET,Delete,Options
PUT 是幂等的,POST 不是，可能会多次提交订单,
HEAD,跟get一样，但是没有响应体

### 定位
position如果不是relative,设置top,bottom,left,right没有用的
#### 垂直居中
父元素: display:flex;
子元素: align-self:center
----
父元素: display:flex;
align-items: center;
  
对于文字的居中,将height设置为line-height相同
#### 水平居中
父元素设置:  
justify-content:center;
对于子元素:
margin: 0 auto;
或者 transform:translate(-50%,-50%) 结合top和left,或者右下(负的即可)，以及relative

#### ExternalInterface,flash相关

### 元素高度
x=> scrool/inner => offset
inner网页显示的区域,包含滚动条的,outer就是窗口大小
空sino 记住sino

#### indexOf
```
var str = "aaa?bbbccc"
str.slice(str.indexOf('?'))
```
**indexOf直接截取是包含?的**

## isNAN
window.isNAN, 如果转换成数字为NAN，那么还是为true 
Number.isNAN ，只对NAN有用


### ws,connnection,upgrade,websocket

#### 除2商0,乘2小数为0


#### 相对定位
relative,相对元素原来的位置进行定位,设置偏移,不影响其他元素的位置    
absolute: 父元素没有相对定位,或者绝对定位时,它时相对于根元素(html)定位的,  
    父元素设置了相对定位,或者绝对定位,根据离自己最近的设置了相对定位,或者绝对定位的父元素进行定位,(最近的非static的父元素)  
    详情见博客[定位相关](https://www.runoob.com/w3cnote/css-position-static-relative-absolute-fixed.html)


### 不支持冒泡的事件 
①focus     fbmouse,loadresize
②blur  
③mouseenter  
④mouseleave  
⑤load  
⑥unload  
⑦resize  
> click,scrool支持

### 在js中,设置css时,需要使用驼峰命名法. backgroundColor
### 1/0  Infinity
### 1 in [1]  //false,1要看成索引
### 比较运算符 > 逻辑与/或运算符 > 赋值运算
10 && 20 ==>20  
10 || 30 ==>10

### js遍历对象
1. for in  
```js
var obj = {1:1,b:2,c:3};
for( let  i in obj){
    console.log(i,obj[i])
}
// 方法2
var obj = {1:1,b:2,c:2};
let keys = Object.keys(obj),value = '';
keys.forEach((item)=>{
    value = value + item + ":" + obj[item] + ",";
})
console.log(value.slice(-1))
// 方法3 用数组来做
var obj = {1:1,b:2,c:2};
let arr = [];
for(let key in obj){
    arr.push(key + ":" + obj[key])
}
console.log(arr.join())
```