/* 
  实现并发函数并控制数量
  在then之后再执行操作
  递归
*/
function schedule(requests, limitNum){
  
  for(let i=0;i<requests.length && i<limitNum;i++){
    runTask(requests.shift())
  }
  // 执行函数
  function runTask(request){
    pengdingCount++
    request().finally(() => {
      if(!requests.length){
        return
      }
       runTask(requests.shift())
    })
  }
}
/* 数据类型判断 */
function myTypeOf(val){
  if(typeof val !== 'object'){
    return typeof val
  }
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}