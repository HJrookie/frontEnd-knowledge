### 简介
store里面存了很多数据,
```js
const store = createStore(func|param);
```

- 这些数据在某一个时刻的状态,用state来描述.某一个state,通过`const state = store.getState()`;  
state和view是一一对应的. 

- state的变化,会引起view的变化,但是用户只能接触到view,view的变化需要引起state的变化,  
这通过`Action`来实现;Action是用户发出的通知,表示state应该要变化了.
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
因此在创建的时候需要把reducer传给store,例如`store.

- reducer中的不能修改state,必须返回一个全新的state.可以使用`Object.assign`或者`[...state,newItem]`

- store.subscribe(func) 当state变化时,自动执行该函数.可以把组件的更新函数放进去,比如render,或者setState..  













