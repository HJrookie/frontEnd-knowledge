### 做什么的
返回一个可变对象,current属性的值为initialValue,返回的值将会在组件的生命周期内保持不变;  

### 例子
value用useState(0)来初始化,然后一个button点击后value+1,另一个button,点击后3秒后打印vlaue的值,  
value为5时,点击该button后,再增加value的值,最终alert的还是5  [demo](https://codesandbox.io/s/createref-and-useref-forked-le02q?file=/src/App.js)
#### 原因
每次我们改变value的值,组件重新渲染,handleClick函数也重新渲染了;value的值也是独立的,  详解待定todo  
### 能不能alert最新的值  
[用useRef来做](https://codesandbox.io/s/createref-and-useref-forked-qok2f?file=/src/App.js)  
// 这里修改ref.current的逻辑可以放到useEffect中,
useRef可以在多次render中做到持久化  

- 直接修改 ref 的值不会触发组件渲染
[ref值修改后不会触发组件渲染的demo](https://codesandbox.io/s/createref-and-useref-forked-jjkg2?file=/src/App.js)

