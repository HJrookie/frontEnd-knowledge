###  和useRef的不同
 createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。  
 useRef的值只有第一次初始化的时候是undefined,然后被赋初始值,之后就不自动变了(可以被重新赋值,此时可以变化).    
 useCreateRef的值每次组件重新渲染最开始都是null,然后再赋值;
 [比较的demo](https://codesandbox.io/s/createref-and-useref-forked-7wq85?file=/src/App.js)
### 和useRef的相同
都可以绑定到一个dom上去
