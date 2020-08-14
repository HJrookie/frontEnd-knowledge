#### 插槽
简单来说，就是子组件里面写slot，然后父组件里面会引入子组件，例如:  
```html
// 父组件
<template>
  <div>
    我是父组件
    <slot-two></slot-two>
  </div>
</template>

// 子组件
<template>
  <div class="slottwo">
    <slot>我不是卖报的小行家</slot>  //这里是默认插槽。如果父组件不传入数据，那么将显示这个
  </div>
</template>
```
