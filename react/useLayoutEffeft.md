### 和useEffect的区别
useEffect中的callback是在paint之后去执行的;如果在callback里修改了dom的位置等,会引起dom重排和重绘;  
useLayoutEffect可以在浏览器渲染之前,获取dom中的layout,然后同步地修改dom,然后重新渲染  
useEffect可能会有闪烁问题,后者没有
