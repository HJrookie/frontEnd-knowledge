### IntersectionObserver
```js
let observer = new IntersectionObserver(callback,option)
observer.observe(dom);
observer.unobserve(dom);
observer.disconnect();
```

### 写下大概
new IntersectionObserver接收两个参数,callback,以及配置选项;  
#### callback
一般是entries为参数,是个数组,里面每个元素都是IntersectionObserverEntry类型的实例,该实例有一些属性,  
```js

{
  time: 3893.92,    // 可见性变化的时间
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54, // 可见比例
  target: element //目标的元素
}
```
该callback方法一般调用两次,刚刚进入viewport,以及刚刚完全离开viewpoint,即开始部分可见,以及开始完全不可见;  

#### option.threshold
配置在什么时候触发callback.一般是一个数组  
[0,0.1,0.2,0.3,0.5,0.8]
### 用法1 Lazy load
```js
let ob = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    let content = document.querySelector('template');
    let container = entry.target;
    container.appendChild(content);
    entry.unobserve(container)
})
});
query('.lazy-loaded').forEach(function (item) {
  observer.observe(item);
});
```
或者一些元素默认是不显示的,或者`display:none`,然后在callback里面加载;  

### 无限滚动.

