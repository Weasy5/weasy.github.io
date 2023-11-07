// 被观察者
class Subject {
  constructor() {
    this.observerList = []
  }
  addOberser(observer){
    this.observerList.push(observer)
  }
  removeObserver(observer){
    const index = this.observerList.findIndex(i => i.name = observer.name)
    this.observerList.splice(index, 1)
  }
  notifyObserver(message){
    const observers = this.observerList
    observers.forEach(i => i.notified(message))
  }
}
// 观察者
class Observer{
  constructor(name, subject){
    this.name = name
    if(subject){
      subject.addOberser(this)
    }
  }
  notified(message){
    console.log(this.name, message)
  }
}

// 发布订阅模式

//发布订阅中心
class PubSub {
  constructor(){
    this.message = {}
    this.listers = {}
  }
  // 添加发布者
  publish(type, content){
    const existContent = this.message[type]
    if(!existContent){
      this.message[type] = []
    }
    this.message[type].push(content)
  }
  // 添加订阅者
  subscribe(type, callback){
    const existLister = this.listers[type]
    if(!existLister){
      this.listers[type] = []
    }
    this.listers[type].push(callback)
  }
  // 通知
  notified(type){
    const message = this.message[type]
    const subscribes = this.listers[type] || []
    subscribes.forEach((cb, index) => cb(message[index]))
  }
}
//  发布者
class Publish {
  constructor(name, context){
    this.name = name
    this.context = context
  }
  publish(type, content){
    this.context.publish(type, content)
  }
}
// 订阅者
class Subscribe {
  constructor(name, context){
    this.name = name
    this.context = context
  }
  subscribe(type, cb){
    this.context.subscribe(type, cb)
  }
}

const TYPE_A = 'music';
const TYPE_B = 'movie';
const TYPE_C = 'novel';

const pubSub = new PubSub()
const publishA = new PubSub('publishA', pubSub)
const publishB = new PubSub('publishB', pubSub)
const subscribeA = new Subscribe('subscribeA', pubSub)
const subscribeB = new Subscribe('subscribeB', pubSub)

publishA.publish(TYPE_A, 'this is music')
publishB.publish(TYPE_B, 'this is a movie')

subscribeA.subscribe(TYPE_A, (res)=>{
  console.log(res)
})
subscribeA.subscribe(TYPE_B, (res)=>{
  console.log(res)
})
pubSub.notified(TYPE_A)
pubSub.notified(TYPE_B)
pubSub.notified(TYPE_C)

// 手写Promise
(function(window){
  // promise的三种状态
  const PENDIND = 'pending'
  const FULFILLED = 'fulfilled'
  const REJECTED = 'rejected'
  class Promise {
    constructor(executor){
      this.status = PENDIND
      this.data = undefined // 成功或失败的值
      this.onResolvedCallbacks = [] // resolved的回调函数
      this.onRejectCallbacks = [] // reject的回调函数

      const resolve = (value) => {
        if(this.status === PENDIND){
          this.status = FULFILLED
          this.data = value
          this.onResolvedCallbacks.forEach(fn => fn())
        }
      }
      const reject = (value) => {
        if(this.status === PENDIND){
          this.status = REJECTED
          this.data = value
          this.onRejectCallbacks.forEach(fn => fn())
        }
      }
      try{
        executor(resolve, reject)
      }catch(error){
        reject(error)
      }
    }
    then(onFulfilled, onRejected){
      // 未判断onFulfilled，onRejected是否有值
      if(this.status === FULFILLED){
        onFulfilled(this.data)
      }
      if(this.status === REJECTED){
        onRejected(this.data)
      }
      if(this.status === PENDIND){
        this.onResolvedCallbacks.push(() => onFulfilled(this.data))
        this.onRejectCallbacks.push(() => onRejected(this.data))
      }
    }
  }

})(window)

// Promise

(function(window){
  // 三个状态
  const PENDIND = 'pengding'
  const FULFILLED = 'fulfilled'
  const REJECTED = 'rejected'
  class MyPromise {
    constructor(executor){
      this.status = PENDIND
      this.data = undefined
      this.onResolvedCallBacks = []
      this.onRejectedCallBacks = []
      const resolved=(val) => {
        this.status = FULFILLED
        this.data = val
        this.onResolvedCallBacks.forEach(fn => fn())
      }
      const rejected=(val) => {
        this.status = REJECTED
        this.data = val
        this.onRejectedCallBacks.forEach(fn => fn())
      }
      try{
        executor(resolved, rejected)
      }catch(err){
        console.log(err)
      }
    }
    then(onFulfilled, onRejected){
      if(this.status === FULFILLED){
        onFulfilled(this.data)
      }
      if(this.status === REJECTED){
        onRejected(this.data)
      }
      if (this.status === PENDING) {
        // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
        this.onResolvedCallbacks.push(() => {
          onFulfilled(this.data)
        });
  
        // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
        this.onRejectedCallbacks.push(()=> {
          onRejected(this.data);
        })
      }
  
    }
    
  }
})(window)