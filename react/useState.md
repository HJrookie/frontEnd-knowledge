### useState
```js
 const [count, setCount] = useState(0);  //数组解构  
 // 等同于下面的写法
 var fruitStateVariable = useState('banana'); // 返回一个有两个元素的数组
 var fruit = fruitStateVariable[0]; // 数组里的第一个值
 var setFruit = fruitStateVariable[1]; // 数组里的第二个值
 
```
### 注意事项 
```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 这个 effect 依赖于 `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` 没有被指定为依赖

  return <h1>{count}</h1>;
}
// 自己写了个类似的..但是应该有区别
function father(tt){
let a=tt;
return function(value){
    a=value+1;
    
    return a;
}
    
}
let vv = 12;
let test = father(vv);
function test2(v){
    setInterval(()=>{
    console.log(test(v))
},1000)
}
test2(vv)   // 每隔一秒打印13

```
传入空的依赖数组 []，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。但如此会有问题，在 setInterval 的回调中，  
count 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 count 的值被保存在该闭包当中，  
且初值为 0。每隔一秒，回调就会执行 setCount(0 + 1)，因此，count 永远不会超过 1。

------------------
指定count为依赖可以解决此问题,
