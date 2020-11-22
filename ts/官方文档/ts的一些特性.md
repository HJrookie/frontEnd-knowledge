### 名词解释  
index signature    ==>   对象中 property 对应的值的类型;  
sides 部分  

#### note
函数检查应该不检查 形参的 key 是否一致,只是检查参数顺序 及类型
### 0.


函数默认参数 是惰性求职的 每次都会算
ts 鸭子类型  
函数的参数用interface来描述
函数参数的类型没有那么严谨  只要有对应的key和类型符合
如果有多个可选参数  放对象里
可选参数的key和类型也会进行检查

readonly  加在key前面 只有刚开始创建的时候  可以指定值   之后就不能修改了
ReadonlyArray 泛型  只读

let a: number[] = [1, 2, 3, 4]; let ro: ReadonlyArray<number> = a; a = ro as number[];  没有断言不能这么直接赋值



### 3. interfaces
interface 可以定义对象的类型或者函数的类型  
```ts
// 定义对象类型  Property type
interface Test{
    name: string;
    age?:number;
}
const test:Test = {name:'bob'}

// 定义函数类型
interface Fun{
(str1:string,str2:string):boolean;
// funcName(param1:string,param2:string) : returnType;
}

let func :Fun;
func = function(name,firstName){   // 形参可以不同
    return name.length === firstName.length;
}

console.log(func("fff","fff"))   //true
```


##### Indexable Types   
下标可以是 number 或者 string 类型,但是 number 类型的下标返回的值的类型必须是    `string 类型的下标返回的值的类型` 的子类型  
```ts
interface StringArray {
  [index: number]: string;       // 下标是 number 类型,结果是 string 类型;  
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[1];
console.log(myStr)




// x:number 的值类型 需要是  x:string 的值类型的 子类型
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

interface NotOkay {
  [x: number]: Dog;
  [x: string]: Animal;
}

let ttt:NotOkay = {test:{name:'1'}};   //  当两种 index 都有的时候  必须是对象
let ttt:NotOkay =  [ {name:'1',breed:"2"}];   //  index 是 number [x: number]: Dog;  下标是数字  必须是数组, 不能是对象,对象的下标是 string  
console.log(ttt)



// index signature要匹配
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  name: string; // error, property 类型是字符串,不是 number; 所以不行;    但是如果 [index:string] : number} | string; 就行 
}


// 禁止对 index 进行赋值  
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!   不允许   You can’t set myArray[2] because the index signature is readonly

```
##### Class Types
```ts
interface Human{       // 这里也可以是 type 来定义,但是不能是 Class  
    name:string;
    setName: (name:string)=>void;
    getName: ()=>string;
}


class Man implements Human{   // 这个接口定义了共有的成员,不能用来检查是否有某些私有成员
    name:string;
    getName(){
        return this.name;
    }
    setName(name:string){
        this.name = name;
    }
    constructor(name:string){
        this.name = name;
    }
}


const test = new Man("helloworld");
console.log(test)
test.setName('hhh');
console.log(test)

```

Class 构造函数签名  constructor check 的例子  ,
> 构造函数属于 Class 的 静态部分;不会被检查;因此 Clock 实现了构造函数的方法,但是没有被检查出来,所以报错了;  
```ts
interface ClockConstructor {
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
//                Class 'Clock' incorrectly implements interface 'ClockConstructor'.
  //                Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
  currentTime: Date;
  constructor(h: number, m: number) {}

```


另一个 Class 的例子  关于累的静态部分和实例部分  
```js
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface; // 属于类的静态 部分,不会被检测,叫做 构造函数签名  constructor signature  
}

interface ClockInterface {
  tick(): void;   // 类的实例部分  
} 

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);   // 这里检查构造函数的签名是否一致  
let analog = createClock(AnalogClock, 7, 32);

console.log(digital.hour)
```


### recursive type references 递归类型引用
[recursive type references](https://github.com/microsoft/TypeScript/pull/33050)

```typescript
type ValueOrArray<T> = T | Array<ValueOrArray<T>>;

const a0: ValueOrArray<number> = 1;
const a1: ValueOrArray<number> = [1, [2, 3], [4, [5, [6, 7]]]];

type HypertextNode = string | [string, { [key: string]: any }, ...HypertextNode[]];

const hypertextNode: HypertextNode =
    ["div", { id: "parent" },
        ["div", { id: "first-child" }, "I'm the first child"],
        ["div", { id: "second-child" }, "I'm the second child"]
    ];

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

let data: Json = {
  caption: "Test",
  location: { x: 10, y: 20 },
  values: [0, 10, 20]
}
```

#### 类的权限控制
public 所有地方都可以访问   
protected  当前类以及子类可以访问  
private  只有当前类可以访问  
在子类中可以重新定义 name,但是没有意义 [相关的问题呢](https://stackoverflow.com/questions/35708845/typescript-derived-class-cannot-have-the-same-variable-name
```js
class Animal {   // 父类
  private name;   // private 只能在父类中被访问,子类访问不了的  
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  public name;   // ; )
  constructor(name) {
    super(name);                //  这里是调用父类constructor 来初始化 也就是new 出来的对象中的 name 是有值的  
    console.log(this.name);     // 这里就是访问 父类的 name 了,因为是继承的
  }
}

```
我们
