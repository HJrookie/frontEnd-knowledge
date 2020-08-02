### canvas
canvas只能绘制矩形,以及连续的点  
```js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d')

ctx.fillRect(25, 25, 100, 100);
ctx.clearRect(45, 45, 60, 60);
 ctx.strokeRect(50, 50, 50, 50);
 ctx.fillRect(55, 55, 40, 40);
```

#### fill和stroke
fill的时候不用调用closePath(fill会自动闭合),stroke的时候需要调用closePath;  
但是并不只是必须要通过clothPath来闭合路径,通过lineTo起始点就可以;  

### 方法: 
arc画圆   
#### 本塞尔曲线
二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色），而三次贝塞尔曲线有两个控制点。  
![图片](https://mdn.mozillademos.org/files/223/Canvas_curves.png)