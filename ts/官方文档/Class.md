#### note
class 创建之后 既是类型,也是 class,所以可以像 interface 那样当做类型用    
typeof ClassName 得到的结果.可以拿来访问类的 static side,比如静态方法和实例  


1. class 中的变量如果以`#` 开头,就是私有的  
2. 关于 权限为 `private `和 `protected` 的 field 的比较问题  
虽然 ts 是 structural type language,但是对于 这两种权限的比较有所不同;只有当这两者的类型来自同一个地方时(子类继承,实现同一个接口 ),才认为类型是一致的  
```js
// @errors: 2322
class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends Animal {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;  // ok
animal = employee;   // 这里是 error,
```

3. 一个类的构造函数如果是 protected,这个类不能在外部直接实例化,但是可以在其子类中调用super  
```js
class Person {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

let john = new Person("John");   // 不可以   
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);   // 没问题
    this.department = department;
  }
}
```
4. Parameter Properties 类的构造函数变量使用 `public`,`protected`,`private`,`readonly `修饰  
```js
class Test{
  name : string;  // 这里的 name 就不用写了 
  constructor(public readonly name){}
}
```

5. getter 和 setter  
只有 get 没有 set 会被推断为 readonly  
```js
class Test{
    _name: string = '';
    _kuan:number = 12;
    _gao:number = 5;
    
    get mianji():number{
     return this._kuan * this._gao
    }
    // constructor(public name:string){}
    get name():string{
        return this._name;
    }

    set name(v:string){
        this._name = v;
    }
}

var test = new Test();
test.name = 'ff'
console.log(test.name)
```

#### 抽象类  abstract class
- 其他类可能继承它  
- 不能被实例化  
- 可以包含一些方法的实现,但是 接口 不可以   
```js
abstract class Department {
  constructor(public name: string) {}

  printName(): void {  // 不用被子类实现 ,子类可以重写他,也可以不重写
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes  必须被子类实现
}

// 关于 多态,
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  lkkk(): void {
    console.log("G572335792357928352.");
  }
}

let department: Department; 
 department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.lkkk();   // 这里不能执行;因为 department 的类型中不包含这个方法  

```

#### 类 编译  得到  的 js 代码
 ```js
 
 let Greeter = (function () {
  function Greeter(message) {
    this.greeting = message;
  }

  Greeter.prototype.greet = function () {
    return "Hello, " + this.greeting;
  };

  return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"
```
