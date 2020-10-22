1. 在父组件中拿到子组件的 dom,来 focus,或者选中,或者动画效果   
  ref 转发  

```js
const Father:React.FC = (props,ref)=>(  //父组件
<div>
  <input type = "text" ref = {ref} />
</div>
)

// 在另一个组件内
const ref = CreateRef();
<Father  ref = {ref} />
现在 ref.current 指向 Father 中的 input 这个 dom  
```
  
  
