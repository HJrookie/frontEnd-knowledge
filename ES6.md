### ...运算符
这个运算符用在数组或者对象里
```js
//1. 数组 (直接跟字符串)
var array = [1,2,3,4,5,..."hello"]
console.log(array)  // ==>[1, 2, 3, 4, 5, "h", "e", "l", "l", "o"]
//2. 数组 (后面跟变量)
var str = "test"
var array = [1,2,3,4,5,...str]
console.log(array)  //[1, 2, 3, 4, 5, "h", "e", "l", "l", "o"]  
//3. 对象
var name = "bo";
var a={...name,age:18}  //这里等同于 var a={..."bo",age:18}
console.log(a)  //{0: "b", 1: "o", age: 18}
```
