// 排序算法
/*.
  冒泡排序: 稳定算法,时间复杂度n^2,空间复杂度1
*/
const bubbleSort = (arr) => {
  const len = arr.length
  for(let i=0;i<len-1;i++){
    for(let j=0;j<len-1;j++){
      if(arr[j] > arr[j+1]){
        const temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}

/*.
  选择排序: 不稳定算法,时间复杂度n^2,空间复杂度1

*/
const selectSort = (arr) => {
  const len = arr.length
  let temp=0
  for(let i=0;i<len-1;i++){
    let minIndex = i
    for(let j=i+1;j<len;j++){
      if(min > arr[j]){
        minIndex = j
      }
    }
    temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp
  }
  return arr
}

/* 
  插入算法:稳定排序
*/
const insertSort = (arr) => {
  const len = arr.length
  let preIndex,current
  for(let i =1 ;i<len;i++){
    preIndex = i-1
    current = arr[i]
    while(preIndex>=0&&arr[preIndex]>current){
      arr[preIndex+1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex+1] = current
  }
  return arr
}

/* 
归并排序：
*/
// 快速排序：不稳定算法，平均为nlogn 最坏是n^2 
function partition(arr, low, high) {
  let pivot = arr[low];
  while (low < high) {
    while (low < high && arr[high] > pivot) {
      --high;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

function quickSort(arr, low, high) {
  if (low < high) {
    let pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}


/* 
防抖函数
*/
const myDebounce = (func, wait) => {
  let timer = null
  return () => {
    if(timer){
      clearTimeout()
    }
    timer = setTimeout(() => {
      func.apply(this, arguments)
      timer = null
    }, wait)
  }
}

/* 
节流函数
*/
const myThrottle = (func, wait) => {
  let timer = null
  return () => {
    if(timer) return
    timer = setTimeout(() => {
      func.apply(this, arguments)
      clearTimeout(timer)
    }, wait)
  }
}

// 手写bind函数
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
      throw new TypeError("Error");
  }

  // 获取参数
  const args = [...arguments].slice(1),
        fn = this;

  return function Fn() {

      // 根据调用方式，传入不同绑定值
      return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments)); 
  }
}