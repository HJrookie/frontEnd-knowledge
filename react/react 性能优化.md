## useMemo 和 useCallback
### react 性能优化
没有 hook 的时候,如果组件内部需要维护状态.我们一般是使用类组件,把状态存储在 state 中,然后用 setState 来更新state 中的值;  
这时候,性能优化点在于:  
- 调用 setState 时,就会触发组件的重新渲染,无论前后的 state 是否不同  
- 父组件更新,子组件也会自动的更新  
我们通常的优化方案为:   
1. 使用 immutable 进行比较,不相等时调用 setState  
2. 在 shouldComponentUpdate 中判断前后的 props 和 state,如果无变化,返回 false,阻止更新;  

#### 有了 Hook 之后  

- 没有了生命周期狗子,不能通过判断前后状态来决定是否更新;  
- 函数组件中,react 不再区分 mount 和 update 状态,则函数组件中的每一次调用都会执行其内部的所有逻辑;  
> 因此 useMemo 和 useCallback 应运而生  


[useCallback相关](https://github.com/HJrookie/frontEnd-knowledge/blob/master/react/useCallback.md)  
[useMemo相关](https://github.com/HJrookie/frontEnd-knowledge/blob/master/react/useMemo.md)  
