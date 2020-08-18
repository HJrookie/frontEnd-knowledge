### 理解
感觉像是基于腾讯云的资源,以微信为依托,把微信做成os(流量入口),  
进一步巩固微信的社交地位,并且瓜分移动端流量,霸占流量入口.  
### 技术相关
#### 用到的资源
数据库  存储空间  函数  
database  storage functions  

#### 注意事项
1. 初始化  
```js
wx.cloud.init({
    env:'test-x1dzi', //也可以是对象,可设置database,storage,functions,default
    traceUser:true
})
```
>env只是初始化了本次云函数api调用的云环境,并不会决定接下来来其他被调云函数中的api调用的环境,在其他被调云函数中需要通过 init 方法重新设置环境。
  
建议设置env时,指定**cloud.DYNAMIC_CURRENT_ENV**,，这样云函数内发起数据库请求、存储请求或调用其他云函数的时候，默认请求的云环境就是云函数当前所在的环境：
```ts
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event) => {
  const { ENV, OPENID, APPID } = cloud.getWXContext()

  // 如果云函数所在环境为 abc，则下面的调用就会请求到 abc 环境的数据库
  const dbResult = await cloud.database().collection('test').get()

  return {
    dbResult,
    ENV,
    OPENID,
    APPID,
  }
}
```
**DYNAMIC_CURRENT_ENV**  
标志当前所在环境的意思. 值为`Symbol.for('DYNAMIC_CURRENT_ENV')`  
在init中给env参数传递这个常量,后续的api请求会自动请求当前环境的云资源.  
>如云函数 A 当前所在环境是 test-123，则其接下来请求数据库、文件存储、云函数时都默认请求环境 test-123 的数据库、文件存储、云函数

#### API 风格
这里支持回调风格以及Promise风格.  
如果传入API的Object参数中,有success,fail,complete字段,  
我们认为是回调风格,api调用不返回promise  
如果都没有,则是Promise风格.  
>Promise resolve 的结果同传入 success 回调的参数，reject 的结果同传入 fail 的参数

**如果 init 时不传 env 参数，后续 API 调用将默认请求到第一个创建的环境，但这种方式并不总是预期的，因此这种方式已废弃，请务必明确传入 env 参数**


### 开发注意
app.json就是个全局配置文件,里面有所有的页面,以及字体,颜色等的配置.  
添加或者删除页面时,需要同步修改这里的page
单个页面的风格配置(index.json)可以覆盖全局的风格.  

app.wxss定义全局样式,页面的wxss中定义特有的样式  
在app.json里面pages数组中添加一个路径,然后保存,就会自己生成相应的文件  
json的key一定要加双引号  
json的值只能是,boolean,string,number,null,array,obj**其他不行**
### html相关
wxml.wx markup language.里面有view,相当于div,text相当于span,  
image相当于img  
每个小程序组件都默认提供了一些非常nice的属性,以image为例子:  
如果希望图片加载完,做一件事,可以使用bindload属性,懒加载使用  
lazy-load属性;
### css(wxss)
:hover不支持
单位: rpx(responsive pixel)  
规定屏幕宽为750rpx 
px换算rpx (750/屏幕宽度)  
iPhone6的宽度是 375px,所以1px = 2rpx
#### 样式导入
以前用link,现在wxml和wxss放在一个目录下就会自动引入样式,  
@import可以引入外部样式  
```css
在想要引样式的地方写  
@import "../../common.wxss";
```
### 数据绑定
例子:  
html  
```html
<text class="{{defaultClass}}" style="color:#fff;background:{{backgroudColor}};display:block">{{myName}}</text>
<button bindtap="setName">点我</button>
```
```js
const app = getApp()

Page({
    // 定义数据
  data: {
    myName: '我是谁？',
    defaultClass: 'my-name',
    backgroudColor: '#e4393c'
  },
  setName() {
      // 这里修改数据
    this.setData({
      myName: "喷火龙",
      defaultClass:'my-name-new',
      backgroudColor:'#bbded6'
    })
  }
})

```
text中支持简单的计算:  
```js
<text>{{"听风是风"+str}}</text>
<text>听风是风{{str}}</text>  两种都可以,三元表达式也可以
```
#### 条件逻辑
wx:if,类似 v-if  
```html
<text wx:if="{{bool}}">我叫听风是风</text>  //false,组件不会加载  
还有wx:elif,wx:else, 还有hidden  
wx:if,如果false,不渲染  
hidden:,为真,还是会渲染,display为none

// 结合block控制多个组件的渲染,block就是容器
<block wx:if="{{bool}}">
	<text>我叫听风是风，</text>
	<text>听风是风你加点油好不好，真的是！</text>
</block>


```
v-for例子:  
```js
<view wx:for="{{array}}">
  {{index}}: {{item}}
</view>
// index,item可以改名字
<view wx:for="{{array}}" wx:for-index="a" wx:for-item="b">
  {{a}}: {{b}}
</view>
```

wx:key = "id",值可以是个字符串,代表item中的属性,且属性的值在整个数组中是独一无二的;  
或者 = "this",代表item本身,需要item本身是一个独一无二的

#### 各个组件大概看一下





















