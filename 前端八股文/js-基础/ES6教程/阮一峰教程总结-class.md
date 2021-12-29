#### 一般写法
```js
class TestA{}
const ClassB = class {} 
const ClassB = class innerName {} 

class Point {
  constructor(x, y) {
  // 这种写法, 会把属性定义到 新对象 上
    this.x = x;
    this.y = y;
  }

// 方法会被定义到原型上,但是 是 不可枚举的
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
  
  // get 和 set 被设置到了 类的原型对象的 Descriptor 上
  get x(){}
  // 不能只写 get,不写 set,可以只写 set,不写 get
  set x(v){}
}
```

#### 和 es5 的写法有啥区别  
1. 必须要 new 来创建对象  
2. 类中的方法不可枚举,旧的写法(在原型对象上定义方法)是可以的  
3.  

#### 注意点
1. 没有声明提升,name 属性返回 类名,
