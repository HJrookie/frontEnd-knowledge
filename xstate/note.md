### what
有限状态机  声明式来描述状态  以及转换的契机  
可以生成 可交互式动画 来描述状态的转换  

### 怎么用  
1. 简单用法  (可生成动画的地址)[(https://xstate.js.org/viz/?gist=bbcb4379b36edea0458f597e5eec2f91)]
![img](https://camo.githubusercontent.com/f11dc99c3db8be0617c7084d3353c9c08a15deae01f83ffefff3582f2b0cc8fa/68747470733a2f2f696d6775722e636f6d2f7271716d6b4a682e706e67)
```js
import { Machine } from 'xstate';

const lightMachine = Machine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow'
      }
    },
    yellow: {
      on: {
        TIMER: 'red'
      }
    },
    red: {
      on: {
        TIMER: 'green'
      }
    }
  }
});

const currentState = 'green';

const nextState = lightMachine.transition(currentState, 'TIMER').value;

```
