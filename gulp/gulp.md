### gulp 是干嘛的
工作流,做任务自动化的,build,test,代码格式化,
### 能做什么
编译sass,合并优化压缩css,校验压缩css,优化图片,添加文件指纹,  
组件化头部底部,实时自动刷新
#### 1.1 gulpfile
项目根目录有个gulp.js,或者Gulp.js的文件,在运行gulp命令式被自动加载;  
这个文件中,会包含很多gulp的API,例如dest(),src(),series(),parallel(),  
除此之外纯js代码,以及Node模块也可以使用.任何导出的函数都将注册到gulp的task中.
#### 1.2 gulpfile转义
你可以使用需要转义的编程语言来写gulpfile文件,例如ts,或者 babel,可以修改文件后缀并且安装对应的模块.
#### 1.3 gulp分割
最开始,所有的逻辑都在一个gulpfile文件中,但是文件越来越大之后,就可以将它分割成多个独立的文件;  
每个task可以被分割为独立的文件,然后import到gulpfile文件中,并组合.  
这样子可以对每个任务进行单独测试,;  
>Node 的模块解析功能允许你将 gulpfile.js' 文件替换为同样命名为 gulpfile.js 的目录，该目录中包含了一个名为 index.js 的文件，该文件被当作 gulpfile.js 使用。并且，该目录中还可以包含各个独立的任务（task）模块
### 2.创建任务
#### 2.1创建任务  
每个 gulp 任务（task）都是一个异步的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数，  
或者是一个返回 stream、promise、event emitter、child process 或 observable (后面会详细讲解) 类型值的函数。  
由于某些平台的限制而不支持异步任务，因此 gulp 还提供了一个漂亮 替代品。  
#### 2.2 导出任务  
task分public,和private;public的在gulpfile中被导出,然后可以通过gulp命令直接调用;  
private的,在gulpfile内部使用,通常作为series和parallel组合的组成部分;  
```js
const { series } = require('gulp');

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
exports.default = series(clean, build);
```
#### 1.3组合任务  
Gulp 提供了两个强大的组合方法： series() 和 parallel()，允许将多个独立的任务组合为一个更大的操作。  
这两个方法都可以接受任意数目的任务（task）函数或已经组合的操作。series() 和 parallel() 可以互相嵌套至任意深度。

如果需要让任务（task）按顺序执行，请使用 series() 方法。
```js
const { series } = require('gulp');

function transpile(cb) {
  // body omitted
  cb();
}

function bundle(cb) {
  // body omitted
  cb();
}

exports.build = series(transpile, bundle);
```
对于希望以最大并发来运行的任务（tasks），可以使用 parallel() 方法将它们组合起来。
```js
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```
当 series() 或 parallel() 被调用时，任务（tasks）被立即组合在一起。这就允许在组合中进行改变，而不需要在单个任务（task）中进行条件判断。
```js
const { series } = require('gulp');

function minify(cb) {
  // body omitted
  cb();
}


function transpile(cb) {
  // body omitted
  cb();
}

function livereload(cb) {
  // body omitted
  cb();
}

if (process.env.NODE_ENV === 'production') {
  exports.build = series(transpile, minify);
} else {
  exports.build = series(transpile, livereload);
```
series() 和 parallel() 可以被嵌套到任意深度
```js
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function cssTranspile(cb) {
  // body omitted
  cb();
}

function cssMinify(cb) {
  // body omitted
  cb();
}

function jsTranspile(cb) {
  // body omitted
  cb();
}

function jsBundle(cb) {
  // body omitted
  cb();
}

function jsMinify(cb) {
  // body omitted
  cb();
}

function publish(cb) {
  // body omitted
  cb();
}

exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);
```
当一个组合操作执行时，这个组合中的每一个任务每次被调用时都会被执行。例如，在两个不同的任务（task）之间调用的 clean 任务（task）将被执行两次，并且将导致不可预期的结果。因此，最好重构组合中的 clean 任务（task）。  
如果你有如下代码：  

```js
// This is INCORRECT
const { series, parallel } = require('gulp');

const clean = function(cb) {
  // body omitted
  cb();
};

const css = series(clean, function(cb) {
  // body omitted
  cb();
});

const javascript = series(clean, function(cb) {
  // body omitted
  cb();
});

exports.build = parallel(css, javascript);
```
可以改成下面的样子:  
```js
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

exports.build = series(clean, parallel(css, javascript));
```