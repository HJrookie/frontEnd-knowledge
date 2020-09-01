> git相关的操作
- 修改commit message
  1. 如果要修改最近一条message  `git commit --amend` .然后会自动打开editor,编辑,保存即可   
  2. 如果要修改其他commit的message, 比如修改commit ID是123456这个记录的message ,那么要记住这个commit的上一个commit的id,  
  然后 `git rebase -i 上一个id`,执行之后,会自动打开编辑框,然后将我们想要修改的commit的前面的pick改成reword,然后保存,  
  在弹出来的编辑框里修改commit信息,然后保存;
