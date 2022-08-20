```js
/*
1. js 正则  先行断言 
2. js 正则  后行断言   
3. js 正则  正向否定查找  
4.          反向否定查找 
5. call 
*/ 

// 1
console.log('xyz - xyy - xyx'.match(/xy(?=z)/))  //匹配 xy,仅当后面一位是 z 的时候,结果不包含 z,只有 xy
// 2
console.log('xyz - xyy - xyx'.match(/(?<=x)yz/)) // 匹配 yz,只有当前面是 x 的时候,结果不包含 x  
// 3. 
console.log(3,'xyz'.match(/x(?!y)/)) // 匹配 x,仅当后面不是 y 的时候,匹配的结果只有 x
// 4. 
console.log(4,'xyz'.match(/(?<!y)x/)) // 匹配 x,仅当前面不是 y 的时候,匹配的结果只有 x
// 5. call
const getType = (value) =>
    Object.prototype.toString.call(value).match(/(?<=\s)[a-zA-Z]+/)[0];       // 获取类型

function test(c) {
    console.log('test fun --- ', this, c);
}
let aa = { a: 1 },
    bb = { a: 2 };
test.call([], 8, 9);

// 注意,这里定义函数的时候 需要这么写,不能写箭头函数
Function.prototype.myCall = function (_this, ...args) {
    // 这里的 this 指向的是 test 函数, _this 是 call 的第一个参数,args 是一个数组,用来存储后续其他的参数
    // console.log(this,_this,args);

    // 当传入 null,或者 undefined 的时候,默认指向 window    
    _this = _this ?? window; 
    _this = new Object(_this);  // 如果_this 不是对象的话,转化为对象,对于字符串,数字,就转化为包装器类型
    const key = Symbol(); // 这个值是唯一的
    _this[key] = this; // 在_this 上定义该函数
    const result = _this[key](...args);  // 执行该函数
    delete _this[key];  // 删除上面定义的这个函数
    return result;     // 返回结果
};

// 这里有个小问题,test 函数执行时,打印的结果中,会有 Symbol
test.myCall([], 8, 9);
```