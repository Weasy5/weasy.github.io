/**
 * 1.比特位计数
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
  const res = new Array(n+1).fill(0)
  for(let i=0;i<=n;i++){
    let count = countOnes(i)
    res[i] = count
  }
  return res
};
// 二进制数字中1的个数
const countOnes = (i) => {
  let count = 0
  while(i > 0){
    x &= (x - 1);
    count++
  }
  return count
}

/**
 * 2.最近公共祖先
 * 深度优先搜索/递归
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(!root || root == p || root == q) return root
    let lSon = lowestCommonAncestor(root.left, p, q)
    let rSon = lowestCommonAncestor(root.right, p, q)
    if(lSon && rSon) return root
    return lSon ? lSon : rSon
};

/**
 * 3.完全平方数
 * 动态规划
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let fn = new Array(n+1).fill(0)
  for(let i=1;i<=n;i++){
    let minn = Number.MAX_VALUE
    for(let j = 1;j*j<=i;j++){
      minn = Math.min(minn, f[i-j*j])
    }
    f[i] = minn + 1
  }
  return fn[n]
};
/**
 * 4.买卖股票的最佳时期含冷冻期
 * 动态规划
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  // const dp = new Array(prices.length+1).fill(0)
  // 1.今天没有持有股票： 
  // 买入/卖出 dp[1] = Math.max(dp[0]-price[0] , dp[0] + price[0])
  // f[n] = Math.max(f[n-1],f)
  
  let buy = -prices[0] // 买入
  let sell = 0 // 手中没有股票
  let profit_freeze = 0 //冷冻期收益
  for(let i = 0;i<prices.length;i++){
    let temp = sell
    sell = Math.max(buy + prices[i], sell)
    buy = Math.max(profit_freeze - prices[i], buy)
    profit_freeze = temp
  }
  return sell
};

/**
 * 5.买卖股票的最佳时机
 * 动态规划
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let minBuy = 0
  let profit = 0
  for(let i=1;i<prices.length;i++){
      profit = Math.max(profit, prices[i] - minBuy)
      minBuy = Math.min(minBuy, prices[i])
  }
  return profit

};
/**
 * 6.三角形最小路径和
 * 动态规划
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  // 自底向上
  let h = triangle.length
  for(let i=h-2;i>=0;i++){
    const arr = triangle[i]
    for(let j= 0;j<arr.length;i++){
      let min = Math.min(min + triangle[i+1][j], min + triangle[i+1][j+1])
    }
    triangle[i][j] +=min

  }
  return triangle[0][0]
};

/**
 * 7.分割回文串
 * 动态规划
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  const res = []
  const dfs = (temp, start) => {
    if(start === s.length ){ // 切到底了
      res.push(temp.slice())
    }
    for(let i=start;i<s.length;i++){
      if(isPalindrome(s, start,i)){
        temp.push(s.slice(start, i+1))
        dfs(temp, i+1)
        temp.pop()
      }
    }
  }
  dfs([],0)
  return res
};
var isPalindrome = function (s, left, right) {
    while (left < right)
        if (s.charAt(left++) !== s.charAt(right--))
            return false;
    return true;
}

/**
 * 8.使用最小花费爬楼梯
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
  const dp = new Array(cost.length+1).fill(0)
  dp[0] = 0
  dp[1] = 0
  for(let i=2;i<cost.length;i++){
    dp[i] = Math.min(dp[i-2] + cost[i-2], dp[i-1] + cost[i-2])
  }
  return dp[cost.length]
};

/**
 * 9.不同的二叉搜索树
 * 动态规划
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  /** 
   * [1,2,3,4,5],每个元素为根节点
   * 3为根节点时，[1,2],[3,4]各为左右子数l，r
   * 此时的搜索树个数为l*r
   */
  let dp = new Array(n+1).fill(0)
  dp[0] =0 
  dp[1] =1
  for(let i=2;i<=n;i++){
    for(let j=1;j<=i;j++){
      dp[i] += dp[j-1]*dp[i-1]
    }
  }
  return dp[n]
};
/**
 * 10.打家劫舍
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
  /**
   * 两种情况：1.上一家没偷/上一家偷了
   */
  const dfs = (node) => {
    if(!node) return [0,0]
    let l = dfs(node.left)
    let r = dfs(node.right)
    let robed = node.val + l[1] + r[1]
    let noRob = Math.max(l[0] ,l[1]) + Math.max(r[0], r[1]) // 不偷这家，还有两种情况，下一家偷/不偷
    
    return [robed, noRob]
  
  }
  const res = dfs(root)
  return Math.max(res[0], res[1])
  
};

/**
 * 11. 除法求值
 * 广度优先搜索，太难了不会
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
  /**
   * 先将equations的转换存在哈希表格中
   */
  const dfs = (querie) => {
    let n1 = map.get(querie[0]) || [querie[0], 1]
    let n2 = map.get(querie[1]) || [querie[1], 1]
    if(n1[0] === n2[0]){
      return parseFloat(n1[1]/n2[1]).toFixed(5)
    }
    dfs(n1)


  }
  const res = []
  const map = new Map()
  for(let i=0;i<equations.length;i++){
    const temp =  equations[i]
    temp[0] = temp[1]*values[i]
    console.log(temp[1]*values[i])
    map.set(temp[0], [temp[1], values[i]])
  }
  for(let j=0;j<queries.length;j++){
    const temp1 = queries[j]
    if()
  }
};