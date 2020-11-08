### what
有限状态机  声明式来描述状态  以及转换的契机  
可以生成 可交互式动画 来描述状态的转换  

### 怎么用  
-------------
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

2. hieracial 可嵌套式用法  
--------------
![](https://camo.githubusercontent.com/1d505f0bb75215f8ee8cf3218a5345c8ad1286f239dcc02e67503888ba0de5d2/68747470733a2f2f696d6775722e636f6d2f47445a416542392e706e67)

```js
const pedestrianStates = {
  initial: 'walk',
  states: {
    walk: {
      on: {
        PED_TIMER: 'wait'
      }
    },
    wait: {
      on: {
        PED_TIMER: 'stop'
      }
    },
    stop: {}
  }
};

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
      },
      ...pedestrianStates
    }
  }
});
```
3. Parallel State Machines  并行状态机  

-------

···js
const wordMachine = Machine({
  id: 'word',
  type: 'parallel',
  states: {
    bold: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_BOLD: 'off' }
        },
        off: {
          on: { TOGGLE_BOLD: 'on' }
        }
      }
    },
    underline: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_UNDERLINE: 'off' }
        },
        off: {
          on: { TOGGLE_UNDERLINE: 'on' }
        }
      }
    },
    italics: {
      initial: 'off',
      states: {
        on: {
          on: { TOGGLE_ITALICS: 'off' }
        },
        off: {
          on: { TOGGLE_ITALICS: 'on' }
        }
      }
    },
    list: {
      initial: 'none',
      states: {
        none: {
          on: { BULLETS: 'bullets', NUMBERS: 'numbers' }
        },
        bullets: {
          on: { NONE: 'none', NUMBERS: 'numbers' }
        },
        numbers: {
          on: { BULLETS: 'bullets', NONE: 'none' }
        }
      }
    }
  }
});

const boldState = wordMachine.transition('bold.off', 'TOGGLE_BOLD').value;

// {
//   bold: 'on',
//   italics: 'off',
//   underline: 'off',
//   list: 'none'
// }

const nextState = wordMachine.transition(
  {
    bold: 'off',
    italics: 'off',
    underline: 'on',
    list: 'bullets'
  },
  'TOGGLE_ITALICS'    // 这个只会影响 italics  ，不会影响别的  
).value;

// {
//   bold: 'off',
//   italics: 'on',
//   underline: 'on',
//   list: 'bullets'
// }
···
