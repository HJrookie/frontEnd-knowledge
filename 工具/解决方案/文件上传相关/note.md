最开始是超时了,设置超时时间,
后来报错 413
Request Entity Too Large  413  
设置nginx的配置 client_max_body_size 20M;   

后来还是不行,还是报错,我就去看nginx去了,因为这个文件全部放在内存里,top命令看nginx的内存占用,30多的占用时,内存占用一下下来了,看日志,去百度搜,说nginx进程重启了,  
这方法有问题,小文件没啥问题  
大文件不好,切片来做.File原型对象的slice方法来做,start,end, 
设置切片的大小,文件总大小,Math.ceil算切片的总个数,    
