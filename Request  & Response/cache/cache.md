1. 对于 restful 来说,可以通过 url 以及 args 来实现缓存,(browser,nginx,应用层也可以做)  
2. 对于 graphql,通过 id作为唯一标识符,生成UUID,

从需求出发,自己做设计.然后graphql 满足我们的需求,就用了它;  
#### 问题是什么  
一般在 react 里面,组件A,B 都需要一个来自 API 的数据,如果分别在A,B 中发请求,直觉上并不好.  
一般是一直往上找他们两个的共同父组件,然后发请求.数据透传给子组件;  
这样会导致的问题:  
1. 父组件中请求过多.且它自身并不需要这么多数据,很多都是为了给子组件用;
2. 父组件中的任意一个请求挂掉,都会让它崩溃; 

#### 需求  
1. 更细粒度的数据作用域;在子组件内部自己处理这些数据,而不是全部放倒很顶层的组件上去;  或许是通过缓存,来实现;我们希望数据作用域和 ui 是在一起的;  
2. 描述性更强的数据结构; 可以保证 端到端的类型安全;  前端的类型安全通过 ts 保证,后端也是安全的;如何做到两者交互的安全;  
> 如何保证前端从 API 拿到的数据是类型安全的  
3. 统一的数据拼接方式;  
  一般来说是通过多个接口来拿数据.为了复用,会导致里面有越来越多的不必要的数据;  
  或者会导致请求的数量越来越多;  
  
#### data-layer
我们期望它不依赖浏览器或者 node,可以随时迁移到浏览器或server;   

#### resovler
1. 描述性更强的数据结构 如何解决? 
我们的 response 中只有数据,没有类型,准确来说,一般是 JSON类型;  
我们怎么让response 中的数据带上类型呢;  
先定义类型,`type VM`,然后通过 resolver 把 response 中每个 field 对应的数据 mirror 到类型安全的结果上去;  
type 就像是骨架,数据就像是水,类似于一个补水的过程;  `hydration`    
在这个过程中呢,发现了 resolver 复用的问题,将类型拆分,  
通过动态的 response,配合静态的类型,最终得到 有类型的,动态的值  
map 的 key 是动态的,不好用类型描述,最终转化为数组,可能在 type 上加字段;  

2. 数据拼接方式  
当磁盘类型中没有 name,但是 fisheye需要,所以在 Disk 这个 type 上加了 name,name 的 resolver 中取值;  
```js
name:(parent)=>{
  const response = request.post('v2/get/volumes',{
    query_by:'path',
    volumes:[parent.path]
  })
  return response.name;       // 这个值对 fisheye 是透明的.它不关心从哪里来,只关心有没有;
}
```

2.2. resolve everywhere  把差异都抹平在 resolver function 中了  
![图片](https://s3.ax1x.com/2020/11/15/Di4VAA.png)  

2.3 按需惰性查询  
按需: 指定的字段才查询  
惰性: name 没用到,就不去查询  
按需查询的语法解决了封装无数中可能性的问题   
数据拼接的问题,把拼接放到了 data layer 这一层,它去关心数据在哪里来的,并且获得他; fisheye 只是指定想要的 field 就可以;  

3. restful 的缓存很容易做,在浏览器,nginx,应用层都可以做  
这种通过 resolver 的方式的缓存如何来做;简单来说,通过什么来唯一标识一个请求;(极致的拆分,和标识)  
3.1  用 field 来做标识  
```js
query{                      query{
   getVm(id:"1"){              getVm(id:"1"){
     vm_name                      vm_name
     vmstatus                   }
   }                        }
}                         
```
左侧请求会形成的缓存:  
```js
query-getVm(id:"1")-vm_name  :  "vm1"  
query-getVm(id:"1")-vmstatus  :  "runnung"  
```
3.1.1 可能有的问题  
1. 缓存更新问题(时间问题)  数据可能会过期   
定时 polling 可以保证数据在一段时间内足够新;  
ui 更新的时候,更新 server,以及缓存  
2. 不同的请求拿到的数据中有相同的;  
例如 getvms (first:0,limit:1), 和 getvms(id:"1") , 但是很难确认这两者的数据是相同的.情况太复杂了;  
所以引入 id 这种唯一标识(可能值是 uuid,id,path等唯一的值),来完善单纯以field 来做标识的情况;  
如下所示:  使用 typename + id 来做唯一标识,确保数据唯一性,并且通过引用,让数据被其它 field 知道  
![图片](https://s3.ax1x.com/2020/11/15/DibNdS.png)  



### 缓存策略  
![图片](https://s3.ax1x.com/2020/11/15/DiTHeS.png)  

### 缓存一致性对 UI 的作用  
UI 会订阅缓存中的数据,订阅是自动的,订阅是通过请求来标识的,发的请求是什么,就会订阅什么  
数据通过 typename 和 id 来唯一标识了,然后更新唯一的一份数据之后,订阅了这份数据的 ui,就会自动更新数据;




### 不太顺利完成的事情  
1. HTTP 请求缓存  
K,V 这一层  , 为了解决  在同一个 UI 内为了节约字段, 而实际发出了更多请求这种场景  这两个请求看似节约  实则浪费    
这个缓存浏览器自己可以做,但是 datalayer 可能拿到后端,所以就不依赖浏览器来做  
![l](https://s3.ax1x.com/2020/11/15/DiLgC4.png)
这里面的 store update  subscription 很重要  

2. resolver 批量执行  
![d](https://s3.ax1x.com/2020/11/15/DiOssI.png)  
这里如果拿50条数据,然后每个 disks 中有4个盘,就会发200个请求  
把某次 fields 中 同一批获取 vmDisks 的resolver 的调用,按一下方法处理:  
- resolver 调用之后,不立即发请求,而是放到 微任务队列里;  
- 等到本次所有的 resoler 都放到微任务队列之后,微任务队列中的 resolver 开始执行;
- 执行第一个,会判断 宏任务队列中有没有 宏任务,没有的话,建立一个宏任务,把微任务的参数传给它,  
- 第二个, 已经有宏任务了,就把当前的微任务的参数附加到 已有的宏任务的参数中去  

我们的 resolver 是对接 http API 的,其他的一般是对接  DB,
3. HTTP 请求去重  
两个请求 拿到的值类型相同; 但是 server 没有 batch 接口;我们就 list all.  
为了防止两次 lish all  
inflight 中维护 已经发出去,还没返回的请求;  第二次就不会请求,而是订阅前面的这个请求;  

4. 性能 tracing
client 可能写性能很差的 query  

 
