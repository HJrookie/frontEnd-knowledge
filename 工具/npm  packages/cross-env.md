### 干嘛的
1. 大多数 windows 上的 cli 在像`NODE_ENV=production` 设置环境变量时 会报错  
2. windows 和 posix 处理环境变量的方式不同,With POSIX, you use: $ENV_VAR and on windows you use %ENV_VAR%.  
为了解决这种麻烦,就出现了 cross-env
### 如何使用
```js
"build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
```
