# 以下生命周期方法仅仅针对 Component组件
[将组件周期的文章,还没看](https://juejin.im/post/6844903510538977287)
### 有哪些
componentWillMount          类似于unmount.猜测有ODM模板,但是没有渲染数据上去  
componentDidMount           组件已经渲染到DOM中去了  
componentWillUnmount  

[生命周期方法详解-react文档](https://zh-hans.reactjs.org/docs/react-component.html#forceupdate)

### 顺序  -->挂载时
1. constructor    进行数据的初始化  
2. static getDeridedStateFromProps())  
3. render()  
4. componentDidMount

### 顺序 更新时-->
当组件的props或者state变化时会触发更新,组件更新的生命周期调用顺序如下: 
- static getDerivedStateFromProps()  
- shouldComponentUpdate()  
- render()    
- getSnapshotBeforeUpdate()  
- componentDidUpdate()   

### 顺序 卸载时-->
componentWillUnmount  

### 顺序 出现错误时-->
- static getDerivedStateFromProps()  
- componentDisCatch()





### 一些方法或者生命周期的解析 
- forceUpdate()    
默认时,当组件的state,props变化时,组件重新渲染;如果render方法依赖其他数据,则可以调用该方法;  
调用forceUpdate方法会让组件调用render方法,此操作会跳过该组件的shouldOCmponentUpdate方法,但是其子组件  
会触发正常的生命周期方法;包括 shouldComponentUpdate

- 
