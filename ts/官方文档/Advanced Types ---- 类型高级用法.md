#### 一个值可能有不同类型,如何区分 --> type gurads  as in is typeof instanceOf
 1.  用 property in value 的方式来区分, 不能用 vlaue.swim 这种方式  
```js
const value: Fish|Cat ;
if('swim' in value){   
}
```
2. 如果非想用 property in value 来区分,要分别把 value 断言成不同的类型  
```js
let pet = getSmallPet();
let fishPet = pet as Fish;
let birdPet = pet as Bird;

if ( (pet as Fish).swim) {
  fishPet.swim();
} else if (birdPet.fly) {
  birdPet.fly();
}
```
3. 用 type prediate, is 操作符  

```js
function returnTwoType(): string|number{
    return Math.random()>0.5 ?"":0;
}

const value = returnTwoType();

function separate(value: string|number) : value is string{  // 这个叫 type  predicate 
    return (value as string).length!== undefined;   // 这里也可以用 typeof  替换   
    return typeof value === 'string'  ;         // typeof 也可以
    或者 直接 写 typeof value === 'string'  不用套函数这个 wrapper 
}

if(separate(value)){
   console.log(value)  // 这里 value 的类型就是 string 了
}else{
   console.log(value)   // 这里 就是 number 了,
}
```

4. --strictNullChecks  
默认情况下, null 和 undefined 是 其它类型的子类型;  
5. type aliases
没有创建新类型,只是 类型的别名,  
可以拿来 对原类型做一些修改  
```js
type Tree<T> = {
value: T,
key1?: Tree<T>,
key2?: Tree<T>
}
```

6. 用 type 定义 对象, 和 interface 区别  
interface 来定义的话, 之后还可以 添加 属性, type 不行  
```js
interface Window {
  title: string
}

interface Window {
  ts: import("typescript")
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
        
```
7. Polymorphic this type, 也叫 F-bounded Polymorphism, 就是常见的 fluent api 
```js
class Calculate {
    private value: number;
    constructor(value: number = 0) {
        this.value = value;
    }

    currentValue() {
        return this.value;
    }

    add(target: number) {
        this.value += target;
        return this;
    }

    minus(target: number) {
        this.value -= target;
        return this;
    }

    multiply(target: number) {
        this.value *= target;
        return this;
    }

    divide(target: number) {
        this.value /= target;
        return this;
    }
}

var obj = new Calculate(10);
console.log(obj.add(1).multiply(2).divide(4).minus(1).currentValue())
```

另一个例子  
```js
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

let v = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();  
```
上面的代码之所以可以工作,是因为 基类中 返回了 this,如果没有这个 this, 那么 multiply 返回的就是 基类的对象,它是没有 sin 这个方法的,  
