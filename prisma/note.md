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


