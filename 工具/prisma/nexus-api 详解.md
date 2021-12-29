1. objectType
它是`Graphql schema` 中最基础的组件,可以拿来创建一个 object Type,
```js
export const TestUser = objectType({
  name: 'TestUser',  // 这里的名字是不合法的,因为他和 datamodel 中的 type 重名了  但是为什么呢?  
  definition(t) {
    t.string('name', {
      nullable: true,   // 默认是 false
      description: "the test description",  // 会显示在 playground 这个类型的 name field 的详情里面
      deprecation: "test string"   // 会显示在 playground 这个type的 name field 上方.
      list: true| boolean[]  ,如果是 true, 就是个数组,相当于 t.list.string  ,如果是 boolean[],代表嵌套深度,true/false 代表里面的值是否是必须的
    });
```
2. prismaObjectType
它是对`objectType`的封装,提供了额外的 `prismaFields` 和 `prismaTypes` 这两个函数  
这两个函数让连接`prisma schema` 和`nexus schema` 变得更简单,还提供了直接的方法来修改 prisma models ,fields,和 被包含在nexus schema 中的input参数      但是为什么呢?      
```js
export const TestUserDef = prismaObjectType({
  name: 'TestUser',   //  The name of the Prisma model or generated CRUD GraphQL type
  definition(t) {
    t.prismaFields(['*']);  // 代表所有的参数都会显示
    t.field('data', {
      ...t.prismaType.data,
      type: User,
    });
  },
});
```
#### objectType 和 prismaObjectType使用场景
如果只是想定义一个对象,不是对已有的某个对象进行修改,或者在其他地方引用这个对象来当做类型;  用 objectType 比较好  



3. inputObjectType  
这个函数可以定义一个复杂的对象,这个对象可以被作为输入值,和`object types`不同的是,它没有参数,因此没有 resolvers 和 `backing types`
```js
export const  InputType = inputObjectType({
  name: "TestUserInputType",   //可以是自定义的名字,不能和 已有的类型相同,也可以是各种Input
  definition(t){
    t.string("key",{required: true})
    t.int('age')
  }
})
```
4. prismaInputObjectType 

```js
export const TestUserUpdateInputType = prismaInputObjectType({
  name: 'TestUserOrderByInput',  
  // 这里可以是 UserCreateInput,UserUpdateInput,UserWhereInput,UserUpdateManyMutationInput,UserWhereUniqueInput
  // 不能是 UserOrderByInput,或者 TestUser 这种 datamodel 中的 type
  definition(t) {
    t.prismaFields(['*']);
  },
});
```




5. prismaExtendType  
一般来说如果需要在同一个项目中,多个不同的文件中对同一个 Type 的 `fields` 做修改;一般拿来对 `Query and Mutation` 做修改;  


6. enumType
```js
const EnumTest = enumType({
  name: "EnumTest"   // 自定义的
  members: ["A","B","C"]
})
```


### 7. primaType 和 prismaFields
#### prismaFields
可以控制哪些字段会显示, 或者 重命名字段,调整参数
```js
 t.prismaFields(['name','age']);  // 代表 'name','age' 这两个字段会展示
    t.prismaFields([{name:'users',alias:'customers'}]);  // 别名,会显示 customers
    t.prismaFields([{name: 'users', args:['first', 'last']  } ])  // 只显示 users 字段,以及 first last 参数
```
#### prismaType
```js`
const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.field('users', {
      ...t.prismaType.users,   // 使用所有的值
      args: {         // 添加新的参数 newArg
        ...t.prismaType.users.args,
        newArg: stringArg(),
      },
      resolve(root, args, ctx) {   // 自定义 resolver  
        // Custom implementation
      },
    })
  },
})
``
