/* 
a detail xstate example  
*/

const machine = Machine(
  {
    id: 'test',
    initial: 'init',
    states: {
      init: {
        on: {
          trigger: {
            target: 'pending',
            actions: ['goToPending', 'preparationsForPending'], // 这里定义的是  transition 类型的 action
          },
        },
        entry: ['onEnterInit', 'onEnterInit2'], // 这里定义的是 entry 类型的 action
        exit: ['onExitInit', 'onExitInit2'], // 这里定义的是 exit 类型的 action, 这是一种指定 action 的方式
        //   exit: ( context,event )=>{ console.log("....") }        // 第二种 指定 action 的方式, 不推荐
      },
      pending: {
        on: {
          trigger: {
            target: 'executing',
            actions: ['goToExecuting', 'preparationsForExecuting'], // 这里定义的是  transition 类型的 action
          },
        },
        entry: ['onEnterPending', 'onEnterPending2'], // 这里定义的是 entry 类型的 action
        exit: ['onExitPending', 'onExitPending2'], // 这里定义的是 exit 类型的 action, 这是一种指定 action 的方式
        //   exit: ( context,event )=>{ console.log("....") }        // 第二种 指定 action 的方式, 不推荐
      },
      executing: {
        // type: 'final'
      },
      paused: {},
      success: {
        type: 'final',
      },
      failed: {
        type: 'final',
      },
    },
    // test internal and outernal transitions, 
    //  在线 demo 地址 https://xstate.js.org/viz/?gist=7480b8a64153f9e17e0e5c138eceaea5
    /* 
      它的 entry 和 exit 的定义要写成下方的样子 
    */
    entry: ['inernal-test-entry'],
    exit: ['inernal-test-exit'],
    on: {
      t1: {
        target: '.pending',
        internal: false,
      },
      t2: {
        target: '.executing',
        internal: false,
      },
      t3: {
        target: '.paused',
        internal: false,
      },
      t4: {
        target: '.success',
        internal: true,
      },
    },
  },
  {
    actions: {
      // init
      goToPending: (context, event, exec) => {
        console.log('goToPending ');
      },
      preparationsForPending: (context, event, exec) => {
        console.log('preparationsForPending ');
      },
      onEnterInit: (context, event, exec) => {
        console.log('onEnterInit ');
      },
      onEnterInit2: (context, event, exec) => {
        console.log('onEnterInit2 ');
      },
      onExitInit: (context, event, exec) => {
        console.log('onExitInit ');
      },
      onExitInit2: (context, event, exec) => {
        console.log('onExitInit2 ');
      },

      // pending
      goToExecuting: (context, event, exec) => {
        console.log('goToExecuting ');
      },
      preparationsForExecuting: (context, event, exec) => {
        console.log('preparationsForExecuting ');
      },
      onEnterPending: (context, event, exec) => {
        console.log('onEnterPending ');
      },
      onEnterPending2: (context, event, exec) => {
        console.log('onEnterPending2 ');
      },
      onExitPending: (context, event, exec) => {
        console.log('onExitPending ');
      },
      onExitPending2: (context, event, exec) => {
        console.log('onExitPending2 ');
      },
    },
  }
);

/* 
  action 详解  

  1. 类型  


  2. 一般用法
    在 Machine 的配置中的 action 字段中定义函数,然后在状态机的 config 中通过,entry,exit,action 字段指定
  3. 一些特性
  action 可以配置为默认不执行, 通过手动调用的方式执行, 
  const service = interpret(machine,{execute: false}) 
  service.onTransition(state=>{
      service.execute(state)  // 手动执行
  })
  service.start;
  4. action 执行顺序  
  初始化时   执行 init 中定义的 entry 中的 action  
  接收到 trigger 之后, 会从 init 转换到 pending, 在这个过程中,先执行 init 的 exit中的 actions,再执行 init 中的 transition actions,最后执行 pending 的 entry actions  
  5. send 函数
  只是个 action creator,是个纯函数,返回了一个 action object,不会立即发送一个 event; 而是把 event 放到 external event 队列中,在 interpreter 执行 下一步时 event 会被 send  
  6. actions On self-transition  action 可以是 internal 的,当然,他们默认是 external 的  
  如果是 internald 的,  
    一个 internal transition 不会退出,或者重新进入自身,因此 state node 上的 entry 和 exit 不会被再次执行,只有定义在 transition 上的 actions 会被执行  
  对于默认的 external  
    state node 上的 entry 和 exit action 都会被再次执行  
*/

const state = machine.transition('init', 'trigger'); // 从 init 状态,接收到 trigger

console.log('state', state);
