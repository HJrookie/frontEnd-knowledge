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
4. Parameter Properties 类的构造函数变量使用

