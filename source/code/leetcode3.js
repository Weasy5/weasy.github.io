/**
 * 2216. 美化数组的最少删除数
 * 贪心
 * @param {number[]} nums
 * @return {number}
 */
var minDeletion = function(nums) {
  let n = nums.length 
  let ans = 0
  let check = true // 记录当前下标是奇数还是偶数
  for(let i=0;i+1<n;i++){
    if(nums[i] == nums[i+1] && check){
      ans++
    }else{
      check = !check
    }
  }
  return ans
};

/**
 * 2.最短无序连续子数组
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
  let numsSorted = [...nums].sort((a,b) => a -b)
  let n = nums.length
  let left = 0
  if(nums[left] === numsSorted[left] && left < n){
    left++
  }
  let right = n-1
  if(nums[right] == numsSorted[right] && right >= 0){
    right--
  }
  if(left === n || right <0 ){
    return 0
  }else{
    return right - left
  }
};

/**
 * 3.任务调度器
 * 贪心
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
  let ans = 0
  Array.from(map)
  Object.values()
  const map = new Map()
  for(let i=0;i<tasks.length;i++){
    map.set(tasks[i], map.has(tasks[i]) ? map.get(tasks[i]) + 1 : 1)
  }
  let maxValue = Math.max(...Object.values(map))
  let maxCount = 0
  Object.values(map).forEach(v => {
    if(maxValue == v){
      maxCount++
    }
  })
  return Math.max((maxCount-1)*(n-1)+maxValue,maxValue)
};

/**
 * 4.字母异位词
 * 
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  const res = []
  const pLen = p.length, sLen = s.length
  if(pLen > sLen) return []
  let i= 0,j=pLen
  while(j < sLen){
    let s1 = s.slice(i,j)
    if(isAnagram(s1,p)){
      res.push(i)
    }
  }
  return res
};
const isAnagram = (s1, s2) => {
  return s1.sort() === s2.sort()
}