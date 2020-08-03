### npm全局安装和一般的安装的区别
#### 1. 一般安装  
通常包会被下载到项目的根目录下node_modules里面去,可以在项目里通过require引入  
#### 2. 全局安装  
包被下载到 C:\Users\userName\appData\Roaming\npm\node_modules里面去,  
并且例如webapack,到npm这一级目录还会被添加到path环境变量,webpack就可以在  
CLI里面使用了