### mac 上 nginx 的各种目录
1. 配置文件目录   /usr/local/etc/nginx  
2. 日志目录      /usr/local/var/log/nginx/access.log  
3. 静态文件目录   /usr/local/var/www

#### linix上常用命令
1. 重启       sudo nginx -s stop && sudo nginx  
2. 拷贝文件    cd dist &&  cp -R . /usr/local/var/www && cd ..


### win上常用命令

####　预先要做的

把 路径 加到path中
#### 命令列表
1. 启动  `start nginx`
2. nginx -s [cmds]   [nginx 文档](http://nginx.org/en/docs/beginners_guide.html)    
3. `nginx -s reload` 不用重启,配置就能生效

### windows上nginx 的知识
1. nginx 配置文件改了之后,需要reload, 然后才能生效
2. nginx 先启动之后,才能用 `nginx -s [cmd]`

