### 注意事项
- react中标签的参数使用camelCase;    
- react元素是创建开销极小的普通对象;    
- react DOM会负责更新DOM来与react元素保持一致;    
- ReactDOM.render(element,dom节点)    
- 根据我们的经验，考虑 UI 在任意给定时刻的状态，而不是随时间变化的过程，能够消灭一整类的 bug。
- 组件名称必须要以大写字母开头;  
- 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。  
- class中用this.props,function中用props,定义了state就用this.state.
- setState修改数据后,react重新调用组件的render方法
- 构造函数-->render函数-->didMount-->unMount
- 构造函数是唯一可以给`this.state赋值的地方`
- state的更新可能是异步的,可能把多个setstate合并成一个调用;  
- 因为this.props和this.state肯恩会异步更新,所以不要依赖他们的值来更新下一个状态;
```js
this.setState((state, props) => ({   //上一个state,上一个props为参数
  counter: state.counter + props.increment
}));
```
- state的更新会被合并;
```js
constructor(props){
    super(props);
    this.state = {
        posts:[],
        comments:[]
    }
}
// 这里的posts和comments可以单独更新,另一个不受影响

 componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
- 数据流是单向的,或者从上到下的;
- react事件命名是camelCase的,不是纯小写;
- 为了在回调函数中使用this,有几个方法
```js
// 1. constructor最下面添加这个
this.handleClick = this.handleClick.bind(this);
//2. 在onClick中写,每次渲染时都会创建不同的回调函数,该函数传到子组件时,这些组件可能  
// 有额外的重新渲染
onClick = {()=>this.handleClick()}
//3.定义函数时
handleClick = ()=>{
        this.setState(state=>({
      name:state.name + 'world'
    }))
}
```
- 向handleClick传参数
```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
-  条件渲染,可以把组件存到变量里,  
   或者{ isTrue && 组件 },因为true && exp 返回后面的,false && exp 返回false  
   或者 三目运算符
```js

```
- 阻止组件渲染,如果不愿让它渲染,`return null  `
- 列表渲染
```js
  render(){
    return (
      <div>
        <h1>hello {this.state.name}</h1>
        <button onClick={()=>this.handleClick()}>123</button>
        <h2> It is {this.state.date.toLocaleTimeString()} !!!</h2>
        <ul>
        {
        this.state.numbers.map((num,index)=>       
          <li key={index}>
            {num}
          </li>)
  }
          
        </ul>

      </div>
    )
  }
```
- 列表渲染时,key指定的位置,应该在数组的上下文中,key这个属性在组件内是不可读的,如果它有用,  
再传一个别的属性
### 表单
[react处理表单](https://react.docschina.org/docs/forms.html)
1. input框
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```
2. textArea
```js

  this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'
    };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

<textarea value={this.state.value} onChange={this.handleChange} />

```
3. select
```js
  this.state = {value: 'coconut'};
   handleChange(event) {
    this.setState({value: event.target.value});
  }

  <select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">葡萄柚</option>
    <option value="lime">酸橙</option>
    <option value="coconut">椰子</option>
    <option value="mango">芒果</option>
  </select>

  // select多选
  <select multiple={true} value={['B', 'C']}>  传一个数组
```

4. 在受控组件上,指定value的prop会组织用户更改输入.  
```js
// 这个值不能修改了
<input value ='hi'>  
```


### 状态提升  
数据提升到更高一层的组件中,通过props传到子组件中,然后同时给子组件传递  
`onChange`方法;
[温度计的这个例子](https://react.docschina.org/docs/lifting-state-up.html)

### children类似于slot
{props.children}可以拿到父组件标签中的内容;  
有的时候,在组件中预留几个洞.这种情况下,我们可以不适用children.  
而是自行约定,将所需内容传入props.
```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

### 组件可以接受任意props,包括基本数据类型,React元素,以及函数
如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，  
如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。


- 
- 
- 
- 
- 
- 
- 
- 
- 






### 函数组件
```js
function Welcome(props){
    return <h1>Hello,{props.name}</h1>;
}
```

### class组件
```js
class Welcome extends React.Component(props){
    render(){
        return <h1>Hello,{this.props.name}</h1>
    }
}

```

### 一个时钟组件 
```js
class Clock extends React.Component{
  constructor(props){ 
    super(props);  //将props传递到父类的构造函数中
    this.state = {date:new Date()}
  }
  componentDidMount(){
    this.timerID = setInterval(()=>{
      this.tick();
    },1000)
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }
  render(){
    return (
      <div>
        <h1>hello world</h1>
        <h2> It is {this.state.date.toLocaleTimeString()} !!!</h2>
      </div>
    )
  }

  tick(){
    this.setState({
      date:new Date()
    })
  }

}
```

### 函数和类
[讲类和组件的区别](https://www.jianshu.com/p/26926857ff73)
函数里的方法要加个const fff = ()=>{},  
函数是直接return,类是render函数中返回  
函数组件捕获呈现的值  
#### 捕获数据  
在class中的render函数中拿props   

如果我们想获得某个props或者state的最新值,那么手动更新ref很烦人;  
可以通过effect来自动处理它;  
```js
function MessageThread() {
  const [message, setMessage] = useState('');

  // Keep track of the latest value.
  const latestMessage = useRef('');
  useEffect(() => {
    latestMessage.current = message;
  });

  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  };
  // ...
}
```


### 先写个样子出来,render函数先写.还有数据传输;
将UI和添加交互这两个过程分离开;  

### 是否是state
该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。  
该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。  
你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。  

### 如何更新那些依赖于当前的state的state呢
```js
setState(state=>{
  return {
    count:state.count+1
  }
})
```
### 组件动态class
```js
let className = 'menu';
if(this.props.isActive){
  classNaem +=' menu-avtive';
}
return <span className = {className}> Menu</span>
```

### hook 拿来增强函数,不要写那么多类
组件尽量写成纯函数,如果需要外部功能和副作用,就用钩子;  

- useState()
- useContext()
- useReducer()
- useEffect()

### useState
```ts
function Test(){
 const [buttonText,setButtonText] = useState('click me')
 function handleClick(){
     return setButtonText('are you ko')
 }
 return <button onClick = {handleClick}>{buttonText}</button>
}

```
### userContext
1. 创建Context
`const AppContext = React.createContext({});`  
2. 用 context 标签来封装 需要共享数据的组件  
```ts
<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
```
3. 使用方法
```ts
const Navbar = () =>{
  const {username} = userContext(AppContext);
  return (
    <div>
        <p> {username}</p>
    </div>
  )
}
```

### useReducer(): action 
组件发action给状态管理器,然后管理器用reducer函数计算出新状态;  
`(state,dispatch) => newState`  
引入reducer  
```ts
//  当前值,发送action的函数   == reducer函数,初始值
const [state,dispatch] = userReducer(reducer,initialState)

// 计数器的例子,下面是计算状态的函数
const myReducer = (state, action) => {
  switch(action.type)  {
    case('countUp'):
      return  {
        ...state,
        count: state.count + 1
      }
    default:
      return  state;
  }
}
// 组件代码如下:  
function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}

```

### useEffect 副作用钩子
具有副作用的操作,比如ajax;以前放在componentDidMount,现在可以放到  
useEffect; 用法如下所示:  
```ts
useEffect(()=>{
    // async action
},[dependencies])  //只要这个数组发生变化,useEffect就会执行,第一次也执行
// 第二个参数可省略,这样组件渲染时会执行useEffect


const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You re viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```

### react hook 动机..为什么会有.解决了那些问题  
[react详解](https://react.docschina.org/docs/hooks-intro.html)



























1. 用ts,react写个demo    react hook  
2. apollo相关
3. tower






