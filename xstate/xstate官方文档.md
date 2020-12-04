### 名词解释
#### 1. state  
就是状态机所具有的状态  一般由 machine.transition('1','trigger') 或者 service.onTransition()返回,它的 value 代表当前的节点,可能是 "1" 或者 {3:"31"}      
state.matches  
nextEvent 获取可用 trigger  
state.changed state.done  
持久化 JSON.parse(JSON.stringift())  localstorage  
meta, meta:{ message:"fff" } 感觉意义不大
#### 2. transition   状态的转换过程   
定义了 当前状态,遇到 event 之后,会转换到什么状态  
1. Selecting Enabled Transitions
就是说 在 hierachical machine 中, 当树的不同层级的节点对同一个 trigger 定义了 transition,当收到该 trigger 时,  
层级较深的那个 node 将会发生转换;外部的,不变; 
2. Event Descriptors  
on 里面的 key,就是 trigger 名称 就是 所谓的 descriptor  
还有` Null Event Descriptor`, 就是 trigger 是空字符 `" " `,也叫做Transient Transitions  
代表 没有触发条件,只要当 cond 满足的时候,就会转换 状态,   
如果最初始的值就是 init, `' '`也是定义在 init 的 on 里面中的,并且初始值就满足 guard,那么它会初始化之后,就会转换状态  
如果在状态 B,B 的 transition 的定义中没有`" "`, 就算这时候 修改 context,让 `" "`的guard 满足, 状态还是不变;  
如果最开始 guard 为 trur,但是 初始状态定义中不包含 `" "`,状态也不会转换  
```js
on:{
" ":{target:"pending",cond:'canToPending'}
}
````
3. Self Transitions  
就是一个 state  node  transition 到它自身.那么就需要控制它能否 离开该节点,并且 重新进入该 节点;也就是 internal 这个属性;  
- 如果 internal 为 true,  
    一个 internal transition 不会退出,或者重新进入自身,因此 state node 上的 entry 和 exit 不会被再次执行,只有定义在 transition 上的 actions 会被执行(原顺序是 exit,actions,entry)    
- 对于默认的 external  
    state node 上的 entry 和 exit action 都会被再次执行  

`TODO `

4. Forbidden Transitions  
就是把 trigger 对应的值 设置为 undefined , 这样子就什么也不会做; 如果不设置该 trigger,可能会被其它相同的 trigger 处理   

5. Multiple Targets  
```js
on:{			 trigger:{		target:['.mode.active','.status.enabled'] // 		}									}
```
其实是并行状态机,接受到一个 trigger 之后,两个状态都改变了   
6. Wildcard Descriptors  
fallback 的 trigger,会被任何 trigger 触发,



###### self transition 

#### 3. event     触发状态转换的 trigger   
```js
// 一般是这样的形式 只有 type 可以简写为 "keydown"
const keyDownEvent = {  
  type: 'keydown',
  key: 'Enter'
};
let nextState = lightMachine.transition(initialState, 'TIMER'); // string event  发送event
nextState = lightMachine.transition(nextState, { type: 'TIMER' }); // event object  发送event

// 或者这么用
const mouseService = interpret(mouseMachine).start();
window.addEventListener('mousemove', event => {
  // event can be sent directly to service
  mouseService.send(event);
});
```
######  null event 
用处,决定 根据一定的条件 决定下一个 状态是什么
```js

on: {
        // immediately take transition that satisfies conditional guard. 当满足条件时立即执行,否则,没有 transition 执行
        // otherwise, no transition occurs
        '': [
          { target: 'adult', cond: isAdult },
          { target: 'child', cond: isMinor }
        ]
      }
```

#### 4. action   
触发然后不管的副作用;,进入或者离开某个状态时.他会被执行;或者 transition 时执行  
一般在进入或者离开一个状态时被调用,它被执行的越快越好,因此一般是拿来开始或者终止 异步任务,例如发送或者终止 request,简单的同步任务也可以  
有三种类型:  
- entry 进入 state 时执行  
- exit 离开时执行  
- transition actions 当 transition 发生的时候执行  
```js
const triggerMachine = Machine(
  {
    id: 'trigger',
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          TRIGGER: {
            target: 'active',
            // transition actions
            actions: ['activate', 'sendTelemetry']
          }
        }
      },
      active: {
        // entry actions
        entry: ['notifyActive', 'sendTelemetry'],
        // exit actions
        exit: ['notifyInactive', 'sendTelemetry'],
        on: {
          STOP: 'inactive'
        }
      }
    }
  },
  {
    actions: {
      // action implementations
      activate: (context, event) => {
        console.log('activating...');
      },
      notifyActive: (context, event) => {
        console.log('active!');
      },
      notifyInactive: (context, event) => {
        console.log('inactive!');
      },
      sendTelemetry: (context, event) => {
        console.log('time:', Date.now());
      }
    }
  }
);

```
5. activities  执行时间较长的一个 action,可以被开始,或者关闭,可以是一个频繁执行的检查,在进入state node 时开始执行,离开时,停止   
在同一个 parent 下的 transition 不会重启  activities, ;只会 stop 一次,不会被多次 stop; 
```js
const toggleMachine = Machine(
  {
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: {
        on: { TOGGLE: 'active' }
      },
      active: {
        // 只要当 处于 active 状态时,就会一直执行 beeping
        activities: ['beeping'],
        on: { TOGGLE: 'inactive' }
      }
    }
  },
  {
  // 在这里定义 activities ,然后在 state中使用,和 action 类似
    activities: {
      beeping: () => {
        // Start the beeping activity
        const interval = setInterval(() => console.log('BEEP!'), 1000);

        // Return a function that stops the beeping activity
        return () => clearInterval(interval);
      }
    }
  }
);
```

6. compound state 一个状态包含 substates 
7. final state ,一个 state 的 type 为 final,代表它的 parent compound state is done,如果它的 parent 是 root statechart,那么整个 statechart 就 done  

8. services 以及 调用方法
services 是 作为参数  传到 Machine 的第二个参数中, 然后在 状态定义 的 invoke 对象中指定    
```js
const machine = Machine({
  id: "test",
  initial: "state1",
  states:{
     state1:{
        invoke:{
          id: "state-1-invoker,
          src: "invoker-for-state1",
          onDone: "state2",     // 指的是 调用的 invoker-for-state1 这个方法 执行成功时   这是其中一种写法
          onDone: {
            target: 'success',   // 要转换成的状态
            actions: assign({ user: (context, event) => event.data })  // 在这里写 逻辑, 和写到外面没什么区别,只是 逻辑比较多时,看起来不好看
          },                                                          // event.data 中的数据就是 promise resolve或者 reject 时的结果
          
          onError:"error"    // 指的是 调用的 service 执行失败时  转换到 error 状态  
        }
     },
     state2:{
     type:"final"
     }
  },
  onDone:  "state1"  // 指的是 内部的状态到达 final 的时候,将要进行操作,
},
// options ,
{
  services:{
    invoker-for-state1,
    invoker-for-state2,
    invoker-for-state3
  }
})
```



#### 要注意的点
1. 当进入 parent state 且它有 subStates 时, parent 的 entry handler 先执行,substates 后执行;  离开时,substates 先执行, parent 后执行  


#### 整体结构
用 Mathcine()来创建一个状态机,它接受两个参数, config 以及 配置选项(services,delays,guards,actions,activities),  
也可以 继承状态机,用 withConfig 接收 配置选项(上面的5个值),用 withContext() 来传递新的 context  
有了状态机之后,可以 用 interpret方法来解析  
```js
const service  = interpret(machine)
```
状态机当前的状态存在 State 实例中,

#### 自己写的 demo  [xstateChart 的地址,可以看到图](https://xstate.js.org/viz/?gist=bbcb4379b36edea0458f597e5eec2f91)
```js
const testMacheine = Machine({
  id:"test",
  initial:"1",
  states:{
    1:{
      on:{
        "+1":"2"
      },
    },
    2:{
      on:{
        "*2": "4"
      }
    },
    4:{
      on:{
        "+2": "6"
      }
    },
    6:{
      type:"final", // 就是结束的 node
    }
      
    },
    onDone:"1"  // 这里也可以设置成其它节点,当到达 final 之后,就会根据这个,跳到某一个状态
  
})
```
