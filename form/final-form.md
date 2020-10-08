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
  validate={(values)=>{
  }}
  render={ ({ handleSubmit, form, submitting, pristine, values }) =>(
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
    /* form里直接是 Field */
      <Field
      name="password"
      >
        {({input,meta}) => (
          <div>
            <label>password</label>
            <input {...input} type="text" placeholder="test str"/>
            {meta.error && meta.touched && <span> {meta.error}</span>}
          </div>
        )}
      </Field>
      <pre>{JSON.stringify(values,0,2)}</pre>
    </form>
  )}
/>)

```
