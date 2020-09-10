### do what
感觉像是合并一些key的;   
```js
classNames('hello','test')  // 'hello test'
classNames('hello',{test:true})  // 'hello test' also
classNames('test',{hello:false})  // 'test'
// ignore falsy
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1' 
// support array
let arr = ['b',{c:true,d:false}]
classNames('hello',arr)  //'hello b c'
// support dynamic class name
let value = "primiary";
classNames({ [`test-str-${value}-test`]:true })
  ```
