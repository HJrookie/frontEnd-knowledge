1. 父子组件之间,一般都是传一些数据,或者传方法,例如 onChange,onClose,或者直接传组件,[直接传递 Avatar 组件](https://zh-hans.reactjs.org/docs/context.html),
2. 有些组件无法提前知晓它们子组件的具体内容。在 Sidebar（侧边栏）和 Dialog（对话框）等展现通用容器（box）的组件中特别容易遇到这种情况。这时候适合用 children 属性;  
```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}    // 这样子把组件中的内容渲染出来
    </div>
  );
}
```
3. render props  
> 一个组件里的某一部分不确定到底是什么,都让外部传. // todo  不严谨,不明白,应该错了
```js
const Inner = (props)=>{
  return (
    <>
      <div> 123</div>
      {props.render(组件内部的数据)}
    </>
  )
}

/* 使用 Inner 的时候 */
<Inner render={(data)=>(
  <div someData={data}> 55</div>
)}>
```
 - 每个 jsx 元素都是 React.createElement的语法糖    
 - createRef  可以创建一个 ref  `const ref = createRef(); <input type="text" ref = {ref}>  re.current.focus()获得焦点`    
- forwardRef 创建一个
