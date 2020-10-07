  #### CSS样式优先级
  1. 带有!important的样式规则
  2. 内联样式
  3. id选择器
  4. 类选择器 (例如，.example)，属性选择器（例如，[type="radio"]）和伪类（例如，:hover）  
  5. 类型选择器（例如，h1）和伪元素（例如，::before）  
  > 通配选择符（universal selector）（*）关系选择符（combinators）（+, >, ~, ' ', ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。  
  
  - 更具体的规则优先级是更高的;(先定义比较通用的,然后定义比较详细的)   
  - 如果优先级相等,放在后面的生效
  
  
  ### 权重值
  1.Thousands 内敛样式 权重是1000  
  2.Hunderds id选择器是  hundreds  
  3.Tens 类选择器  属性选择器  伪类  
  4.Ones 类型选择器 伪元素 
  
  ### 例子
  ![mdn css优先级](https://s1.ax1x.com/2020/10/07/0di50P.png)
  附加怎么看优先级:  
  1. 有一个内敛样式,就是1000  
  2. 有 一个id 选择器 + 100  
  3. 有一个类选择器,伪类,或者属性选择器  + 10    
  4. 有一个伪元素,类型选择器, + 1
  ### 例子2  DEMO
  [JS Fiddler DEMo](https://jsfiddle.net/areYouOk/xoak1ybn/3/)
