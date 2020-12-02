prisma 它比较了写 SQL,使用 Query Builder,以及 orm 的优点和缺点;  
并且目前 Node.js 和 Typescript 这个技术栈并没有最佳实践,

### 特性是什么呢   
auto-generated and type-safe query builder  
Prisma Client's query API is generated based on your database schema. 它的 query API 是从数据库  schema 生成的  
可以和其它API 技术一起用,例如 Restful,GraphQL,Thrift,gRPC  

- Boost productivity `by letting developers query data in natural and familiar ways`  
- Increase confidence `with type-safety, auto-completion and a robust query API`  

不会做 对象关系映射  
Prisma Client provides a query API for your database schema with a focus on structural typing   
and natural querying (in that sense, it gets closest to the data mapper pattern of traditional ORMs).  

-----------------------------



#### 一些特性
一个 client 只能连一个 prisma 的 service  
yarn generate 就可以生成 prisma client  
upsert 其实就是创建和更新的混合 `upsertUser` 
nested object writes, 包括 `create`,`update`,`upsert`,`deleted`,`connect`,`disconnect`,`set`(其实就是 connect和 disconnect )   
$exists `prisma.$exists.user({ id:"hfskfjksdfj" })`  

<details>
  <summary>
prisma api 获取数据默认获得 scalar 类型的全部数据 如果不想,可以用 $fragment 
  </summary>
	
```js
const fragment = `
	fragment testFragment on User{
		id
		name
		email
	}
`
const result = await prisma.users().$fragment(fragment) 
```
</details>


[关于分页的详细文档](https://v1.prisma.io/docs/1.34/prisma-client/basic-data-access/reading-data-TYPESCRIPT-rsc3/)

<details>
<summary>集合查询 </summary>  
```js
await.prisma.usersConnection().aggregate().count()
```
-------
</details>



##### $graphql
```js
const query = `
	query {
		user($where: UserWhereUniqueInput! ){
			id
			name
			email
		}
	}
`
const result = prisma.$graphql(query,{where:{

}});
```

--------------
#### prisma 自定义指令
- @craetedAt  只读
- @updatedAt  只读
- @unique     null 是例外
- @id         只读
- @default  
- @realation 
		1. name  关系的名称  
		2. link
			- INLINE  外键
			- TABLE   专门一个表来表示关系
		3. onDelete
		- SET_NULL 默认
		- CASCADE
- @db  改变 db 中 数据库/ 字段的名字  
- @scalarList(strategy: RELATION)  当值是 scalar[] 时,必须加
```js

type User @db(name: "user") {
  id: ID! @id
  name: String! @db(name: "full_name")
}
```

#### type/datamodal
dataModal 对应数据库表,并且是 Prisma client自动生成 API 的基础
type 之间不是用 id 来联系的,直接是 author 或者 posts,tweets,



#### 定义
node: An instantiation of a type is called a node. This term refers to a node inside your data graph.类型的实例
object type: 就是用在 datamodal 用type 关键字来定义的  


#### fields 的类型  
Boolean  String Int Float ID(1个类型一个) DateTime(`ISO 8601格式`)  ENUM(只能有字母 下划线)  Json  



#### onDelete 为 CASCADE 和 SET_NULL 的表现
```js
type User {
  id: ID! @id
  comments: [Comment!]! @relation(name: "CommentAuthor", onDelete: CASCADE)   这里的 onDelete 决定了 当 user 的实例被删除时,comments 的表现
  blog: Blog @relation(name: "BlogOwner", onDelete: CASCADE)    // 这里的 onDelete 决定了 当 user 的实例被删除时,blog 的表现
}

type Blog {
  id: ID! @id
  comments: [Comment!]! @relation(name: "Comments", onDelete: CASCADE)  // 这里的 onDelete 决定了 当 Blog 的实例被删除时,Comment 的表现
  owner: User! @relation(name: "BlogOwner", onDelete: SET_NULL)   // 这里的 onDelete 决定了 当 Blog 的实例被删除时,User 的表现
}

type Comment {
  id: ID! @id
  blog: Blog! @relation(name: "Comments", onDelete: SET_NULL)
  author: User @relation(name: "CommentAuthor", onDelete: SET_NULL)
}
```
1. When a User node gets deleted,

- all related Comment nodes will be deleted.
- the related Blog node will be deleted.
2. When a Blog node gets deleted,

- all related Comment nodes will be deleted.
- the related User node will have its blog field set to null.

3. When a Comment node gets deleted,

- the related Blog node continues to exist and the deleted Comment node is removed from its comments list.
- the related User node continues to exist and the deleted Comment node is removed from its comments list.


#### @relation 的 name的使用
```js
type User {
  id: ID! @id
  writtenStories: [Story!]! @relation(name: "WrittenStories")   // 
  likedStories: [Story!]! @relation(name: "LikedStories")  
}

type Story {
  id: ID! @id
  text: String!
  author: User! @relation(name: "WrittenStories")
  likedBy: [User!]! @relation(name: "LikedStories")
}
```









### 怎么用 (如果用ts 结果都是带类型的)
1. 查询多个:
```js
const postsByAuthor = await prisma.post.findMany({
  where: { 
    author: { id: 42 } 
  },
  include:{
    author: true        // postsByAuthor上数组中每个元素上带 author 字段,它的值是根据 这俩表之间的关系去查询
  }
})

//  结果对应的类型如下
const postsByAuthorWithAuthorInfo: (Post & {
    author: User | null;
})[]
```
结果:  
```js
[{
  id: 1,
  title: "Follow Prisma on Twitter"
  authorId: 42,
}, {
  id: 2,
  title: "Join us online for Prisma Day 2020"
  authorId: 42,
}]
```
2. 创建  
```js
const result = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: {
        title: "Hello World"
      }
    }
  }
})
```
3. 查询1个  
```js
const result = await prisma.use.findOne({
    where :{
       id: 42
    }
 }).posts();
```
4. 查多个  
```js
const result = await prisma.user.findMany({
  include: { 
    posts: {
      select: {
        id: true,
        title: true
      }
    } 
  }
})
```
5. Relation Filters (多表联合查询)
```js
const result = await prisma.user
  .findOne({
    where: { email: 'alice@prisma.io' },
  })
  .posts({
    where: {
      title: {
        startsWith: 'Hello',
      },
    },
  }
  
  const result = await prisma.user.findOne({
  where:{
  email: "helloworld@gmail.com"
}
})
.posts({
  where:{
    title:{
      startsWidth:'hello'
    }
  }
})
```




#### 模型
```js
// 这个是 ok 的
model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id       Int     @default(autoincrement()) @id
  title    String
  content  String?
  author   User    @relation(fields: [authorId], references: [id])
  authorId Int
}




model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  role      Role     @default(USER)
  posts     Post[]            // prisma level 或者叫  "virtual relation fields
}
model Post {
  id         Int     @id @default(autoincrement())
  title      String
  author     User    @relation(fields: [authorId], references: [id])  
  authorId   Int     // relation scalar field (used in the `@relation` attribute above)   外键  在 db 中
}
```
### 一些似乎不好用的东西?  
在表格之间使用外键,非常难办;因为关系型数据库和面向对象语言在体现关系时 ,两者在 基础上的不匹配;  
Relational: Data is typically normalized (flat) and uses foreign keys to link across entities. The entities then need to be JOINed to manifest the actual relationships.
Object-oriented: Objects can be deeply nested structures where you can traverse relationships simply by using dot notation.


