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













