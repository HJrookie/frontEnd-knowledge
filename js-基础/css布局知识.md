### 水平居中
CSS2:
```css

```




### 垂直居中
基础模板:  
```
<div class="outer">
  <div class="inner">
    test
  </div>
</div>

.outer {
  width: 300px;
  height: 150px;
  background: gray;
}

.inner {
  width: 50%;
  height: 50%;
  background: red;
}
```
##### 方法1
outer 添加 display:flex,
inner 添加 align-self: center  
[flex垂直居中](https://jsfiddle.net/areYouOk/0q581jd3/10/)
##### 方法2
使用::before或者::after,其样式为  
```css
  content: '';
  display: inline-block;
  vertical-align: middle;
  height: 100%; /*缺一不可*/
```
并且inner也要添加  
```
  display: inline-block;
  vertical-align: middle
```
[伪元素实现垂直居中](https://jsfiddle.net/areYouOk/0q581jd3/16/)

##### 方法3
CSS3中transform 实现垂直居中,
transform可以实现旋转,缩放,倾斜,平移  
inner加上  
```js
 position:relative;
  transform:translateY(50%)
```
当子元素的height,width都是50%时,可以用
[例子](https://jsfiddle.net/areYouOk/0q581jd3/16/)  
第二种是多了top,向下偏移.然后translateY再向上偏移
[transform垂直居中2](https://jsfiddle.net/areYouOk/0q581jd3/20/) 

##### 方法4 transform相关的
在子元素身上添加  
```
当子元素的height,width都是50%的可以
 position:relative;
    transform: translate(50%, 50%);
```
[第一种](https://jsfiddle.net/areYouOk/0q581jd3/32/)

**或者**
```
/* 这种绝对可以 */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ```  
  其变形为  
  ```
   bottom:-50%;
 right:-50%;
 transform:translate(-50%,-50%)
  ```
  [变形-right,-bottom](https://jsfiddle.net/areYouOk/0q581jd3/61/)
[第二种](https://jsfiddle.net/areYouOk/0q581jd3/31/)
##### 方法5 justify-content,align-items
在父元素上添加  
```
display:flex;
/*水平居中对齐*/
    justify-content: center;
/*垂直居中对齐*/    
    align-items: center;  
```
[水平居中对齐](https://jsfiddle.net/areYouOk/0q581jd3/42/)


### 左侧固定宽度,右侧自适应(两栏布局)
[左侧固定宽度,右侧宽度自适应](https://jsfiddle.net/areYouOk/tkdwn639/11/)
方法1: 关键点:  
```css
#sidebar {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 200px;
  background-color: gray;
}

#content {
  background-color: #ddd;
  padding-top: 25px;
  padding-right: 20px;
  margin-left: 260px
}

```
方法2:  
```css
#sidebar{
  float:left;
  left:20px;
  top:20px;
  width:200px;
  background-color:gray;
}

#content{
  background-color:#ddd;
  margin-left:220px;
}
```
[左侧浮动,右侧宽度自适应](https://jsfiddle.net/areYouOk/tkdwn639/7/)  
方法3:  使用flex布局来实现
[justify-content:space-between](https://jsfiddle.net/areYouOk/7L2kv46a/20/)
```css
.left{
  width:200px;
  background-color:#ddd;
  min-height:300px;
}

.right{
  background-color:#aaa;
  height:400px;
  flex-grow:1  //这里让右边占更多地方
}

.father{
  display:flex;
  justify-content:space-between;
}
```
html如下所示
```html
<div class="father">
  <div class = "left">left</div>
  <div class= "right ">right</div>
</div>
```

4.第四种,两侧浮动.右侧宽度用calc计算   
```css
.left{
  float:left;
  width:200px;
  background-color:#ddd;
  min-height:300px;
}

.right{
    float:right;
  width:calc(100% - 200px);
  background-color:#aaa;
  height:400px;

}
```
[calc计算宽度](https://jsfiddle.net/areYouOk/7L2kv46a/17/)

### Flex布局
布局的传统解决方案:  
基于盒状模型,以来display属性,position属性,float属性.  
## 设置为flex布局后,子元素的float,clear,vertical-align将失效  
### 容器的一些叫法
main-axis 主轴,cross axis,交叉轴.  
主轴的开始位置叫做main start,结束位置叫main end;  
交叉轴的开始位置叫 cross start,结束位置叫cross end;
### 容器的属性  
以下6个属性设置在容器上:  
```css
flex-direction  
flex-wrap  
flex-flow  
justify-content  
align-items  
align-content  
```
#### 1. flex-direction属性  
该属性决定主轴的方向.它可能有4个值,  
roq(默认值),row-reverse,column(竖直方向,从上到下),column-reverse  

#### 1. flex-wrap  
如果一行放不下,如何换行的问题  
```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
nowrap: 默认,不换行  
wrap: 换行,第一行在上方  
wrap-reverse: 换行,第一行在下方
```
#### 3. flex-flow  
flex-flow属性是flex-direction属性和flex-wrap书信的简写.默认值是row-nowrap

#### 4. justify-content
justify-content定义了项目在主轴上的对齐方式  
```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
//
flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
```

#### 5.align-items属性  
该属性定义项目在交叉轴上如何对齐,
```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
```
 
#### 6.align-content属性  // 这个搞不懂 
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
//
 flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。
```

### item的属性,
共有6个.
```css
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

#### order
order属性定义item的排列顺序,数字越小,排列越靠前,默认为0  

#### flex-grow
定义项目的放大比例,默认为0;即如果存在剩余空间,也不放大;  
如果所有项目的flex-grow属性都为1,那他们将等分剩余空间.  
如果一个是2,其他是1.2得这个,站的剩余空间是1得2倍;
#### flex-shrink
定义了项目的缩小比例,默认为1;即如果空间不足,项目将缩小;  
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。  
如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小;  
负值对该属性无效。
#### flex-basis
属性定义了在分配多余空间之前，item占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小;  
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
#### flex
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
#### align-self
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
[图](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071016.png)



















