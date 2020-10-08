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
      <div>
        <Label> username </Label>
        <Field
          type="text"
          component="input"
          name="username" 
          placeholder="something to place"
        /> 
      </div>
      <pre>{JSON.stringify(values,0,2)}</pre>
    </form>
  )}
/>)

```
