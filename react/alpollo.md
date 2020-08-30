### graphql中的resolver
resolver是个函数,可以为schema中的单个字段填充数据;  
这个函数返回两种值:  
- resolver对应的schema中的字段需要的那种类型的数据  
- 一个promise,resolve需要的数据

### resolver
```js
fieldName: (parent, args, context, info) => data;
```
- parent:这个字段的parent的resolver的返回值;parent的resolver先执行
- args: 这个字段的所有的graphql 参数
- context:所有resolver共享;用来做授权,访问数据源;
- info:包含操作的执行状态,比较少用
