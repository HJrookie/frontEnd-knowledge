[完整地址](https://juejin.im/post/5c2de832f265da6172659b45)
### 框架一般做得事情

1. 模版渲染(将数据渲染到DOM中)  
2. 事件监听,事件处理  
3. 处理表单,提交数据,ajax,处理结果  
#### 1. 两者的差别
vue
```vue
// 模板渲染，可以直接使用data对象中的数据，利用指令来处理渲染逻辑
<template>
  <div class="hello">
    <div v-for="(item, index) in list" :key="index">
      {{ item.title }}
    </div>
    // 处理表单，将用户输入的内容赋值到title上
    <input v-model="title" />	 
    // 事件监听，用户点击后触发methods中的方法
    <button @click="submit">提交</button>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { title: 'first' },
        { title: 'second' }
      ],
      title: ''
    }
  },
  methods: {
    submit () {
      this.list.push({ title: this.title })
      this.title = ''
    }
  }
}
</script>

```
**React**
```js
import React, { Component } from 'react';
//这里继承了组件,说明HelloWorld是个组件
export default class HelloWorld extends Component {
  state = { // 这里的state,就是这个组件内的数据
    list: [
      { title: 'first' },
      { title: 'second' },
    ],
    title: '',
  };
// 事件处理程序
  setTitle = (e) => {
    // 需要手动调用setState来进行重绘，否则input的value不会改变
    this.setState({ title: e.target.value })
  }
// 事件处理程序2
  submit = (e) => {
    const { title, list } = this.state;
    list.push({ title });
    // 更新数据需要用setState来做, setState({k:v})
    this.setState({ list, title: '' });
  }
    // html模版,类似template,叫jsx
  render() {
    const { title, list } = this.state;
    return (
      <div className="App">
        // react会使用jsx的方式来进行模板的渲染，可混合使用js和html标签
		//  {}解析js，()解析html
        { list.map((item, index) => (
            <div key={index}>{ item.title }</div>
          )
        )}
        // 事件监听 + 表单处理
        <input value={title} onChange={this.setTitle} />
        <button onClick={this.submit}>增加</button>
      </div>
    );
  }
}
```
可以看到两者处理数据时的差别,vue直接赋值,react使用setState来触发数据和模版的同步;  
手动触发更加灵活

### 2. 生命周期的差别
主体流程大致都可以分为：

创建组件：建立组件状态等一些前置工作，如果需要请求数据的话，大部分在此时进行。  
挂载组件：将组件真正挂载到Document中，可以获取真实的DOM进行操作。  
更新组件: 组件自身的状态，外部接受的参数发生变化时。  
卸载组件: 当组件要被移除当前Document时，通常会销毁一些定时器等脱离于组件之外的事件。  

### 3.vue为什么上手简单  
1. computed  
它是为了避免把过多的计算逻辑放在模版上,    
2. watch  
监听某个数据的变化,可以获取到变化前后的值;  
但是在react里,可能要在componentWillReceiveProps时,自己判断属性是否变化,  
或者在setState时,触发变化后的业务逻辑  
```js
componentWillReceiveProps(nextProps) {
  if (nextProps.name != this.props.name) {  // props中的某个属性发生了变化
    ....
  }
}
```
3. 指令
vue中的指令,主要用于封装对dom的操作,例如v-if,v-for,v-else,v-show,  
react利用jsx来操作dom,因此没有这个概念;看一下vue中自定义指令的例子;
```js
<img v-lazy="img_url" />
// 功能是实现图片懒加载
directives: {
  'lazy': {
	inserted: function (el, binding) {
	  var body = document.body;
	  var offsetTop = el.offsetTop;
	  var parent = el.offsetParent;
	  // 获取绑定元素对于body顶部的距离
	  while (parent && parent.tagName != 'body') {
	    offsetTop += parent.offsetTop;
	    parent = parent.offsetParent;
	  }
	  // 若出现在可视区域内，则直接赋值src
	  if (body.scrollTop + body.clientHeight > offsetTop && body.scrollTop < offsetTop) {
	    el.src = binding.value;
	  } else {
	  	 // 若暂未出现，则监听window的scroll事件 
	    var scrollFn = function () {
	      // 出现在区域内才赋值src，并取消事件监听
	      if (body.scrollTop + body.clientHeight > offsetTop && body.scrollTop < offsetTop) {
	        el.src = binding.value;
	        window.removeEventListener('scroll', scrollFn)
	      }
	    }
	    window.addEventListener('scroll', scrollFn)
	  }
	}
  }
}

```

### 4. 组件的区别
1. 组件通信 
```js
// 父组件
<template>
  <div class="parent">
   <div v-for="(msg, index) in msgs" :key="index">
      {{ msg.content }}
    </div>
    // 通过v-bind可以绑定父组件状态传递给子组件
    // 并且可以自定义事件将方法传递给子组件
    <child :last="last" @add="add"></child>
  </div>
</template>

<script>
import Child from '@/components/PropsEventChild'

export default {
  components: {
    Child
  },

  data () {
    return {
      name: 'parent',
      msgs: []
    }
  },

  computed: {
    last () {
      const { msgs } = this
      return msgs.length ? msgs[msgs.length - 1] : undefined
    }
  },

  methods: {
    add (msg) {
      this.msgs.push(msg)
    }
  }
}
</script>

// 子组件
<template>
  <div class="child">
    <input v-model="content" placeholder="请输入" />
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  // 此处需要定义接受参数的名称
  props: ['last'],

  data () {
    return {
      content: ''
    }
  },

  methods: {
    submit () {
      const time = new Date().getTime()
      const { last } = this
      if (last && (time - last.time < 10 * 1000)) {
        alert('你发言太快了')
        return
      }
      // 通过$emit的方式可以调用父组件传递过来的自定义事件，从而修改父组件的状态
      this.$emit('add', { content: this.content, time })
      this.content = ''
    }
  }
}
</script>


```

**React的写法**
```js
// 父组件
import React, { Component } from 'react';
import Child from './Child'

export default class Parent extends Component {
  state = {
    msgs: []
  };

  get last () {
      // 这里这么写是干嘛的
    const { msgs } = this.state;
    return msgs.length ? msgs[msgs.length - 1] : undefined;
  }

  add = (msg) => {
    const { msgs } = this.state;
    msgs.push(msg);
    this.setState({ msgs });
  };

  render() {
    const { msgs } = this.state;
    return (
      <div className="Parent">
        { msgs.map((item, index) => (
            <div key={index}>{ item.content }</div>
          )
        )}
        // 直接传递参数和方法
        <Child last={this.last} onClick={this.add}/>
      </div>
    );
  }
}

// 子组件
import React, { Component } from 'react';

export default class Child extends Component {
  state = {
    content: ''
  };

  setContent = (e) => {
    this.setState({ content: e.target.value })
  }

  submit = (e) => {
    const { props: { last }, state: { content } } = this
    const time = new Date().getTime()
    if (last && (time - last.time < 10 * 1000)) {
      alert('你发言太快了')
      return
    }
    // 直接调用传递过来的方法
    this.props.onClick({ content, time })
    this.setState({ content: '' })
  }

  render() {
    const { content } = this.state;
    return (
      <div className="Child">
        <input value={content} onChange={this.setContent} />
        <button onClick={this.submit}>增加</button>
      </div>
    );
  }
}


```

### 生命周期  
```js
created: 'componentWillMount',  
mounted: 'componentDidMount',  
updated: 'componentDidUpdate',  
beforeDestroy: 'componentWillUnmount',  
errorCaptured: 'componentDidCatch',  
render: 'render'  
```






