## 组件可以接受任意 props，包括基本数据类型，React 元素以及函数。
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

### 组合和继承,包含  
#### 包含关系 

其实就是 children,定义一个组件时,不知道它的子组件可能是什么,因此将 props.children 直接渲染到 jsx 上,    

大概是 `<div>{props.children}</div>`   

----------

当然,有的时候需要在组件上留几个洞,这时候可以不用 children,可以用`left,middle,right` 或者`name,title,content` 这种的,  
大概是`
const Father:React.FC<FatherProps> = (props)=>{
const {left,middle,right} = props;
  return (
  <div className = "outer"> 
    <div className = "inner-left"> 
      {left}
    </div>
    <div className = "inner-right"> 
      {right}
    </div>
  </div>
  )
  
}
// 使用时
<Father left = {<Left /> } 
  middle = {<Middle />} 
  right = {<RIght />}
  />
`

#### 特例关系  
WelecomeDialog是 Dialog 的特例,Dialog 是更通用的组件,那么可以先定义 Dialog 组件,它提供一些定制化参数,    
然后 WelecomeDialog 组件通过这些参数来配置 ;  
```js
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```


 - 每个 jsx 元素都是 React.createElement的语法糖    
 - createRef  可以创建一个 ref  `const ref = createRef(); <input type="text" ref = {ref}>  re.current.focus()获得焦点`    
- forwardRef 创建一个

