#### 作用
可以重新定义一些类型的 fields  或者说是在 modal上定义 computed fields  
#### 为什么需要这个
在 grahpql规范里面,不能够嵌套对象,因此只能拆分出来写,但是拆出来写不是个好的事情,因为 type 是和 table 一一对应的,这样子会生成另外的表格;  
但是我们不需要这个表格;因此我们将其存成 Json, 但是我们期望前端得到正确的类型;所以用 nexus 的api 来重新定义类型  
```js
type User{
posts: [{name:stirng;title:string; }]   // not permitted
posts: [Post!]!  // ok
}
```
<details> 
  <summary>
  函数大概的写法
  </summary>
  
```js
// template
const value= FunCName({
  name:"NameOfTheType",
  definition: t => {
    t.string('keyName',{required: true/false,nullable: boolean;})'  // 定义的是 string 类型的 field  
    t.list.string('developers')   // 定义的是 string 数组
    t.int('reate')  // int 类型的值  
    t.boolean("onSite");    // 布尔类型
    t.field("initLevel", { type: "ProblemLevel" });   // 对象类型
    t.list.field("resourceOrigin", { type: "ResourceOrigin"} );  // 资源类型, ENUM 数组  
  }
})

// FunCName  === 'unionType'

const MediaType = unionType({
  name: "MediaType",
  description: "Any container type that can be rendered into the feed",
  definition(t) {
    t.members("Post", "Image", "Card");
    t.resolveType((item) => item.name);
  },
});


// FunCName  === 'interfaceType'

const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.id("id", { description: "GUID for a resource" });    // 定义了 id 类型  
  },
});

const User = objectType({
  name: "User",
  definition(t) {
    t.implements("Node");
    t.modify()   //如果想要修改 interface 上的description 或者 resolver  
  },
});



// FunCName  === 'inputObjectType'   它是没有参数的 因此没有resolver  或者  backing types  


export const InputType = inputObjectType({
  name: "InputType",
  definition(t) {
    t.string("key", { required: true });
    t.int("answer");
  },
});




// FunCName  === 'enumType'   它是没有参数的 因此没有resolver  或者  backing types  

Defining as an array of enum values:

const Episode = enumType({
  name: "Episode",
  members: ["NEWHOPE", "EMPIRE", "JEDI"],
  description: "The first Star Wars episodes released",
});
As an object, with a simple mapping of enum values to internal values:

const Episode = enumType({
  name: "Episode",
  members: {
    NEWHOPE: 4,
    EMPIRE: 5,
    JEDI: 6,
  },
});




// FunCName  === 'extendType'   它可以从多个不同的 domain 上取 fields 

export const AddUserById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("userById", {
      type: "User",  // 这个感觉是从 user 类型上取
      args: { id: intArg("id of the user") },   
      resolve: (root, args, ctx) => ctx.user.getById(args.id),
    });
  },
});

// elsewhere...

export const AddPostById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("postById", {
      type: "Post",
      args: { id: intArg("id of the post") },
      resolve: (root, args, ctx) => ctx.post.getById(args.id),
    });
  },
});


// FunCName  === 'mutationField'  语法糖 由于 mutations 经常拆分,经常用到 extendType,因此有了这个语法糖

export const createUser = mutationField("createUser", {
  type: SomeType,
  resolve() {
    // ...
  },
});
as shorthand for:

export const createUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field('createUser', {
      type: SomeType
      resolve() {
        // ...
      }
    })
  }
})




// FunCName  === 'mutationField'  语法糖 跟 mtation 类似  
import { stringArg } from "nexus";

export const usersQueryField = queryField("user", {
  type: SomeType,
  args: { id: stringArg({ required: true }) },
  resolve() {
    // ...
  },
});
as shorthand for:

export const createUser = extendType({
  type: "Query",
  definition(t) {
    t.field('user', {
      type: SomeType
      args: { id: stringArg({ required: true }) },
      resolve() {
        // ...
      }
    })
  }
})
```


</details>


-----------




#### prismaObjectType 来隐藏modal 的 fields
```js   
const User = prismaObjectType({  //目地是隐藏 email 
  name: "User",
  definition(t) {
    t.prismaFields(["id", "name", "posts"]);   // 等价与  t.prismaFields({filter: ["email"]})
  },
});
改了 生成的积木之后,要确保他们在  makePrismaSchema  的参数里  

//较为复杂的
type User {
  id: ID!
  name: String
  posts(
    after: String
    before: String
    first: Int
    last: Int
    orderBy: PostOrderByInput
    skip: Int
    where: PostWhereInput
  ): [Post!]
}
// 为了隐藏分页字段
const User = prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields([
      'id',
      'name',
      {
        name: 'posts',
        args: ['where', 'orderBy']
      }
    ])
  }
})
```

#### 在 modal上添加 computed fields  
```js
const Post = prismaObjectType({
  name: "Post",
  definition(t) {
    t.string("uppercaseTitle", {
      resolve: ({ title }, args, ctx) => title.toUpperCase(),   
    });
  },
});
改了 生成的积木之后,要确保他们在  makePrismaSchema  的参数里  

```

####  Renaming fields on a model 重命名
```js
const Post = prismaObjectType({
  name: 'Post',
  definition(t) {
    t.prismaFields([
      '*',
      {
        name: 'content',
        alias: 'body'
      }
    ])
    t.string('anotherComputedField', {
      resolve: async ({ title }, args, ctx) => {     // 如果这里需要更多的数据,可以这么写
        const databaseInfo = await ctx.prisma.someOperation(...)
        const result = doSomething(databaseInfo)
        return result
      }
    })
  }
})
```

#### 在 API 上添加方法,以及实现
```js
type Mutation {
  createDraft(title: String!, content: String): Post!
  publish(id: ID!): Post
}
Here's how to implement them in your GraphQL server code:

const Mutation = prismaObjectType({
  name: "Mutation",
  definition(t) {
    t.prismaFields(["createUser", "updateUser", "deleteUser", "deletePost"]);
    t.field("createDraft", {
      type: "Post",
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, content }, ctx) => {
        return ctx.prisma.createPost({ title, content });
      },
    });
    t.field("publish", {
      type: "Post",
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.updatePost({
          where: { id },
          data: { published: true },
        });
      },
    });
  },
});
```
