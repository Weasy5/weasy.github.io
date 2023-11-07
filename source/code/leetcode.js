
/**
 * 1. 盛最多水的容器
 * 双指针/贪心
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let left = 0 ,right = height.length -1
  let ans = 0
  while(left < right){
    const area =( right - left )*Math.min(height[left], height[right])
    ans = Math.max(ans, area)
    if(height[left] < height[right]){
      left++
    }else{
      right--
    }
  }
  return ans
};


/**
 * 2. 三数之和
 * 双指针/排序
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // 1. 将数组排序去重
  // 2. 从i=0开始遍历， i之后设置双指针
  nums.sort((a,b) => a-b)
  let res = []
  for(let i=0;i<nums.length;i++){
    if(nums[i] > 0 ) break
    if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
    let l = i+1, r=nums.length-1
    while(l < r) {
      const sum = nums[i] + nums[l] + nums[r] 
      if(sum=== 0){
        res.push([nums[i], nums[l], nums[r]])
        while(l < r && nums[l] === nums[l+1]) l++
        while(l < r && nums[r] === nums[r-1]) r--
        l++
        r--
      }else if(sum < 0){
        l++
      }else if(sum > 0){
        r--
      }
    }
  }
  return res
};