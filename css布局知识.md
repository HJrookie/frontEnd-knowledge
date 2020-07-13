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
