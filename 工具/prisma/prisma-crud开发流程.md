### CRUD 开发流程


#### 需求  
现在有个 TestUser{
  id :  ID
  data : Json
}
1. 将 Test 的 data 这个字段重新定义一下;  将它改成一个对象, 包含 `name : stirng; age: number` 这两个字段,并且 age 显示出来的值 比 实际值 大 1    
2. 在 data 上新增 computedField 字段,让他显示 `name is xxx, age is xxx `   
3. 假如创建 TestUser 时传的 age 的值是1, 希望数据库中存的值是 11 

#### 如何实现
1. 去 datamodel 中增加 type,然后更新服务,让 prisma 自动生成 api  
2. 修改 prisma 生成的类型上的一些字段,来满足我们的需求  (因为 prisma 生成的类型都是很规范的,与实际需求有差异,所以我们需要对他进行一定程度的修改)    
3. 写对应的mutation 或者 query 

#### 1. 在 datamodel 新增 type
1. 在 datamodel.prisma 中新增 type TestUser  

```js
type TestUser{
  id: ID! @id
  data: Json
}
```
然后在 server 目录下运行 `yarn prisma deploy -f`,以及 `yarn generate ` 就可以让 prisma 帮我们自动生成
CRUDe 的 API;
运行之后, nexus.d.ts,schema.graphql, prisma-orm.ts 等 文件中都会新增 TestUser 相关的操作  


#### 2. 用 nexus 提供的一些函数来修改 prisma 生成的类型
1. 重定义 TestUser 这个 type 上的 data 属性, nexus 提供的 objectType 可以用来定义类型,prismaObjectType 可以在已有对象的基础上做修改    

```js
// 定义类型
const TestUserDataType = objectType({
  name: "TestUserDataType",   
  definition(t){
    t.string('name')    // 这两个字段默认都是必传的
    t.int('age', {
      resolve(parent, args, ctx) {
        return parent.age + 1;      // 修改 age 字段的返回值
      },
    })
    t.string('computedField',{
      resolve(parent,args,ctx){
        return `name is  ${parent.name} , age is ${parent.age}`   // computeFild 字段
      }
    })
  }
})

const TestUser = prismaObjectType({
  name: "TestUser",
  definition(t){
    t.prismaFields(['*'])
    t.field('data',{
      ...t.prismaType.data,
      type: TestUserDataType    // 引用上面定义的类型
    })
  }
})

```

#### 3. 需求三需要对请求的参数做一些处理,因此要去 写对应的 Mutation
```js
export const CreateTestUserDifinition = (
  t: PrismaObjectDefinitionBlock<'Mutation'>
) => {
  t.field('createTestUser', {
    ...t.prismaType.createTestUser,
    async resolve(parent, args, ctx) {
      // 这里对 创建的参数做处理
      const newArgs = {
        ...args,
        data: {
          age: args.data?.data.age
            ? args.data?.data.age + 10
            : args.data?.data.age,
        },
      };
      const result = (
        await orm.createTestUser({
          ...newArgs,
        })
      ).unwrap();
      return result;
    },
  });
};
```
#### 关于更新操作
```js
const TestUserUpdateInput = prismaInputObjectType({
  name: 'TestUserUpdateInput',
  definition(t) {
    t.field('data', {
      type: TestUserInputType,
    });
  },
});

export const UpdateTestUserDifinition = (
  t: PrismaObjectDefinitionBlock<'Mutation'>
) => {
  t.field('updateTestUser', {
    ...t.prismaType.updateTestUser,
    // type: TestUser,  会修改返回值类型
    async resolve(parent, args, cts) {
      if (!args.data?.data) {
        throw new ServerError({
          code: ServerErrorCode.TEST_USER_NOT_FOUND,
          msg: `test_user ${args.where.id} not found`,
        });
      }
      // 这里对 修改的参数做处理
      const newArgs = {
        ...args,
        data: {
          data: {
            ...args.data.data,
            age: args.data.data?.age,
          },
        },
      };
      console.log('new args', newArgs);
      const result = (await orm.updateTestUser(newArgs)).unwrap();
      return result;
    },
  });
};
```

#### 关于删除操作
默认的 ` deleteTestUserWhereUniqueInput ` 是根据 id 去查询的,一般情况不用修改;  
如果说需要提供根据 其它 unique 的 字段去查询的话,就可以修改他  

#### 关于查询操作  
一般也不用修改;默认的就可以;如果要修改的话,按照下面的格式写   

```js
export const TestUserQueryDefinition = (
  t: PrismaObjectDefinitionBlock<'Query'>
) => {
  t.field('testUsers', {
    ...t.prismaType.testUsers,
    list: true,
    async resolve(parent, args, context) {
      const { orderBy, where, last, first, skip } = args;

      const testUsers = (
        await orm.testUsers({
          orderBy: 'id_ASC',
          last: toOptional(last),
          first: toOptional(first),
          skip: toOptional(skip),
          where: toOptional(where),
        })
      ).unwrap();

      if (!testUsers) {
        throw new ServerError({
          code: ServerErrorCode.TEST_USER_NOT_FOUND,
          msg: 'cannot find test users',
        });
      }
      const formattedTestUsers = testUsers.map(testUser => {
       
        return {
          id: testUser.id,
          data: {
            name: testUser.data.name,
            age: testUser.data.age + 1000,
            computedField: `the name is  ${testUser.data.name} --- the age is  ${testUser.data.age}`,
          },
        };
      });
      return formattedTestUsers;
    },
  });
};
```



