### useEffect 
### react中两种常见的副作用操作(需要清除的和不需要清除的)
### 无需清除的effect
我们只想在 React 更新 DOM 之后运行一些额外的代码。比如发送网络请求，手动变更 DOM，   
记录日志，这些都是常见的无需清除的操作。因为我们在执行完这些操作之后，就可以忽略他们了
### 需要清除的effect  
例如订阅外部数据源;  
一般是在componentDidMount中添加订阅,在componnentWillUnmount清除订阅;  
如果用effect来做,
 ```react
 useEffect(()=>{
 subscribe();
 // 可选的清除机制,返回一个函数,该函数在组件卸载的时候以及每次重新渲染的时候执行,
 return function(){
 // clean up
 unSubscribe;
 }
 })
 ```
### 小结
在一个effect中做一件事,注意时间;原来是把一件事儿拆到不同的生命周期中去做;
### 执行顺序问题
1. 组件挂载. sub.  
2. 组件更新,或者props更新.  先执行unsub清除上一个effect,然后再执行sub,  
3. 组件unmount,执行unsub,清除effect,事情结束了
### 性能优化  
如果每次数据更新,都执行effect,性能较差.如果用class,我们通过比较prevProps和现在的props,来进行增量更新;  
通过给useEffect传第二个参数,当第二个数据变化时,才执行effect;第二个参数中有多个数据时,其中一个发生变化,effect就执行  
这对于有清除操作的effect同样适用;  
>如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量
```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅
//friend.id变化时,才先执行清除的函数,然后执行订阅的函数
```
### 注意事项
用useEffect时,内部调用的函数尽量在useEffect中定义,这样子方便我们找到该函数对props和state的依赖,然后把这些依赖添加到[]里  
### 细节
1. `useEffect(()=>{})`  
func在挂载,每次数据更新(即组件重新渲染),卸载时执行
> 如果在 useEffect 中取更新数据,那么会触发死循环,因为数据更新之后 effect 会再次执行
2. `useEffect(()=>{},[])`  
func在挂载,卸载时执行  
> 这种情况下可以在 effect 中更新数据
3. `useEffect(()=>{},[name])`  
func在挂载,name每次变化,卸载时执行  
4 `useEffect(()=>{},[name,age])`   
func在挂载,name或者age中任意一个变化,卸载时执行

- `()=>{}`的写法,代表每次都是新的函数    
- 
