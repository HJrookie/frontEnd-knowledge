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

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
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
