### Basic Selector  
1. Universal Selector  全局选择器 
  * 匹配所有  
2. Type Selector 
  input {}
3. ID Selector  
4. Attribute Selector
  Syntax: [attr] [attr=value] [attr~=value] [attr|=value] [attr^=value] [attr$=value] [attr*=value]
  
### Grouping selectors
```css
/* 一种简写 */
#main,
.content,
article {
  font-size: 1.1em;
}
```

downside (缺点)  
> 当其中一个选择器不被支持的时候,会让其他的选择器失效  
```css
h1 { font-family: sans-serif }
h2:maybe-unsupported { font-family: sans-serif }
h3 { font-family: sans-serif }
/* 可能不会和下面的相等 */
h1, h2:maybe-unsupported, h3 { font-family: sans-serif }

```
解决方案:  
```css
:is(h1, h2:maybe-unsupported, h3) { font-family: sans-serif }
:where(h1, h2:maybe-unsupported, h3) { font-family: sans-serif }

```
#### :is 和:where 区别:  
*:where 总是具有0权重值(specificity)*  
*:is 会取参数列表中的最大的权重  *
#### 共同点 
他俩的参数都是 Forgiving Selector 
  
### Combinators
1. Descendant Combinator   后代选择器  
Syntax: A B  (空格分割)
2. Child Combinator  子元素,仅一代  
Syntax: A > B   
3. Adjacent sibling combinator  兄弟元素,仅一个  
Syntax: A + B  
4. General sibling combinator    兄弟元素,所有  
Syntax: A ~ B  

#### 选择器 效率 
id,和类 性能差不多,id 略好,  

### Pseudo
1. Pseudo Class  
2. Pseudo Element  

  
