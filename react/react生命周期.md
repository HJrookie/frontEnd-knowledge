### 有哪些
componentWillMount          类似于unmount.猜测有ODM模板,但是没有渲染数据上去  
componentDidMount           组件已经渲染到DOM中去了  
componentWillUnmount  


### 顺序  ->挂载时
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





