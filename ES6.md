### ... 运算符
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
// 例子2
var name = "bo";
var a={name,age:18}  //这里相当于直接把name当作kv传了进去 
console.log(a)  //{name: "bo", age: 18}
```
### Object.assign()
```js
var obj1 = {
  name: '123',
  test: {
    age: 12
  }
}

var obj3 = {
  get getMethod() {      //这里的getMethod会成为新对象的key,返回值会成为value
    return '123'
  },
  meth() {
    console.log('haha')
  }
}
var target = Object.assign(obj1, obj3)
console.log(target) // =>{name: "123", test: {…}, getMethod: "123", meth: ƒ}    target.getMethod()会报错，原因是发生了转换
```
### let相关
1. TDZ (Temporary Dead Zone) 临时性死区
```js
console.log(typeof test)  //undefined
var test =1;
// 如果换成let
console.log(typeof test)  //Reference Error,..is not defined
var test =1;
```
