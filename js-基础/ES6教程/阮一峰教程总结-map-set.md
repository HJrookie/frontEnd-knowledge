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
