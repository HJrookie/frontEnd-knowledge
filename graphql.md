### 好处  
把api变得灵活起来,
[详见这里](https://chinese.freecodecamp.org/news/a-detailed-guide-to-graphql/)

### 操作类型
query :查询  
mutation: 变更  增加,删除,修改  
subscription:  当数据变化时,进行消息推送  

查询例子:  
```
query {
  user { id }
}
```

### 对象类型,标量类型  
如果一个 GraphQL 服务接受到了一个 query，那么这个 query 将从 Root Query 开始查找，  
找到对象类型（Object Type）时则使用它的解析函数 Resolver 来获取内容，如果返回的是对象类型则继续使用解析函数获取内容，  
如果返回的是标量类型（Scalar Type）则结束获取，直到找到最后一个标量类型。  

1. 对象类型：用户在 schema 中定义的 type
2. 标量类型：GraphQL 中内置有一些标量类型 String、Int、Float、Boolean、ID，用户也可以定义自己的标量类型  

### 别名
如果要查询相同字段
```js
{
  empireHero:hero(episode:EMPIRE){
  name
  }
  jediHero:hero(episode:JEDI){
  name
  }
}
```











