返回的是一个缓存函数    
const retFunc=useCallback(func,[name])  
依赖变化时.每次返回新的函数.  

### 使用场景
有一个父组件，其中包含子组件，子组件接收一个函数作为props；  
通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，  
我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；  
这样，子组件就能避免不必要的更新  

[useCallback 的例子](https://codesandbox.io/s/yanzheng-useeffect-fggwj?file=/src/App.js)
---------------
更通用的来说,所有依赖本地状态,或者props来创建函数,需要使用到缓存函数的地方,都可以用useCallback;
