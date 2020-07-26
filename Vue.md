### router传参
可参考该网页: [别人写的博客](https://www.cnblogs.com/beka/p/8583924.html)
#### 1. path   
router配置中，写 path:"/user/:id",调用时： this.$routers.push(&nbsp;{&nbsp;path&nbsp;:&nbsp;${id}&nbsp;})，刷新后参数还在  
#### 2. 根据name匹配，用params传参数，刷新后参数丢失  
router配置中，写path：“/...”,name:"detail"  
调用时， this.$routers.push({name:detail,params:{id:1}}),  
在子页面中通过this.$route.params.id  
#### 3.通过path匹配，query传参，参数在uri里
this.$routers.push({path:"",query:{}})中的path和配置文件匹配，参数通过url传递，在this.$route.query.来获取




### VueX
mutation(变异的意思):需要commmit， 
action,需要dispatch,里面都是调用了mutation


### Vue生命周期
1. 最开始初始化事件和生命周期  
2. beforeCreate,初始化注入和reactivity  
3. created,  
>此处先判断有没有el,没有的话,当vm,$mount(el)被调用时.再接着判断  
> 有没有template选项.有的话,把template中的内容编译到render 函数.  
> 这里引入优先级问题: render函数选项 > template选项 > outer HTML.
> 没有的话,编译el.outerHTML as template
4. beforeMount和mount之间,创建**vm.$el 并且用编译好的模版替代el**
![vue生命周期](https://cn.vuejs.org/images/lifecycle.png)

### beforeMount 和 Mounted之间.创建vm.$el,用我们刚编译好的HTML替换el指向的DOM节点
#### beforeUpdate,updated
更新的话,先更新数据,再更新视图,  
beforeUpdate:数据更新了,视图没更新  
updated: 视图重新渲染
#### Vue生命周期 之 自我理解
vue生命周期钩子:  
![不同时间数据的状态](https://s1.ax1x.com/2020/07/17/U6gp5j.png)  
1. 在beforeCreate,el,data,message都是undefined  
2. created时期: el还是undefined,因为模版还没编译呢!  
>data已经有了,message也有了.(message应该是data的一部分)  
3. beforeMount时期: el已经有了,但是里面的值还没有替代,还是{{value}}  
>data,和message还是有了的状态  
4. mounted,el里面的值被替代,data,message不变  

编译是啥意思: 就是把我们Template里面vue的写法,编译成一般的html文件  

![中文详解生命周期](https://pics3.baidu.com/feed/d0c8a786c9177f3e668177cd4bfcf9c19e3d5676.png?token=e1704b12a0e009ba1c294d959ebcaa3e)




----
完整html文件如下:  
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/vue/2.1.3/vue.js"></script> -->
    <script crossorigin="anonymous" integrity="sha384-+jvb+jCJ37FkNjPyYLI3KJzQeD8pPFXUra3B/QJFqQ3txYrUPIP1eOfxK4h3cKZP" src="https://lib.baomitu.com/vue/2.6.11/vue.js"></script>
</head>
<body>

<div id="app">
     <p>{{ message }}</p>
</div>

<script type="text/javascript">
    
  var app = new Vue({
      el: '#app',
      data: {
          message : "monkeyWang is boy" 
      },
       beforeCreate: function () {
                console.group('beforeCreate 创建前状态===============》');
               console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
               console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
               console.log("%c%s", "color:red","message: " + this.message)  
        },
        created: function () {
            console.group('created 创建完毕状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //undefined
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化
        },
        beforeMount: function () {
            console.group('beforeMount 挂载前状态===============》');
            console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
            console.log(this.$el);
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
        },
        mounted: function () {
            console.group('mounted 挂载结束状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
        },
        beforeUpdate: function () {
            console.group('beforeUpdate 更新前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);   
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message); 
        },
        updated: function () {
            console.group('updated 更新完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el); 
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message); 
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message); 
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);  
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message)
        }
    })
</script>
</body>
</html>
66920938463463374607431768211455
```



vue 兼容性