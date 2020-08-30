### 成因
1. 数据的影响范围一般来说大于单个组件.随着视图越来越复杂,组件之间的数据依赖关系,也越来越复杂.dashboard这种场景中需要很多数据,例如需要版本号,  
在设置页面中的软件升级中也依赖版本信息做是否可以升级的判断,一般是在这两个组件渲染之前发请求获取数据,  
让这两个组件共享该数据.  
很多时候,随着复杂度的提升,我们很容易将越来越多获取数据的操作放置到更高层   
的组件中,结果就是打开根组件时越来越慢,一个请求的异常,可能导致整个页面无法工作;  

我们期望一个数据的作用域和该组件的生命周期完全一致,并且为了减少不必要的请求,数据如果可以缓存,就可以大大减少请求的数量;  

2. 一般后端都是拆的很零散的,比如像微服务这种架构,互相通过http协议来通信;  
但是他们的数据的格式很难统一,返回的数据结构,一般并不是和我们所需要的数据的格式完全一致;  
因此很多时候,前端需要对数据做不同程度的转化,我们期望前端代码可以统一的,维护转化后的数据结构.并且以一种易于描述,较为符合只觉得格式进行书写;  
3. 多个接口的数据拼接  
一般来说,需要请求多个接口,用promise.all或者allSettled,或者race,或者any,从一个接口拿到数据,再去请求另一个接口;

4. 缓存.前端如果缓存做得好,可以减少很多不必要的请求;  
  我们期望以下能力:  
1. 从不同数据结构中识别相同的数据源,  
2. 缓存可以主动更新.新上传镜像时,主动更新镜像列表  
3. 可以定时更新部分缓存

### 为什么引入data layer层  
上面的需求,我们可以继续封装APIRequest模块,或者增加要给独立的gateway service,  
最终我们希望最终的实现可以满足以下几点需求,  
1. 对业务逻辑透明，在编写业务代码时可以认为对接的是一个 gateway service。  
2. 运行在浏览器内，暂时不增加后端服务。一方面不给产品整体带来额外的开销，另一方面也减轻部署、高可用等方面的工程成本。  
3. 随时可以从浏览器内迁移至单独的后端服务，减少请求的往返开销。  
```js
                Backend Service
     Server             |
------------------------|-------------------------
     Browser            |
                    Data Layer
                     Fisheye
```
data layer不依赖任何浏览器的API,从而保证他可以随时被移植到NodeJS环境中;  
```js
                Backend Service
                    Data Layer
     Server             |
------------------------|-------------------------
     Browser            |
                     Fisheye
```

### GraphQL应运而生  
例子:
```
type vm{
    vm_name:String!
    status:Stirng!
    cpu:{
        topology:{
            cores:Int!
            sockets:Int!
        }
    }
    disks:[{
        boot:Int!
        bus:String!
        type:String!
        path:String!
    }]
}
```
data layer层收到上面的请求之后,就会解析,转换成rest api请求,去调接口.  
每个字段的key为field,值是value;field resolver 就是个函数,在里面,去请求  
某个field对应的value;  
### 数据结构允许嵌套会带来的问题
1.field 中需要需要包含嵌套路径，避免冲突，例如磁盘类型本身 key 值为 type，那么实际的 field 应该为 VM.disks.type。  
2. field 包含嵌套路径会导致其对应的 resolver 不能很好的被复用，例如直接请求虚拟机磁盘时，由于嵌套层级不同，磁盘类型的 field 可能会变为 Disk.type，无法复用 VM.disks.type 的 resolver  

避免嵌套可以通过拓展value的基础类型或者拆分来做;  
拆分比较好;
```js
type VM {
 vm_name: String!
  status: String!
 cpu: Cpu!
 disks: [Disk]!
}

type Cpu {
 topology: Topology!
}

type Topology {
 cores: Int!
 sockets: Int!
}

type Disk {
 boot: Int!
 bus: String!
 type: String!
 path: String!
}
```
这样子,我们可以保证每个结构体都是扁平的.resolver也只用关注自身逻辑,  
而不需要感知再最终数据结构中所处的层级和位置;

### resolver和入口
如果我们有了一个虚拟机的数据,vm_data,那么获取vm_name对应的resolver就是    
vm_data => vm_data.vm_name;绝大多数都是这样子的.它也是defaultResolver;  
磁盘启动顺序boot的resolver如下所示:    
`vm_data => vm_data.disks[0].boot`  
但是这样子并不好.

1. 使用 0 作为 index 访问磁盘数组，不同 index 的磁盘就需要不同的 resolver。  
2. 实际需要判断磁盘数组长度，如果为空数组，需要做特殊处理。 
3. 与嵌套路径相关，直接获取虚拟机磁盘时无法复用这个 resolver。   

这些问题,我们只需要讲resolver的参数由root value改为其上一层resolver的返回值,  
也就是parent value,例如boot resolver就会变成parent=>parent.boot;  
###  查询入口
```js
type Query {
  vm(id: String!): VM
}



async (parent, args) => await fetch(`/v2/vms/${args.id}`)

```

### 数据拼接  
```js
type Disk {
 id: String!
 boot: Int!
 bus: String!
 type: String!
 path: String!
 name: String!  //新增的
}
```
然后在Disk的name resolver中发请求,获取对应的单个volume数据.并返回volume.name,
```js
Disk:{
    name: async (parent) =>{
        const data = await request('/v2/batch/volumes',{
            method:'POST',
            body:JSON.stringify({
                query_by:'path',
                volumes:[parent.path]
            })
        });
        return data[0].name
    }
}
```

### Batch resolver
上面的resolve可以按需拼接,当需要查询name field的时候,才发出对应的拼接请求;  
但是这样的resolver,不能很好的利用我们的批量请求接口,产生大量额外请求;  
所以我们让这种resolver延迟执行,当所有resolver的请求收集完之后,再汇集参数,发出一个批量请求;  
```js
改造之后,我们的resolver代码可以被改写为这种形式  
Disk: {
 name: createBatchResolver(async parent => {
   const volumePaths = parent
     .filter(disk => disk.type === "disk")
     .map(disk => disk.path);
   const data = await request("/v2/batch/volumes", {
     method: "POST",
     body: JSON.stringify({
       query_by: "path",
       volumes: volumePaths
     })
   });
   const volumeMap = {};
   data.forEach(volume => {
     volumeMap[volume.path] = volume;
   });
   return parent.map(disk => volumeMap[disk.path].name);
 });
}

```

### 缓存  
http请求 先到 kv store,再到 normalized data store,  
前者是网络请求,后者是转化,拼接后的normalized data store,  
```js
query {
 vm(id: "1") {
   vm_name
   status
   disks {
     name
   }
 }
}
```
在通过 batch 接口获取磁盘对应的卷的情况下，这样的一次查询会对应 2 次 HTTP 请求，如果没有 batch 接口，则会对应 1 + n 次 HTTP 请求。这里的n感觉是磁盘的个数?    
对于业务逻辑的实现者而言，很难从上述一次查询中察觉 data layer 实际发出了多次请求，并且容易基于过往的经验错误估计一次查询的开销。

### 为了确保缓存命中率,需要一个东西,来标识我们查询的字段   
1. 用field路径来做  
上面例子中的 `query-vm(id:'1')-vm_name`,这样子做也不错的.  
只要field的路径可以对上,那么就可以实现缓存的命中;  
但是不足之处在于,如果我们用两个不同的查询条件去查询一些数据:  
1. 虚拟机列表,
```js
query{
    vms{
        vm_name
    }
}
and
query{
    vm(id:'1') {
        vm_name
    }
}
```
两次查询的结果中都会包含id为1的虚拟机的名称,但是由于vm_name对应的field路径不同,  
所以按照第一种策略,是不能识别为同一个数据源的.在查询的时候,这一设计是可以接受的.
但是当数据更新之后,例如虚拟机名称更新之后,如果缓存还是命中了,就会产生问题.  
### 用结构体类型和唯一标识组成cache key
以上为例子,我们把vm的数据,放在类型和id组成的cache key下,形式为  
```log

[vm:1]: vm_1_data;  

```
在实现中,我们可以默认使用id来做唯一标识,对于后端返回的数据中没有id的,我们可以  
实现一个id resolver来将其他的唯一标识转为id.例如DIsk:  
```js
Disk:{
    id(parent){
        return parent.path
    }
}

```
这样子,不论我们在何处更新虚拟机名称,data layer都会将新的名称通过cache key更新到唯一的数据源,
保证所有依赖vm:1的ui都是最新的结果;  
不过有的时候,我们也会遇到完全没有唯一标识的结构体,所以实现中,两种策略会同时作用.二优先;

### kv store
一些post请求不会被缓存,一些missing的请求,需要再发出一个请求,来扩充缓存的结果;  



### 一些工具
GraphQl-tools可以生成可执行的GraphQL schema,然后Apollo-link-schema可以将生成的schema  
以link的方式挂载到Apollo-client上去进行使用;  
Apollo-chache-inmemory是内存中实现的normalized-data-store;  
GraphQl-tag将查询片段转化为JS对象,传递给apollo-client进行使用;  
Create-batch-resolver,自己实现的高阶函数.对应batch resolver部分;














