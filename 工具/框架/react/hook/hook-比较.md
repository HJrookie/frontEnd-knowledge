### useEffect,useMemo,useCllback 
这三个hook内部都是用的闭包,只能获取到当前函数组件上下文中的状态.如果想获取最新的状态,需要使用ref
