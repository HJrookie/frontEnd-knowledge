1. objectType
它是`Graphql schema` 中最基础的组件,可以拿来创建一个 object Type,
The most basic components of a GraphQL schema are object types, a type you can fetch from your schema, with fields:
```js
export const TestUser = objectType({
  name: 'TestUser',  // 这里的名字是不合法的,因为他和 datamodel 中的 type 重名了  但是为什么呢?  
  definition(t) {
    t.string('name', {
      nullable: true,
      description: "the name"
    });
```
2. prismaObjectType
它是对`objectType`的封装,提供了额外的 `prismaFields` 和 `prismaTypes` 这两个函数  
这两个函数让连接`prisma schema` 和`nexus schema` 变得更简单,还提供了相当直接的方法来修改 prisma models ,fields,和 被包含在nexus schema 中的input参数      但是为什么呢?      
```js
export const TestUserDef = prismaObjectType({
  name: 'TestUser',   // 这里的名字必须是 model 中的 type 的其中一个
  definition(t) {
    t.prismaFields(['*']);
    t.field('data', {
      ...t.prismaType.data,
      type: User,
    });
  },
});
```



3. inputObjectType  
这个函数可以定义一个复杂的对象,这个对象可以被作为输入值,和`object types`不同的是,它没有参数,因此没有 resolvers 和 `backing types`
```js
export const  InputType = inputObjectType({
  name: "TestUserInputType",   // 这里的 name 也不能和 已有的类型相同  
  definition(t){
    t.string("key",{required: true})
    t.int('age')
  }
})
```
4. prismaInputObjectType 






5. prismaExtendType  
一般来说如果需要在同一个项目中,多个不同的文件中对同一个 Type 的 `fields` 做修改;一般拿来对 `Query and Mutation` 做修改;  
