### 介绍
数组的大小自动扩容,提供` O(1) ` 的寻址速度; `resizing factor` 其实就是扩容倍数,例如如果是 2, 原来长度是 5,扩容后 为 10
```js
// 通过修改 length 实现
var array = [1, 2, 3, 4, 5];
console.log(array.length); // 5
array.length--;
console.log(array.length); // 4
array.length += 15;
console.log(array.length); // 19
```

#### 平均插入时间 (均摊 amortized)
`ˈæmərtaɪzd` ,插入 N 的元素时,  
```js
final capacity increase n/2 elements to copy 
previous capacity increase: n/4 elements to copy 
previous capacity increase: n/8 elements to copy 
previous capacity increase: n/16 elements to copy 
......
second capacity increase 2 elements to copy 
first capacity increase 1 element to cop
```
插入 N 的元素的总时间是 `N/2 + N/4 + N/8 + N /16 + ... + 2 + 1 `,平均时间为 ` O(1) `