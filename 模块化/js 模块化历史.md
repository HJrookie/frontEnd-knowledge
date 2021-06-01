### AMD (Asynchronous Module Definition)    [规范地址](https://github.com/amdjs/amdjs-api/wiki/AMD)
AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
```js
// 依赖前置, 异步加载模块
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {

   });
```

### CMD (Common  Module Definition)    [规范地址](https://github.com/seajs/seajs/issues/242)
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
```js
// 依赖就近,同步加载
define(function(require, exports) {
  // 获取模块 a 的接口
  var a = require('./a');
  // 调用模块 a 的方法
  a.doSomething();
});
```
### CommonJS规范
主要是服务端和桌面端使用的,通过`require`导入,通过`exports`或者`module.exports`导出  
是同步加载的,不适合浏览器
```js
require("module");
require("../file.js");
exports.doStuff = function() {};
module.exports = someValue;
```

### UMD (Universal ...) 
尝试解决 `AMD`和`CommonJS`不兼容的问题.

### ES6 模块
思想:  尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量  
CommonJS 和 AMD 模块，都只能在运行时确定这些东西。  
```js
import * as
import {}
import xxx
// ...
export 
export default
```

### 没有模块化时遇到的问题
1. 全局作用域变量污染问题  
2. 代码逻辑过于复杂,难以理清楚
3. 代码重用问题
