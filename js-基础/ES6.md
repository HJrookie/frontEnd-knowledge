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

### 一些琐碎的
不要在块级作用域中声明函数,情况比较复杂.  
es6里的会计作用域必须有大括号,对象不是块级作用域.  
[]==false; ![] == false; 都是true;  
var  function let const  import  class,六种方式定义变量.  
var,function声明的变量,依旧是顶层变量,可通过window访问到;  
let,const的话,不能通过window访问到;  
js中都有一个顶层对象,browser中是window,node是global  


### let const
tdz;
### 解构赋值  
let [head, ...tail] = [1, 2, 3, 4];  
解构不成功  或者没取到值  就是undefined  
对于对象,或者数组的解构赋值,都可以有默认值,在对应的值是undefined时.  
function test(x,y=x) 是可以的.  (x=y,y=1)是不行的.  
数组解构按顺序,对象按照key,不看顺序,  
对象解构:  
{a,b} 是缩写 实际{a:a,b:b}
＝可以认为是解构赋值  或者赋值

#### 很特别的用法,可以获取对象上的某个值
```js
对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello
上面代码的例一将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。例二将console.log赋值到log变量。

```


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

 
### for ...of 可迭代  拿到的值  可以正确识别unicode字符  传统for循环不行  
对象用in遍历  for in 拿到的是下标  


字符串可以当数组一样解构赋值.  
解构赋值规则-右边不是对象或者数组 就将其转成对象…如果是布尔.数字  就是包装器对象
函数参数如果是对象 或者 数组也可以解构.可以给里面的每个参数赋默认值..也可以给函数的整个参数默认值  
解构赋值里面尽量不要使用括号  
### 解构赋值能干嘛
交换两个变量的值  
很方便的从对象 数组  函数参数  json中 取指定参数的默认值  值  
还可以从map取值  
```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is worldvar {x:y = 3} = {};

解构赋值和默认值可以一起用
console.log(y);//对象没有x，输出默认值
var {x:y = 3} = {x: 5};
console.log(y);//对象有x，输出对于值

也可以用左边对象  解构右边的数组.取想要的值  

```

json.stringify  可能返回\ud800到\udfff之间的单个字符  但是这之间的字符按照utf8标准不能单个使用  
现在它会返回 转义字符串 让大家自己处理  
模板字符串  
可以保留里面的换行  和空格的格式

#### 字符串
fromcodepoint  就是codepointat的逆 
字符是以utf16的格式存储 每个字符占据2个字节 16个二进制位  
有的字符需要用4个字节来存  js认为它是两个字符  
includes  startswith  endswith  
都支持第二个参数  开始位置  end是前n个字符  其他两个是从第n个到末尾  
repeat
padStart  补全字符串  要补全的字符串最大长度.  用什么来补全  
padEnd  差不多
第二个参数默认空格  
trimStart. trimEnd  
