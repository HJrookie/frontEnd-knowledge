### BFC

绝对定位 float  
overflow display

### 网络七层

物理层-数据链路层-网络层-传输层-会话-表示-应用层

### 三栏布局 flwx

justify-content: space-between

### 闭包和循环结合引起的问题

解决方案:

1. var 改成 let
2. 使用更多闭包
3. 匿名闭包,即 IIFE

#### HTTP 请求
### 幂等
HEAD,PUT,GET,Delete,Options
PUT 是幂等的,POST 不是，可能会多次提交订单,

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
或者 transform:translate(-50%,-50%) 结合top和left,或者右下(负的即可)

#### ExternalInterface,flash相关