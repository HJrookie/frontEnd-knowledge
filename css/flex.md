### 只写比较容易混淆的
#### 应用到容器上的  
1. justify-content 
  - space-between 就是两端对齐,最左边和最右边没有空缺,然后各个 dom 元素之间的间隔相等  
  - space-around, 每个 dom 最左边和最右边有空缺,元素的左右的间距相等,项目之间的间隔比项目和边框的间隔大一倍  
2. align-items  定义交叉轴上的排列  
  - flex-start,flex-end,center,baseline,stretch  
  - baseline 文字的第一行对齐  
  - stretch  默认,占满高度  
3. align-content  设置浏览器如何沿着 flex 的交叉轴和 grid 的横轴分配空间   [例子 ](https://jsfiddle.net/areYouOk/wgnd5q0z/8/)
  - flex-start(从上到下),flex-end(从下到上),center(垂直居中),stretch(默认占满),
  space-between(垂直方向上的 space-between ),space-around(垂直的 around)    
  - 
#### 应用到项目上的  
所有属性:  order,flex-grow,flex-shrink,flex-basis,flex,align-self,  
1. order 可以改变当前项目排列顺序,默认都是0,数字小的在前面  [Demo](https://jsfiddle.net/areYouOk/so18tnu7/5/)
