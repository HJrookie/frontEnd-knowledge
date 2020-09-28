### 常见定位方案
#### 方案一: 普通流
>在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。
#### 方案二:浮动
>在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。
#### 方案三:绝对定位
>在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

### 为什么要清除浮动
当我们不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷，这个时候我们就要除浮动
### 方法1
  用clear属性来实现. 对需要清除浮动的元素添加  clear:left/right/both 样式即可,该元素将会位于对应位置的浮动元素的下方(该元素必须是 块级元素.)
> 可以用空div,或者其他块级元素,或者在父元素上添加伪元素,类似 .test:after,伪元素属性为 content:'';display:block;clear:*; 即可
  
### 方法2
创建BFC,BFC是什么呢? 它是网页中渲染出的CSS的视觉效果中的一部分.是一片区域,这个区域中,块级盒子布局在这里构建,并且浮动元素与其他元素相互作用  

[mdn上 所有创建BFC的方法](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)   
[清除浮动的例子-jsFiddle](https://jsfiddle.net/areYouOk/sun364xz/9/)
#### 常用的创建BFC的方法 (绝对定位-float-overflow-display)
1. overflow 除了visible之外的任何属性
2. float除了none之外的任何属性
3. 是绝对定位元素,(position为fixed或者absolute)
4. overflow不为visible
5  display为table-cell,foot-root,或者inline-block,或者table-caption,或者table、table-row、 table-row-group、table-header-group、table-footer-group
6. display为flex / inline-flex
7. display为grid / inline-grid
#### BFC特性
1. 同一个BFC内,块级盒子垂直排列.并且margin会重叠.span这种行内元素就不行 [垂直排列](https://jsfiddle.net/areYouOk/po0g97kv/29/)
2. BFC之间相互独立,不会互相影响.
3. BFC可以包含浮动的元素,可以用来清除浮动,或者做自适应两栏布局 [清除浮动](https://jsfiddle.net/areYouOk/po0g97kv/32/)
4. 计算BFC的高度时,浮动元素的高度也参与计算.
5. 每个元素的左外边缘（margin-left)， 与包含该元素的块的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC [例子](https://jsfiddle.net/areYouOk/po0g97kv/41/)
6. BFC的区域不会与float box重叠(float元素已经形成了一个新的BFC)  
###### 相互独立 互不影响  从上到下,margin重叠. 包含浮动,计算高度   左侧接触






  
## 附加知识:

### 伪类和伪元素

#### 伪类
##### 伪类是什么?
伪类是添加到选择器的关键字,指定元素处于特殊状态时的样式效果.
##### 常用伪类 :link,active,visited,hover,focus,
##### 1. :first-child
例子:  
```css
p:first-child{  
    background:gray;  
 }  
  ```
  在许多p元素中的第一个p元素,文字的背景是黑色的.这几个 p 元素需要有共同的父元素;  
  
 ##### 2. :last-child  
 
 许多相同元素中的最后一个元素.
 :p:last-child 许多元素中最后一个p元素
 ##### 3. :not  
 
 例子:  div:not(.red)  
 
 许多div中,不包含class="red" 的那些div,会应用此样式  
 
 ##### 4. :nth-child(an+b)  
 倾向于按照顺序,不区分元素类型,如果不是该类型的元素,还是计数,;  
  > (在所有兄弟元素中应用规则,不符合,就跳过)首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从1开始排序，选择的结果为CSS伪类:nth-child括号中表达式（an+b）匹配到的元素集合（n=0，1，2，3...）。示例:  
  > 0n+3 或简单的 3 匹配第三个元素.  
  1n+0 或简单的 n 匹配每个元素。（兼容性提醒：在 Android 浏览器 4.3 以下的版本 n 和 1n 的匹配方式不一致。1n 和 1n+0 是一致的，可根据喜好任选其一来使用。）  
  2n+0 或简单的 2n 匹配位置为 2、4、6、8...的元素（n=0时，2n+0=0，第0个元素不存在，因为是从1开始排序)。你可以使用关键字 even 来替换此表达式。  
  2n+1 匹配位置为 1、3、5、7...的元素。你可以使用关键字 odd 来替换此表达式。  
  3n+4 匹配位置为 4、7、10、13...的元素。
  
  ##### 5. :nth-last-child(an+b)    
  
  与nth-child类似,但是是从最后面开始计数的.  
  ##### 6. :nth-of-type(an+b)  
  >在所有兄弟元素中的相同元素中应用规则
  与nth-child相似,但是只匹配特定类型的元素.并不是匹配所有的兄弟元素.相对而言更加精准  
  例子:    .div:nth-of-type(2n)  
  
  ##### 7. :nth-last-type  
  与 nth-of-type类似,但是是从最后一个开始计数的  
  ##### 8. :focus  
  获得焦点时会触发.例如表单在输入状态,或者用Tab键切换焦点  
  ##### 9. :hover
  鼠标指针放到该元素上时会触发一般用来创建下拉按钮.  
  [下拉按钮例子](https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/3700/3e1094a1c7b42332b9bdef0d0b0c4a7f/css_dropdown_menu.html)  
  代码如下所示:  
  ``` css
  /*css*/
  div.menu-bar ul ul {
  display: none;
}

div.menu-bar li:hover > ul {
  大于号的意思: li子元素中的ul(仅一代)会应用此样式
  ~波浪线的意思: li子元素中所有的ul都会应用此样式
  display: block;
}
  ```  
  ```html
  <!-- HTML -->
  <div class="menu-bar">
  <ul>
    <li>
      <a href="example.html">Menu</a>
      <ul>
        <li>
          <a href="example.html">Link</a>
        </li>
        <li>
          <a class="menu-nav" href="example.html">Submenu</a>
          <ul>
            <li>
              <a class="menu-nav" href="example.html">Submenu</a>
              <ul>
                <li><a href="example.html">Link</a></li>
                <li><a href="example.html">Link</a></li>
                <li><a href="example.html">Link</a></li>
                <li><a href="example.html">Link</a></li>
              </ul>
            </li>
            <li><a href="example.html">Link</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
  ```  
  
  ##### 其他伪类  
  >:visited,:valid,:target,:required  (强调: :link. hover, active, visited,,focus)
  
### 常见伪元素
1. ::after  
2. ::before  
3. ::first-line  
4. ::first-letter    

      
      
  #### CSS样式优先级
  1. 带有!important的样式规则
  2. 内联样式
  3. id选择器
  4. 类选择器 (例如，.example)，属性选择器（例如，[type="radio"]）和伪类（例如，:hover）  
  5. 类型选择器（例如，h1）和伪元素（例如，::before）  
  > 通配选择符（universal selector）（*）关系选择符（combinators）（+, >, ~, ' ', ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。
#### 提高CSS加载速度
1. 对接CDN.或者静态文件(js,css)放到oss.oss一般和cdn有合作  
2. 压缩CSS文件的大小  
3. 使用缓存加快速度,expires,cache-control,E-tag,避免缓存影响,可以加版本号,build出来的文件


    

#### 三栏布局
1. 利用flex实现
[三栏布局-flex](https://jsfiddle.net/areYouOk/6z918vf2/3/)  
> 最好用的.但是IE10才开始支持
2. 利用bfc和float实现  
[三栏布局-bfc+float](https://jsfiddle.net/areYouOk/6z918vf2/6/)  
> 注意在HTML文档中，先写两个float,再写中间的部分..如果按照左,中,右顺序去写,右侧的浮动元素将会向下偏移一段距离(中间部分的高度)

##### CSS实现首字母大写.或者全大写,全小写:  
> text-transform:capitalize/uppercase/lowercase  

 ##### 伪类和伪元素区别
 伪类可以设置不同状态时元素的样式,以及指定奇数,或偶数个元素的样式  
 伪元素则是,可以创建一个新的元素,或者可以访问到元素中的内容的fist-letter,first-line.他有这样一种能力

伪类和伪元素.  
块级元素,行内元素  
伪元素的content是啥. 默认应该是行内元素. height:0ox 可以去掉. 但是 content,以及diskplay:block,和clear不能去掉
  
#### z-index
- 当该元素position为非static的时候生效,否则无效;  
- z-index为auto的元素不参与层级比较  
- 
[demo](https://jsfiddle.net/6k5wgujs/)
> 灰色框层级小，但是它显示出来了。它的父元素的层级大于相邻元素的层级，无论它的级别有多小，都可以大于相邻的小于父元素的层级。
