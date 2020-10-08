### Form 组件
- 必须指定是 render ,children 或者 component之一来渲染 form,其它的参数都被放到 form 的 config 里去了  (推荐children or render.)  
- 如果同时有 render 和 children,render 被调用,但是 children 也会被注入  
- children 的话 ,像下面这样子
```js
`((props: FormRenderProps) => React.Node) | React.Node`

<Form onSubmit={onSubmit} someArbitraryOtherProp={42}>
  {props => {
    console.log(props.someArbitraryOtherProp) // would print 42
    return <form onSubmit={props.handleSubmit}> ... </form>
  }}
</Form>
```
- component 如下:  (会使用 React.createElement 来创建 )  
```js
<Form
  onSubmit={onSubmit}
  component={MyFormComp}
  someArbitraryOtherProp={42} />

const MyFormComp = props => {
  console.log(props.someArbitraryOtherProp) // would print 42
  return <form onSubmit={props.handleSubmit}> ... </form>
}
```
### form 的一些参数
1. debug
  每个属性的值变化的时候的回调,一般传 `console.log`  
2. decorators  
  一个数组,卸载的时候调用  
3. initialValues
  用来计算 pristine 或者 dirty,ts 中类型要和 onSubmit 中的 values 的类型相同    
4. initialValuesEqual
  看 initalValues 是否变化
5. onSubmit  表单提交时的 callback,有三种方式
  失败一般都返回 submission errors,就是 FORM_ERROR 相关,返回一段文字   
  > 1. Synchronous  
    Returns on success, or an of submission errors on failure.undefinedObject  
    2. Asynchronous with a callback  
    Returns , calls with no arguments on success, or with an of submission errors on failure.undefinedcallback()Object  
    3. Asynchronous with a Promise  
    Returns a that resolves with no value on success or resolves with an of submission errors on failure. The reason it resolves with errors is to leave     rejection for when there is a server or communications error.Promise<?Object>Object
### 一般怎么用的
```js
import {Form,Field} from 'react-final-form'  

const onSubmit = ()=>{
  console.log('sub')
}

const App = ()=> (
<Form 
  onSubmit={onSubmit}
  initialValues = {{username:'Bob',age:12,height:180,id:2222}}
  validate={(values)=>{   // record 级别的验证
    const errors = {};
    if(!values.username){
      error.username = "Requited"
    }
    return errors;
  }}
  render={ ({ handleSubmit, form, submitting, pristine, values }) =>(  // 这里必须是 component| render | children
    <form
      onSubmit = {handleSubmit}
    >
    /* form里是个 div,div 里是 Label 和 Field */
      <div>
        <Label> username </Label>
        <Field
          type="text"
          component="input"
          name="username" 
          placeholder="something to place"
        /> 
      </div>
    /* form里直接是 Field,然后 children 里渲染组件 */
      <Field
      name="password"
      >
        {({input,meta}) => (
          <div>
            <label>password</label>
            <input {...input} type="text" placeholder="test str"/>
            {meta.error && meta.touched && <span> {meta.error}</span>}  // record-level 的验证时,写在这
          </div>
        )}
      </Field>
      <pre>{JSON.stringify(values,0,2)}</pre>
    </form>
  )}
/>)

```
