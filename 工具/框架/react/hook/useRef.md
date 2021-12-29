### 传统用法
[传统用法,用在dom上](https://codesandbox.io/s/nervous-resonance-zfdkw)
### 存一下上一次的值
```js
const prevValue = useRef();
useEffect((VALUE)=>{
if(prevValue!==value){
  prevValue.current = value;
  }
})
```
