### 是什么?
css的一种扩展,与css完全兼容,一种预处理器,我个人理解跟babel差不多,  
用一种较为简单的写法,这两个作为转换器,转换成browser可以理解的形式  
或者说对人类友好,
#### 一些特性
#### 1.变量  
```css
$nav-color: #F90;  //定义变量,可以在其他地方引用
nav {
  $width: 100px;   //在{}内部定义的变量,只能在这个{}内用,其他块中也可以定义$width,互不影响的
  width: $width;
  color: $nav-color;
}
//编译后
nav {
  width: 100px;
  color: #F90;
}
```
#### 1.1 变量的引用
可以在一个变量中引用另一个变量.如果你需要一个不同的值，  
只需要改变这个变量的值，则所有引用此变量的地方生成的值都会随之改变  
```css
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}

//编译后

.selected {
  border: 1px solid #F90;
}
```
#### 变量名用-还是_
一般用**-**来分割,但是使用-分割,也可以在引用的时候使用_,反之亦然.  
```css
$link-color: blue;
a {
  color: $link_color;
}

//编译后

a {
  color: blue;
}
```
#### 2. 嵌套CSS规则
在指定月面中某一块的样式时,往往要一遍又一遍的写同一个ID:但是使用sass的写法,就很好:  
```css
#content {  
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
 /* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```
当需要为一个元素,及其子元素编写样式时,可以使用嵌套css规则,如下所示:  
```css
#content {
  background-color: #f5f5f5;
  aside { background-color: #eee }
}
/*结果如下*/
#content { background-color: #f5f5f5 }
#content aside { background-color: #eee }
```
容器元素的样式规则会被单独抽离出来，而嵌套元素的样式规则会像容器元素没有包含任何属性时那样被抽离出来。  
大多数情况下这种简单的嵌套都没问题，但是有些场景下不行，  
比如你想要在嵌套的选择器 里边立刻应用一个类似于**:hover**的伪类。为了解决这种以及其他情况，sass提供了一个特殊结 构&。

### 2.1 父选择器的标识符&;
一般情况下，sass在解开一个嵌套规则时就会把父选择器（#content）通过一个空格(这个很关键)连接到子选择器的前边   （article和aside）形成（#content article和#content aside）。这种在CSS里边被称为后代选择器，  
因为它选择ID为content的元素内所有命中选择器article和aside的元素。  
但在有些情况下你却不会希望sass使用这种后代选择器的方式生成这种连接。  
最常见的一种情况是当你为链接之类的元素写：hover这种伪类时，  
你并不希望以后代选择器的方式连接。比如说，下面这种情况sass就无法正常工作：  

```css
article a {
  color: blue;
  :hover { color: red }
}
```
这样子的话,他会生成  
```css
article a {color:blur}
article a :hover{color:red}
/*结果: article元素内连接到的所有子元素被hover时都会变乘红色*/
```
解决方法:  
```css
article a {
  color: blue;
  &:hover { color: red }  /*&符号,就不会有空格拼接,而是&被父选择器直接替换*/
}
```
这样子的话,他会生成  
```css
article a {color:blue}
article a:hover{color:red}  /*注意a后面没有空格了*/
/*结果: 符合预期*/
```

### 2.2 群组选择器的嵌套
```css
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```
可以被替换为  
```css
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```
同样的: 
```css
nav, aside {
  a {color: blue}
}
```
对应以下css:
```css
nav a, aside a {color: blue}
```
#### 2-3. 子组合选择器和同层组合选择器：>、+和~;
上边这三个组合选择器必须和其他选择器配合使用，以指定浏览器仅选择某种特定上下文中的元素。
```css
article section { margin: 5px }
article > section { border: 1px solid #ccc }
```

附: > 意思  
A > B 代表,A元素后仅一代元素  
A空格B 代表 A元素的所有子B元素 
A + B ,选择紧接A元素后面出现的B元素,并且A,B有共同的父元素(兄弟选择器)  
A~B ,选择前面有A元素的B元素,(不是后代关系,而是兄弟关系),A,B有相同父元素,但是B不必紧随A    
[如该网页所示](https://jsfiddle.net/areYouOk/zqkgvcms/13/)






























2. 继承  
定义一段css,在其他地方引用
```css
%message-shared{
    border: 1px solid gray;
    color: red;
}

.message{
    @extend %message-shared;
}

```