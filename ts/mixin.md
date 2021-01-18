### 定义
mixin 是 一个类或者 interface, 它上面定义的一些属性或者方法没有被实现, 需要其它的类或者接口来实现;  
可以简化 api 设计,例如: `WindowOrWorkerGlobalScope` mixin(它不是一个 interface) 用来提供 那些在`Window`和`WorkerGlobalScope` 这两个接口上都需要的属性和方法  
