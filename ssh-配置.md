### ssh配置
1. 先生成ssh的密钥,在git bash中输入命令
```bash
ssh-keygen -t rsa -b 4096 -C "1181400768@qq.com"
可以一路下一步,但是我的默认目录里有了公钥和私钥了.因此另外创建了一个文件夹来存储公私钥,将绝对目录输入到CLI中,回车即可
```
2. 复制id_rsa.pub中的内容.将公钥的内容粘贴到github上ssh的文本框里.(私钥保存在本地)
3. 尝试在本地使用ssh克隆远程仓库,应该会失败
4. 配置一下本地的username和email
```bash
git config --global user.name  "HJrookie"  
git config --global user.email  "1181400768@qq.com"
```
5.  遇到问题,报错如下:  
>git@github.com: Permission denied (publickey). fatal: Could not read from remote repository
在git bash中执行
```bash
 ssh-add "你的 id-rsa 文件地址" 这里时私钥文件的绝对路径 // 这句报错,执行ssh-agent bash
 ```
6. ssh git@github.com 看下是否成功
7. 应该没啥问题了..这个文档写得可能有问题.会再改的