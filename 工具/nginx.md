### mac 上 nginx 的各种目录
1. 配置文件目录   /usr/local/etc/nginx  
2. 日志目录      /usr/local/var/log/nginx/access.log  
3. 静态文件目录   /usr/local/var/www

#### 常用命令
1. 重启       sudo nginx -s stop && sudo nginx  
2. 拷贝文件    cd dist &&  cp -R . /usr/local/var/www && cd ..
