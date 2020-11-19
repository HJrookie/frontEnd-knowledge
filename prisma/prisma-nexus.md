#### 作用
可以重新定义一些类型的 fields
#### 为什么需要这个
在 grahpql规范里面,不能够嵌套对象,因此只能拆分出来写,但是拆出来写不是个好的事情,因为 type 是和 table 一一对应的,这样子会生成另外的表格;  
但是我们不需要这个表格;因此我们将其存成 Json, 但是我们期望前端得到正确的类型;所以用 nexus 的api 来重新定义类型  
```js
type User{
posts: [{name:stirng;title:string; }]   // not permitted
posts: [Post!]!  // ok
}
```
<summary> 函数大概写法
  </summary>
  <details>
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
