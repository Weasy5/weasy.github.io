
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

/**
 * 3. 下一个排列（找出一个数组中下一个比它大的数组排序
 * 数组/双指针
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  // [1,5,2,4,3,2,] 
  // 从低位挑一个大一点的数，交换前面一个小一点的数： 从右往左寻
  let i = nums.length-2
  for(;i>=0;i--){
    if(nums[i] < nums[i+1]){
      break
    }
  }
  // i就是第一个比右邻居小的数
  // 再找从右边开始找到第一个比nums[i]大的数
  if(i>=0){
    let j = nums.length -1
    while(nums[j] <= nums[i] && j>=0){
      j--
    }
    [nums[i], nums[j]] = [nums[j],nums[i]] // [1,5,3,4,2,2]
  }
  // 此时 i 后面的三位422，还可以更小
  // 还有一种i为-1的情况，此时就开始全反转
  let l = i+1,r=nums.length-1
  while(l<r){
    [nums[l],nums[r]] = [nums[r], nums[l]]
    l++
    r--
  }
};

/**
 * 4.不同路径
 * 动态规划
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  const  dp = new Array(m).fill(0).map(v => new Array(n))
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }
  for(let i =1;i<m;i++){
    for(let j =1;j<n;j++){
      dp[i][j] = dp[i-1][j] + dp[i][j-1]
    }
  }
  return dp[m-1][n-1]
};

/**
 * 5.最小路径
 * 动态规划
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let row = grid.length, col=grid[0].length
  const dp = new Array(row).fill(0).map(v => new Array(col).fill(Infinity))
  dp[0][0] = grid[0][0]
  for(let i=1;i<row;i++){
    for(let j=1;j<col;j++){
      dp[i][j] = Math.min(dp[i-1][j-1] + grid[i-1][j], dp[i-1][j-1] + grid[i][j+1])
    }
  }
  return dp[row-1][col-1]
};

/**
 * 6. 编辑距离
 * 动态规划
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  let len1 = word1.length, len2=word2.length
  const dp = new Array(len1+1).fill(0).map(v => new Array(len2+1).fill(0))
  // 初始化dp数组
  for(let i=1;i<=len1;i++){
    dp[i][0] = i
  }
  for(let j=1;j<=len2;j++){
    dp[0][j] = j
  }
  for(let i=1;i<=len1;i++){
    for(let j=1;j<=len2;j++){
      if(word1[i-1] === word2[j-1]){
        dp[i][j] = dp[i-1][j-1]
      }else{
        dp[i][j] = Math.min(dp[i-1][j] + 1,dp[i][j-1] + 1, dp[i-1][j-1] + 1)
      }
    }
  }
  return dp[len1][len2]
};
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 7.环形链表
 * 哈希方法
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let map = new Map()
    while(head){
      if(map.has(head.next)){
        return head
      }else{
        map.set(head, 1)
      }
      head = head.next
    }
    return null
};
/**
 * 快慢指针
 * 本方案采用双指针的方式，定义两指针slow，fast。
 * slow每次移动一个节点，fast每次移动两个节点，如
 * 果链表存在环，则在某时刻slow与fast指针将重合，
 * 如何不存在环，则能正常遍历完成链表
 * 
 * 如果有环的情况下，我们如果确定入环节点呢？答案
 * 就是slow与fast指针相遇时，我们再额外使用一个指
 * 针ptr。起始，它指向链表头部；随后，它和slow每
 * 次向后移动一个位置。最终，它们会在入环点相遇。
 * 
 * 你可以通过slow=2fast，然后通过设环外与环内变量
 * 得出该结
*/
var detectCycle = function(head) {
  if(!head) return null
  let slow = head , fast = head
  while(fast && fast.next){
    slow = slow.next
    fast = fast.next.next
    if(slow == fast){
      // 快慢指针相遇，新的指针从头节点出发，会和慢指针在入环点相遇
      while(slow === head){
        slow = slow.next
        head = head.next
      }
      return head
    }
  }
  return null
};
/**
 * 8.排序链表
 * 双指针
 * @param {ListNode} head
 * @return {ListNode}
 */
/**
 * 1.先二分：快慢指针
 * 2.排序
 */
var sortList = function(head) {
  if(!head || !head.next) return head
  let slow = head,fast = head,preSlow = head
  while(fast && fast.next){
    preSlow = slow
    slow = slow.next
    fast = fast.next.next
  }
  // 此时preslow为中点
  preSlow.next = null
  const l1 = sortList(head)
  const l2 = sortList(slow)
  return mergeList(l1, l2)

};
// 合并已排序的链表
const mergeList = (l1, l2) => {
  const dummy = new ListNode(0)
  let prev = dummy
  while(l1 && l2){
    if(l1.val < l2.val){
      prev.next = l1
      l1 = l1.next
    }else{
      prev.next = l2
      l2 = l2.next
    }
    prev = prev.next
  }
  if(!l1){
    prev.next = l2
  }
  if(!l2){
    prev.next = l1
  }
  return dummy.next
}

/**
 * 9. 寻找重复数
 * 双指针/二分/快慢指针
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  let slow = 0,fast = 0
  do{
    slow = nums[slow]
    fast = nums[nums[fast]]
  }while(slow != fast)
  slow = 0
  while(slow != fast){
    slow = nums[slow]
    fast = nums[fast]
  }
  return slow
};

/**
 * 10.课程表
 * dfs/bfs
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  // [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]] 6
  const inDegree = new Array(numCourses).fill(0) // 
    const map = new Map()
    for(let i =0;i<prerequisites.length;i++){
        const cur = prerequisites[i]
        inDegree[cur[0]]++ // 课的初始入度值
        if(map.has(cur[1])){
            map.set(cur[1], [...map.get(cur[1]), cur[0]])
        }else{
            map.set(cur[1], [cur[0]])
        }
    }
    // [0,0,0,2,2,2]
    // {0:[3],1:[3,4],2:[4],3:[5],4:[5]}
    const queue = []
    // 所有入度为0的课入列，即不依赖任何课的课
    for(let i=0;i<inDegree.length;i++){
        if(inDegree[i] === 0){
            queue.push(i)
        }
    }
    let count = 0
    // queue: [0,1,2]
    while(queue.length){ 
        const selected = queue.shift() // 当前选的课出列 0/1
        count++
        const toEnQuene = map.get(selected) // 当前课的后续课 : [3]/[3,4]
        if(toEnQuene && toEnQuene.length){
            for(let i = 0;i<toEnQuene.length;i++){
                inDegree[toEnQuene[i]]--  // 依赖该课的入度-1 inDegree[3]:2-1=1/
                if(inDegree[toEnQuene[i]] == 0){
                    queue.push(toEnQuene[i]) // [2,3]
                }
            }
        }
    }
    return count === numCourses
};