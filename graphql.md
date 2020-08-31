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

### 变量
```js
query TestQuery($episode:Episode = 'test'){  // 默认值
  hero(episode: $episode){   //这里使用变量
  name
  friends{
  name
    }
  }
}
```
### 指令
```js
query Hero(#episode:Episode,$withFriends:Boolean!){
  hero(episode:$episode){
    name
    friends @include(if:$withFriends){  //这里是指令,或者 @skip(true时跳过)
      name
    }
  }
}

{
  "episode":"JEDI",
  "withFriends":true
}
```

## Mutation
数据变更
###  内联片段
查询的字段如果是接口类型,或者联合类型;可以用内联片段来取出下层具体类型的数据;
### 元字段
不知道要将从GraphQL服务器获得什么类型.__typename,  
可获得对象类型名称;

### 接口
定义一些公共属性.然后type xxx  implements Character,可以结合内联片段用  
### 联合类型
类似接口,但是不指定类型之间的公共字段;  
union SearchResult = Human | Droid | Starship  
如果查询结果是联合类型,需要结合条件片段,才能查询任意字段
```js
{
  search(text: "an") {
    __typename
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```
### 输入类型
```js
input ReviewInput{
starts: Int!
commentary: String
}
```
