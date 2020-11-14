### schema 
让 client 知道哪些类型可以查询,可能的返回值有哪些,类型是什么   
### 类型相关  
我们可以自定义哪些:  
Query  Mutation  Input  Enum  interface  type  union  
### Type definition
```js

type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}

type TestType {
name : String!;
where(age: Int = 10) : VmWhereInput!;  // 可选参数 ,默认值 

}

type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}

type GobalSettings{
id : ID!;
recycle_bin: RecycleBin!
}


type ClustersQuery{
 clusters(where: ClusterWhereInput,name:String = 18)  
 hosts(where : HostWhereInput,first:Int,
}
```
> It's important to remember that other than the special status of being the "entry point" into the schema,
the Query and Mutation types are the same as any other GraphQL object type, and their fields work exactly the same way.  

Query 和 Mutation 类型只是 schema 的入口,其实和其它对象类型一样;

### Scalars  和 对象
对象有  name(__typename) 和 fields(字段名), 如果fields 没有 sub-fields,这些 fields 就是query 的叶子  ;  
graphql 带了几个类型,  
- Int: A signed 32‐bit integer.  
- Float: A signed double-precision floating-point value.  
- String: A UTF‐8 character sequence.  
- Boolean: true or false.  
- ID: The ID scalar type represents a unique identifier, often used to refetch an object  
or as the key for a cache. The ID type is serialized in the same way as a String; however,  
defining it as an ID signifies that it is not intended to be human‐readable.   
__typename  其实最终也是 String 类型  [地址](https://graphql.org/learn/schema/#union-types)

一般都可以自定义类型  
`scalar Date`  
### Enumertaion
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}

### Lists and Non-Null
例1:  
`myField: [String!]`  
This means that the list itself can be null, but it can't have any null members. For example, in JSON:

myField: null // valid  
myField: [] // valid  
myField: ['a', 'b'] // valid  
myField: ['a', null, 'b'] // error  

例2:  
`myField: [String]!  `
This means that the list itself cannot be null, but it can contain null values:  

myField: null // error  
myField: [] // valid   
myField: ['a', 'b'] // valid  
myField: ['a', null, 'b'] // valid  

### Interfaces
An Interface is an abstract type that includes a certain set of fields that a type must include to implement the interface.  
如果别人实现这个接口,必须包含接口里的字段;  
例如:  
```js
interface Human{
name : String!:
age: Int!:
}
type male implements Human{
 name : String!:
 age: Int!:
 maleCanDo: String!;
}
type famale implements Human{
 name : String!:
 age: Int!:
 famaleCanDo: String!;
}
```
然后返回的类型是 Human. client 查询的时候,可以使用 inline fragment 来判断到底是什么类型,  `... on Male` 或者 `... on Famale ` 再带上各自独特的 fields  


### Union types
`union SearchResult = Human | Droid | Starship`  
Note that members of a union type need to be concrete object types;  
you can't create a union type out of interfaces or other unions  
它的每个都要是 实在的对象类型,不能使用 interface 或者 其它联合类型来创建;  
查询的时候,用 `inline fragment ` 来判断类型, `... on TYpe` ,
```js
{
  search(text: "an") {
    __typename
    ... on Character {   // 公共类型 ,其实就是interface  
      name
    }
    ... on Human {
      height
    }
    ... on Droid {
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}

```

### Input types
- 它不能有参数;因为是输入,不是查询;  
- 不能在 schema 中混合 input 和 output 类型  
- The fields on an input object type can themselves refer to input object types(field 的类型可以是 input 自己的类型) 
```js
AND: [ClusterWhereInput!]
    OR: [ClusterWhereInput!]
    NOT: [ClusterWhereInput!]
```
一般定义:  
```js
input ReviewInput {
  stars: Int!
  commentary: String
}

```



