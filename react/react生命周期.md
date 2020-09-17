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


