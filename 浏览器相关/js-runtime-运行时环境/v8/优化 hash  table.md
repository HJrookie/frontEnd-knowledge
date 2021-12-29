### hash 算法
hash 算法的几个特点: 
- 不同的 input,得到不同的 output,并且即使 Input改动很小,output 变化很大  
- 很难通过 output 反推出 input
- 接受任意长度的输入,得到固定长度的输出
- 效率一般比较高

 #### v8 的实现  [来源文章-状态不好-先不看-todo](https://v8.dev/blog/hash-code)
key ----> 通过 hash 算法----> hash code, v8 中的hash code 是随机数,和对象的值无关  
一般其他的属性寻址都会使用`IC system(Inline Caching)`,  但是当数据的类型是同一类型时,`monomorphic IC lookups`可以提供很快的寻址速度;  
但是当元素的类型不同时(例如 `[1, "a", 2, "b", 3, "c", 4, "d"];` ),`monomorphic Ic lookups `就会在
 `"uninitialized" and "monomorphic" states` 状态之间频繁切换,非常影响性能;   
 因此 大多数 对于`MIC` 的实现,都会增加第三种状态,`megamorphic state `,当它预见到多个不同类型时,就会自动切换 到第三态;  
 这个状态下,它的表现和 `未初始化 `时相同,但是不会向 `monomorphic` 状态切换     
 有的一些实现,会在 处于 `uninitialized` 一段时间后, 或者 `GC` 执行完之后,切换到 `monomorphic 状态`  

```js
// 生成 hash 的算法
function GetObjectHash(key) {
  let hash = key[hashCodeSymbol];
  if (IS_UNDEFINED(hash)) {
    hash = (MathRandom() * 0x40000000) | 0;
    if (hash === 0) hash = 1;
    key[hashCodeSymbol] = hash;
  }
  return hash;
}
```

