### this.$nextTick(()=>{})
一般来说,我们更新一个数据之后,比如重新赋值,如果下一步的操作需要用到这个更新后的值,  
可以把这个操作放到this.$nextTick()里面去.  
#### 原因
vue里面DOM更新是异步执行的,只要间听到数据变化,vue将开启一个队列,把同一个event loop  
中发生的所有数据变更放到队列里,如果一个watcher被多次触发,只会被推入队列一次.  
这样可以避免不必要的计算和DOM操作. 在下一次时间循环中,vue刷新队列,并执行实际工作.  
Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替


### router传参
可参考该网页: [别人写的博客](https://www.cnblogs.com/beka/p/8583924.html)
#### 1. path   
router配置中，写 path:"/user/:id",调用时： this.$router.push(&nbsp;{&nbsp;path&nbsp;:&nbsp;${id}&nbsp;})，刷新后参数还在  
#### 2. 根据name匹配，用params传参数，刷新后参数丢失  
router配置中，写path：“/...”,name:"detail"  
调用时， this.$router.push({name:detail,params:{id:1}}),  
在子页面中通过this.$route.params.id  
#### 3.通过path匹配，query传参，参数在uri里
this.$router.push({path:"",query:{}})中的path和配置文件匹配，参数通过url传递，在this.$route.query.来获取




### VueX
mutation(变异的意思):需要commmit， 
action,需要dispatch,里面都是调用了mutation
vuex中的state使用的时候,一般是挂载到computed属性中,如果写到data里,数据改变的时候,不能被监听到;  
当然也可以watch $store去解决这个问题,  
#### mapState
```js
// 引入vuex的文件中
import { mapState } from 'vuex';

computed:{
    ...mapState('index', ['regions', 'selectedRegion', 'showRegionSelect']),
    //或者这样  
    fn1(){ return ...},
    fn2(){ return ...},
    fn3(){ return ...}
    -----
    //再维护vuex
    ...mapState({  //这里的...不是省略号了,是对象扩展符
        count:'count'
    })
}

// store.js中
import Vue from 'vue';
import Vuex from 'vuex';
import region from '../api/regionService/regionReq';

Vue.use(Vuex);

export const INIT_REGION = 'INIT_REGION';
export const INIT_SELECTED_REGION = 'INIT_SELECTED_REGION';
export const UPDATE_SELECTED_REGION = 'UPDATE_SELECTED_REGION';
export const INIT_SHOW_REGION_SELECT = 'INIT_SHOW_REGION_SELECT';
export const UPDATE_SHOW_REGION_SELECT = 'UPDATE_SHOW_REGION_SELECT';

export default {
  namespaced: true,
  state: {
    regions: [], // region列表
    selectedRegion: localStorage.getItem('selected-region') || '', // 当前选中的region的regionId
    showRegionSelect: true, // 是否显示选择region框
  },
  actions: {
    async initApp({ commit, dispatch }) {
      commit(INIT_SHOW_REGION_SELECT);
      // 初始化region列表
      await dispatch('initRegion');
      // 初始化选中的regionId
      commit(INIT_SELECTED_REGION);
    },
    async initRegion({ commit }) {
      // 如果用户缓存中不存在region列表信息
      if (!sessionStorage.getItem('region-list')) {
        const params = {
          current: 1,
          size: 100,
        };
        await region
          .getRegionList(params)
          .then(res => {
            if (res.Status === 'Success' && res.Detail.Records.length > 0) {
              sessionStorage.setItem(
                'region-list',
                JSON.stringify(res.Detail.Records)
              );
              commit(INIT_REGION, res.Detail.Records);
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        // 否则从用户缓存获取
        commit(INIT_REGION, JSON.parse(sessionStorage.getItem('region-list')));
      }
    },
    updateSelectedRegion({ commit }, payload) {
      localStorage.setItem('selected-region', payload);
      commit(UPDATE_SELECTED_REGION, payload);
    },
    updateShowRegionSelect({ commit }, payload) {
      commit(UPDATE_SHOW_REGION_SELECT, payload);
    },
  },
  mutations: {
    [INIT_REGION](state, payload) {
      state.regions = payload;
    },
    [INIT_SELECTED_REGION](state) {

    },
    [UPDATE_SELECTED_REGION](state, payload) {
      state.selectedRegion = payload;
      window.location.reload();
    },
    [INIT_SHOW_REGION_SELECT](state) {
      state.showRegionSelect = true;
    },

  },
};

```

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