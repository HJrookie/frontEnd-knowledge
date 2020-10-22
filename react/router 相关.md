### useHistory 
```js
const history = useHistory();
history.push('/someWhere');
goBack
```

### search 一般是啥..
`http://localhost:3000/#/hosts/ckfl5oxzeo5lu08868dcdt6xb?view=%22vms%22`    
就是这一堆东西里面的 `?view=%22vms%22`,  search.replace(/^\?/,''),就是把`?`移除  

### useLocation  
`Object {pathname: "/blog/4", search: "", hash: "", state: undefined}`


### useRouteMatch 
没用过

useparams

const Detail = (props) => {
  const { match: { params } } = props
  const { id } = params
  return (
    <div>
      params id: { id }
      <DetailTips/>
   
