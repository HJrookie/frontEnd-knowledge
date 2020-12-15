#### 一个值可能有不同类型,如何区分 --> type gurads  as in is typeof 
 1.  用 property in value 的方式来区分, 不能用 vlaue.swim 这种方式  
```js
const value: Fish|Cat ;
if('swim' in value){   
}
```
2. 如果非想用 property in value 来区分,要分别把 value 断言成不同的类型  
```js
let pet = getSmallPet();
let fishPet = pet as Fish;
let birdPet = pet as Bird;

if ( (pet as Fish).swim) {
  fishPet.swim();
} else if (birdPet.fly) {
  birdPet.fly();
}
```
3. 用 type prediate, is 操作符  

```js
function returnTwoType(): string|number{
    return Math.random()>0.5 ?"":0;
}

const value = returnTwoType();

function separate(value: string|number) : value is string{  // 这个叫 type  predicate 
    return (value as string).length!== undefined;   // 这里也可以用 typeof  替换   
    return typeof value === 'string'  ;         // typeof 也可以
    或者 直接 写 typeof value === 'string'  不用套函数这个 wrapper 
}

if(separate(value)){
   console.log(value)  // 这里 value 的类型就是 string 了
}else{
   console.log(value)   // 这里 就是 number 了,
}
```
