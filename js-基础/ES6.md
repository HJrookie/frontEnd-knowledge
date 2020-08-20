### ... 扩展运算符
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
// 例子2,混合变量变量的值,不用....运算符
var name = "bo";
var a={name,age:18}  //这里相当于直接把name当作kv传了进去 
console.log(a)  //{name: "bo", age: 18}
// 例子3,混合对象的时候要用扩展运算符
var a= {'a':1,"b":2};
var b={'bb':22};
var c={...a,...b};
c;  // {a: 1, b: 2, bb: 22}
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
let test =1;
```


### yield
```js
function* ge() {    //声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
  yield '1';
  yield '2';
  yield '3';
  return '4';
}

var a = ge();    //调用函数后不会运行，而是返回指向函数内部状态的指针
a.next();    // { value: '1', done: false }   遇到yield暂停
a.next();    // { value: '2', done: false }
a.next();    // { value: '3', done: false }
a.next();    // { value: '4', done: true}    函数执行完毕，返回done
a.next();    // { value: undefined, done: true}  已经执行完毕，返回undefined
```
### let const


### promise
.then创建了一个新的promise,里面的东西,会被放到微任务队列里  
promise.all 等所有都成功,或者某个失败,全部失败  
promise.race 等最先成功或者失败的  

### 获取根元素的font-size
```js
let html = document.querySelector('html')
let fontSize = getComputedStyle(html)['font-size']
```


### 箭头函数
```js
var ff = ()=> ({a:1}) ;  //这里如果要返回一个对象,需要加括号,不然被认为是代码块
ff();
```
注意点:  
this --arguments--new --yield  
1. this对象是定义生效时所在的对象,不是使用时所在的对象  
2. 不可以当作构造函数,不能new    
3. 不能用arguments参数,可以用rest参数代替(...rest)   
```js
var test = (...rest)=>{
    console.log(rest)
}
test(1,2,3)  //(3) [1, 2, 3]
``` 
4. 不可以使用yield,不能用作Generator函数  

this指向的固定化，并不是因为箭头函数内部有绑定this的机制，  
实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的  

this。正是因为它没有this，所以也就不能用作构造函数。
也不能通过call,apply,bind改变指向


#### 不适用场景
1. 不适合在对象里用,对象不构成单独的作用域,this指向的是window  
```js
var a = 1
var test = () => {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test()        //结果是 1
```
2. 需要动态this的时候，也不应使用箭头函数  

#### 尾调用优化
```js
function f(x){
  return g(x);
}
// 这就是尾调用,别的都不是,不用一定在尾部,最后一步执行就可以
```



