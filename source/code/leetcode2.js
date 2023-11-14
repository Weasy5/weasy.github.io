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
  let n = prices.length
  let buy = -prices[0] // 买入
  let sell = 0 // 手中没有股票
  let profit_freeze = 0 //冷冻期收益
  
};