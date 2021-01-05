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

8. index types  
keyof T 叫做 `index type query operator`     
 T[K],  叫做 `the indexed access operator`  
 要注意 : 
```js
interface Dictionary<T> {
  [key: string]: T;
}
keyof Dictionary<number> 得到的 类型是 string | number     https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types-and-index-signatures

如果是 
interface Dictionary<T> {
  [key: number]: T;
}
那么 keyof Dictionary<string 或者任何>的结果 都是 number  

```

9. keyof any 可以用来 index object, 其实就等于  `string | number | symbol`

10 . homomorphism 是啥  
https://stackoverflow.com/questions/59790508/what-does-homomorphic-mapped-type-mean#comment105728020_59791889
Readonly, Partial and Pick 是 符合 `homomorphism` 的,
就是说 要让编译器知道 你想 从一个 已有的 对象中复制它的 key,这样子 编译器就可以获取到它的 `readonly` 以及 `optional` 的状态了,  
那么他就是 `homomorphic` 的. 否则,就不是. 简单来说, 要这么写, 
```js
type HomTest1<T> = {
  [K in keyof T(这里需要是一个对象,前面的格式不能变)]: T[K]
}
```
这么写了之后,他就是 `homomorphic ` 的了.. 当然 ,它也叫  `structure preserver` 

11. T extends  U 啥意思 
其实就是 T 可以被 赋值给 U, assignable to U 
T extends true/ false 可以这么用  
类型推断的话, 如果编译器可以推断出来,也就是说 信息足够, 就会立即 推断出 信息;  
否则, 像泛型函数中, 类型不确定,自然无发推断出来了;  


#### 12. Distributive conditional types
其实就是 条件类型和 union type 结合起来了,情况 变得有些 复杂起来  
```js
type Num = 1|2|3|4|5|'ggg';
type NumResult<T> = T extends number ? T : 'sss';

type RRR2 = NumResult<Num>
// = "sss" | 1 | 2 | 3 | 4 | 5
```
For example, an instantiation of `T extends U ? X : Y` with the type argument `A | B | C `for T   
is resolved as `(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`.

##### 13.1 不懂的写法
```js
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;   // 这个T[number]

type T1 = Boxed<string>;
//   ^ = type T1 = {
//       value: string;
//   }
type T2 = Boxed<number[]>;
//   ^ = type T2 = {
//       array: number[];
//   }
type T3 = Boxed<string | number[]>;
//   ^ = type T3 = BoxedValue | BoxedArray
```
##### 13.2 类型推断可以合到一起  , 同一个变量 来 接受不同的 推断  
```js
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

type T1 = Foo<{ a: string; b: string }>;
//   ^ = type T1 = string
type T2 = Foo<{ a: string; b: number }>;
//   ^ = type T2 = string | number
```
