#### 创建
`new Set(数组或者类数组)  ([1,2,3]) 或者直接传字符串   `
#### set.size  add() delete()  has()  clear()
返回值:  长度,  新值,   删除成功?  布尔   无
### keys,values,entries,forEach
结果的顺序是插入顺序,
ks,vs,ens,返回 iterator,它的 k,v 是相同的    

#### 对set map 和 filter  
`new Set([...set].map(v=> (____) ))`
#### 交集 并集 差集
```js
var s1 = new Set([1,2,3]),s2 = new Set([2,3,4]);
// 交集
new Set([...s1].filter(v=>s2.has(v)));
// 并集
new Set([...s1,...s2])
// 差集1
new Set([...s1].filter(v=>!s2.has(v)))
```

### WeakSet
里面只能放对象,当没有别的地方引用它时,下次gc 的时候,就会被 移除;因此,它不能迭代;  
```js()
const ws = new WeakSet([[1,2,3],[3,4,5]])
const ws2 = new WeakSet([[]])
const ws3 = new WeakSet([new Array()])
// 里面必须是对象,
const ws4 = new WeakSet([{}])
```
#### add delete has 方法

#### Map
为了解决 对象的 key 只能是字符串或者 数字的问题,按照内存地址来分辨是否是同一个 key  
认为` +0 === -0`,` NaN === NaN`
`const map = new Map(二维数组)`,可以从 map 创建新 map,`new Map(m)`  
或者从 set 创建 `new Map(set.entries)`
#### size set,  get, has, delete clear
数字     新的map  值  bool   bool  无
set 可以链式调用,

#### keys values entries forEach
顺序是和插入顺序一致,entries 作用不大, 直接`let i of map`  
转数组 `[...m.keys()]  [...m.values()]  [...m.entries()] 等于 [...m]`  
然后类似 set,使用 map 和 filter  

#### 其它容器转换
map => arr `[...map] [...map.keys()] [...map.entries()]`   
arr => map `new Map(二维数组)  new Map([[],[1,2,3,4]])`  
map => 对象  
```js
[...map].reduce((prev,cur)=>{
  prev[cur[0]] = cur[1];
 return prev;
},{})
```
对象  => map  
```js
new Map(Object.entries(obj))  // 或者自己写
```

map=> json  
转数组 json `JSON.stringify([...m])`  
转 对象 json, `JSON.stringify(toObj(m))` 

json=> map  `JSON.parse(json)得到对象,对象再转 map`
