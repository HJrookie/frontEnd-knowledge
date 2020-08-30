  ### Scheduler
  Async Task  
  1. 先在数据库中初始化task记录,然后把任务添加到Scheduler  
  2. 在Scheduler队列中完成排队,或者超时时间到,就被取出,分配给一个worker  
  3. worker执行时先调用connector API ,成功后使用ORM更新DB,最终任务完成  
  ------------------------------  
  4. worker会有心跳.如果失联,DB设为worker_disconnected,在放到Scheduler,然后pending  
  5. 然后成功,或者失败,或者跳过
  #### 优先级和超时机制
  immediate   0  
  user block  300  
  normal  600 
  ### 缓存
  以获取集群中所有vm为例子:  
  1. 获取所有连接中的集群  
  2. 获取集群对应的connector  
  3. 通过Connector获取集群中所有vm  
  4. 通过ORM将每个vm update/insert到DB  
  5. 同时收集vm的uuid  
  6. 通过ORM找到uuid不在第五步中uuid列表中的虚拟机  
  7. 移除上述虚拟机
  #### 失败  
  db初始化失败,或者更新失败,或者调用connnctor API失败,任务会更新至失败状态  
 db的失败,会记录日志;  
 connector API失败,记录到数据库;  
 #### worker失联
 worker会在DB中有心跳,如果失联了,这个task的状态被设置为worker_discnnnected,  
 然后被添加到Scheduler,恢复为pending;
 #### 去重
 防止重复任务,对于缓存类Async task,在init状态下,判断当前是否有同类任务在执行中,  
 实际为在DB中为每一类任务维护一个锁,例如:  
 每5分钟更新一次VM缓存数据,但是一次更新的时间超过了5分钟;  
  Tower 会跳过此次 Async Task，将其转移至 skipped 状态
  #### 意外终止  
  Async task,只有三个最终状态:  
  1. skipped  2. succeess  3. failed
  tower有定时任务,查找意外终止的;判断条件如下:  
  1. 不是最终状态  
  2. 不在Scheduler队列  
  3. 没有worker在处理
  
  ### tower的需求
  多个模块.不同功能.按照权限开放;一般是in-house私有部署,但是也可以部署在公有云上;  
  以多租户的方式为目标提供Saas服务,客户通过tower sass服务管理集群时,需要将私有部署集群  
  的网络和tower打通;
  ### 解决的问题
  主要面向基础架构部和业务部门,主要两个问题:  
  1.计算,存储的集中管理  
  2. 快速交付
  
  
