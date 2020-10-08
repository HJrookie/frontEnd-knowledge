### 简介
store里面存了很多数据,
```js
const store = createStore(func|param);
```

- 这些数据在某一个时刻的状态,用state来描述.某一个state,通过`const state = store.getState()`;  
state和view是一一对应的. 

- state的变化,会引起view的变化,但是用户只能接触到view,所以，State 的变化必须是 View 导致的.view 变化后,用 action 通知 state ;  
Action 就是 View 发出的通知，表示 State 应该要发生变化了。
```js
// action例子
const action = {
  type:'Add something',
  payload:'hellowrold'
}
```
- store.dispatch可以发出Action  
```js
store.dispatch({
  action:'add',
  payload:'12'
})
// 或者action由一个函数来生成  
function addTodo(text){
  return {
    type:'add',
    payload:text
  }
}
// 然后再调用
store.dispatch(addTodo('eat something'))
```

- reducer  
store收到Action之后,必须给出一个新的state才行,这样view才能变化,新的state的计算过程,叫做reducer  
```js
const reducer = function(curState,action){
  const newState;
  .....
  
  return newState
}
```
reducer函数不用手动调用,它会在`store.dispatch(action)`的时候自己触发,因此需要告诉store对应的reducer是谁,  
因此在创建的时候需要把reducer传给store,例如`store.createStore(reducer)`

- reducer中不能修改cuRstate,必须返回一个全新的state.可以使用`Object.assign`或者`[...state,newItem]`

- store.subscribe(func) 当state变化时,自动执行该函数.可以把组件的更新函数放进去,比如render,或者setState..  


- reducer的拆分  
combineReducers可以将多个子reducer合并成1个reducer,
```js
const appReducer = combineReducers({
  chart: chartReducer,
  modal: modalReducer,
  upload: uploadReducer,
  table: tableReducer,
  task: taskReducer,
  globalSearch: globalSearchReducer,
});
// 这种写法是可以的,但是要求state中的key和combineReducers的参数中的那个对象的key一致;
```
- 理解:
  > combineReducers 里的参数是个对象,v 是对应的 reducer,然后 combineReducers 的结果是一个大的 reducer 函数,  
  > 该函数接受 state 和 action 两个参数,返回新的 state.内部实现还不清楚(todo)  
  > actions 数组可以调用 reducer 作为 reduce 函数的参数








