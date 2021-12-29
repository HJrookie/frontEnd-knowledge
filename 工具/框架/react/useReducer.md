这个不是必须的  只是说更好用了  
```js
const [state, dispatch] = useReducer(reducer, initialState)
```
然后我们在需要的时候去dispatch一个action 改变state的值  
它的缺点是子组件不能方便的访问state  

用useSelector和useDispatch来解决这个问题
