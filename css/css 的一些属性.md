1. box-shadow 相关
```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive; 

// 还有  
filter: drop-shadow(2px 4px 6px black)
filter 很有用, 可以设置亮度 ,对比度, 灰度


```

2. 自适应 关键字
```css
fill-availabel'和'fit-content'  'min-content'和'max-content  
可以使用到 宽度和高度上, 实现 宽度和高度的自适应  避免因为固定值所导致的不适应  

fit-content 和 margin: 0 auto 实现 div 的水平居中
div{
width: fit-content;
margin: 0px auto;
}
```
3. pointer-events: none auto; 可以禁止 hover ,click 的效果(应该还有别的)  
4. background  
background-position: center; 可以 设置图片位置  
background-size: contain/cover;  前者会缩放以适应屏幕,后者会拉伸来铺满屏幕;  


5. hover 一直闪烁的问题
```css
会影响下方元素的写法  (其所在容器未指定高度)
.test{
position:relative;
&:hover{
  margin-top: -12px;
}
}


会闪烁的写法  
.test{
position:relative;
&:hover{
  top: -12px;
}
}

 ok 的
 transform: translateY(-12px)
```
6. 字母显示为 `...` 问题  
```css
需要在块级元素上(也可以不是)  
overflow: hidden;  
text-overflow: ellipse;  
white-wrap: unwrap;  
可能由于 里面 是个 span 包裹的 icon,以及一段 span 包裹的文字,一直失败.  把文字放到 div 里,然后加上上面的样式  
```

6. 绝对定位的元素 高度宽度 计算方法  
> 绝对定位的元素是相对于离它最近的第一个 position 不是 static 的元素,  如果它的所有父元素都不符合,那么它将根据浏览器
 的可视区域宽度和高度来进行定位,即 html.clientHeihgt,clientWidth.  
 否则,根据父元素的 (paddign + content) 的宽高进行定位  
```的
```


7. transition :  要变化的属性  2s ease-in-out;  
```css
.container{
height: 100px;
transition: height 2s ease-in-out;
  &:hover{
    height: 40px;
  }
}
```

8. word-break  
```css
0. normal 默认的  字母不换行,CJK 换行  
1. break-all    非 CJK 按照字母换行  CJK 跟到非 CJK 后面,然后也会换行   
2. break-word   不推荐使用了;非 CJK 按照单词换行,CJK 另起一行,也会换行  
3. keep-all      CJK 不换行,字母同 normal,就是也不换行
```

9. background-color
他默认会应用到 content,padding,border, 上 
background-clip: 可以设置应用到 content-box,padding-box  


10. var 变量  
```css
--custom-color: #fae83d;  //定义变量,变量名是大小写敏感的    

用的时候 var(--custom-color,'default value')
```

11. overflow  
overflow: hidden; visible ;auto; scrool;    
- hideen 隐藏多余的,不滚动    
- visible  显示多余内容.无滚动  
- auto  隐藏内容,显示滚动条;  (mac的滚动条默认自动)  
- scrool  隐藏内容,一直显示滚动条  
