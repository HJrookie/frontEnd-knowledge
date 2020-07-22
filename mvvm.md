### mvvm
model: 数据模型和业务逻辑  
view: 看到的东西,页面,结构,布局,UI  
viewModel: 绑定器,在VIew和Model之间进行通信   
### 核心思想: 分离,解耦
通过ViewModel是View和Model层解耦,两者通过VIewModel完成通信  
ViewModel相当于是中介,  
### Vue中的mvvm
model: data,props  
view: template,style我感觉也是  
viewmodel: 继承自Vue类的组件实例
### mvvm的本质, 双向绑定,vue  







### 虚拟DOM
js对象模拟真实DOM,
一般来说,当数据发生改变,就重新渲染一下视图.然后用新视图替换旧的.  
对于局部的小视图的更新，没有问题（Backbone就是这么干的）；但是对于大型视图，  
如全局应用状态变更的时候，需要更新页面较多局部视图的时候，这样的做法不可取。  
**但是这里要明白和记住这种做法，因为后面你会发现，其实 Virtual DOM 就是这么做的，只是加了一些特别的步骤来避免了整棵 DOM 树变更。**

## vdom  
```js
var element = {
  tagName: 'ul', // 节点标签名
  props: { // DOM的属性，用一个对象存储键值对
    id: 'list'
  },
  children: [ // 该节点的子节点
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
  ]
}
```
```html
上面对应的HTML写法是：
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```
就是用js对象来表示DOM树的信息,因此也可以将js对象转换成DOM树  
因此我们操作VDOM.然后将VDOM转换成DOM,就好了  
关键在于: diff算法,来对VDOM对象之间进行比较,  
可以将VDOM看多DOM和JS之间的缓存,  
[详见链接](如何理解虚拟DOM? - 戴嘉华的回答 - 知乎
https://www.zhihu.com/question/29504639/answer/73607810)