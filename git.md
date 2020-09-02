> git相关的操作
- 修改commit message
  1. 如果要修改最近一条message  `git commit --amend` .然后会自动打开editor,编辑,保存即可   
  2. 如果要修改其他commit的message, 比如修改commit ID是123456这个记录的message ,那么要记住这个commit的上一个commit的id,  
  然后 `git rebase -i 上一个id`,执行之后,会自动打开编辑框,然后将我们想要修改的commit的前面的pick改成reword,然后保存,  
  在弹出来的编辑框里修改commit信息,然后保存;


### 要合并多个commit
[该博客](https://segmentfault.com/a/1190000007748862)
1. git rebase -i HEAD~3  
2. 把下面的pick 改成s,保存,退出  
3. 修改commit的message,保存,退出  


### 常用的命令
1. yarn  prepublish     //重新publish一下,到对应的package的目录.prepublish一下..  
2. 解决冲突

```js
git checkout -f 跑到一个新分支上
然后git pull --rebase origin master,
git branch 看下在哪个分支上.应该是在新分支
处理冲突,然后 git add .
git rebase --continue 
git branch .此时应该回到原来的分支了,
看下git log,commit的id都变了
```
