### 简介
将 一片区域划分为行和列,形成许多个单元格.可以指定某个项目在哪个单元格;  
分 container 和项目.类似 flex 中的容器和项目,注意: 项目只能是容器中的顶层子元素  
### 可应用到容器上的属性  
1. display: grid; 块级元素;  或者 inline-grid;  自身变成 inline 的.内部还是 grid; 类似于 inline-flex; 内部还是 flex 布局,但是具有 inline 元素的特性;  
2. grid-template-columns,grid-template-rows





### 一些关键字
1. repeat(3,css)  
```css
grid-template-columns: repeat(2, 100px 20px 80px); // 6列.
```
2. auto-fill  
有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。  
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```
3. fr => fraction 表示比例  
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;  // 2列 宽度一样
}
```
fr可以结合固定宽度一起用,
```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;  //3列,第二列宽度是第三列的一半.他俩宽度和150没关系
}
```
4. minmax()  代表一个范围  
```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);  
```
5.  auto
```css
grid-template-columns: 100px auto 100px;
```
6. 网格线名字  
```css
/* 三行三列,因此有4个 row 网格线和4个 column 网格线  */

.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```



