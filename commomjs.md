### 定义 引用 标识
#### 1.1 模块的定义  
CommonJS的模块只有一个唯一的出口,就是module.exports对象.我们把所有要导出的变量或者函数都放到这个对象里面,  
再导出这个对象,我们就可以在外部访问到这些变量和函数;  
而没有被导出的东西,对外部模块来说是不可见的.  
```js
function isNumber (n) {
    return typeof n === 'number'
}

module.exports = {
    sum: function(a, b) {
        if(isNumber(a) && isNumber(b)) {
            return a + b
        } else {
            return NaN
        }
    }
}
```
这里导出的是module.exports属性,如果对exports的属性赋值,那么导出的module.exports对象的属性也会一起变化,  
然而直接对exports对象赋值,那么exports和module.exports变成了  
两个不同的对象,这俩完全不一样了
#### 1.2模块的引用  
```js
var mod = require('./index')

console.log(mod.sum(2, '2')) // NaN
console.log(mod.sum(2, 2)) // 4
mod.isNumber() // 抛出错误
```
### 1.3模块的标识
就是说,require("moduleName")的时候,怎么去找到对应的模块,
这个模块主要有几种类型:  
1. 符合小驼峰命名法的字符串,(从node_modules或者 系统模块中引入)  
2. 以.或者..开头的相对路径模块  
3. 绝对路径  
##### 注意,文件后缀名 .js可以省略

### Node对CommonJS的实现  
Node对CommonJS的实现,主要分为以下三点:  
#### 1.模块路径分析  
node是怎么找到模块的位置的?  
1.1 require("./index")这里面的参数叫做模块标识符,模块路径分析会分析这个参数,确定这个模块属于以下哪一类模块?  
--核心模块(Node自己带的)  
--路径模块(相对定位,或者绝对定位开始的模块)  
--自定义模块(node_modules里的模块)  
如果是核心模块,那就跳过路径分析,以及文件定位,如果是路径模块,那就去根据绝对位置或者相对位置去找.注意**自定义模块**:  
他会先去项目目录的node_modules里面找,没找到就去项目目录的上一级目录里找,一直找到根目录的node_modules,  
没找到就报错;  
2. 文件定位  
由于后缀可以省略,所以会依次补充上.js,.node,或者.json来尝试.  
>在NodeJS中, 省略了扩展名的文件, 会依次补充上.js, .node, .json来尝试, 如果传入的是一个目录, 那么NodeJS会把它当成一个包来看待, 会采用以下方式确定文件名第一步, 找出目录下的package.json, 用JSON.parse()解析出main字段第二步, 如果main字段指定的文件还是省略了扩展, 那么会依次补充.js, .node, .json尝试. 第三部, 如果main字段制定的文件不存在, 或者根本就不存在package.json, 那么会默认加载这个目录下的index.js, index.node, index.json文件. 以上就是文件定位的过程, 再搭配上路径分析的过程, 进行排列组合, 这得有多少种可能呀.  所以说, 自定义模块的引入, 是最费性能的.


## 二、 ES6 Modules规范
ES6 Modules的核心思想,和CommonJS不同,  
CommonJS是运行时才确定引入,然后执行这个模块,相当于调用一个函数,返回一个对象,就这么简单;  
但是ES6 Modules是语言层面的,导入导出是

### 2.1 第一种定义,引用,和标识的方法
```js
// circle.js   定义一个模块
export const PI = 3.14
export let radius = 5
export let getArea = (r) => PI * r * r

// 2.2 引用模块
import {PI, radius, getArea} from './circle'

```
上面的方法有个缺点就是,需要知道他导出了那些模块,要解决这个问题,有两个方法:  
1. import * from './circle',  
这样子就可以引入了,但是没法调用  
2. 利用export  default  
```js
// 到处的时候
export default getArea = (r) => PI * r * r
或者  
let getArea = (r) => PI * r * r
// 导出列表, ES6 Module的另一种导出方式
export {
    getArea as default
}

// 导入的时候
import default as getArea from './circle'

import getArea from './circle'
```
