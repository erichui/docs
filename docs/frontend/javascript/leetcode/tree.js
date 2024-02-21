const root = [1, 2, 3, 4, 5, 6];

function TreeNode(val = 0, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// 数组转化为二叉树对象结构
function array2Tree(root = []) {
  const len = root.length;
  if (len < 1) return null;
  let i = 0;
  const head = new TreeNode(root[i]);
  const queue = [head];
  while (i < len) {
    i++;
    const parent = queue.shift();
    if (root[i] !== null && root[i] !== undefined) {
      const node = new TreeNode(root[i]);
      parent.left = node;
      queue.push(node);
    }
    i++;
    if (root[i] !== null && root[i] !== undefined) {
      const node = new TreeNode(root[i]);
      parent.right = node;
      queue.push(node);
    }
  }
  return head;
}

console.log(array2Tree([5,4,8,11,null,13,4,7,2,null,null,null,1]));

/**
 * 最大二叉树
 * 
 * 
 */
/**
 * 给定一个不重复的整数数组 nums 。 
最大二叉树 可以用下面的算法从 nums 递归地构建:
创建一个根节点，其值为 nums 中的最大值。
递归地在最大值 左边 的 子数组前缀上 构建左子树。
递归地在最大值 右边 的 子数组后缀上 构建右子树。
返回 nums 构建的 最大二叉树 。

输入：nums = [3,2,1,6,0,5]
输出：[6,3,5,null,2,0,null,null,1]
 */

/**
 * RMQ 区间求最值问题
 */

function constructMaximumBinaryTree(nums){
  return build(nums, 0, nums.length - 1)
};

// 递归分治  时间复杂度 O(n^2) 空间复杂度 O(1)
function build(nums = [], left = 0, right = 0) {
  if (left > right) return null; // 注意递归终结条件
  let maxIndex = left;
  for (let i = left + 1; i <= right; i++) {
    if (nums[i] > nums[maxIndex]) maxIndex = i;
  }
  const head = new TreeNode(nums[maxIndex])
  head.left = build(nums, left, maxIndex - 1);
  head.right = build(nums, maxIndex + 1, right);
  return head;
}
console.log(constructMaximumBinaryTree([3,2,1,6,0,5]), 'constructMaximumBinaryTree');

/**
 * 
 * 维持一个单调栈；
当节点值大于栈顶时，弹出栈顶作为当前节点的左孩子（可以理解为维护不了单调栈了要弹出，比当前节点这个较大值更早出现，因此在左边
栈顶的右孩子就是当前节点（比栈顶晚出现，就在其右边
当前节点加入栈
不太理解 可忽略
 */
function constructMaximumBinaryTreeStack(nums) {
  const stack = new Array()
  for (const num of nums) {
      const cur: TreeNode = new TreeNode(num)
      while (stack.length > 0 && stack[stack.length - 1].val < num) {
          cur.left = stack.pop()
      }
      if (stack.length > 0) {
          stack[stack.length - 1].right = cur
      }
      stack.push(cur)
  }
  return stack[0]
};

/**
 * 从前序与中序遍历序列构造二叉树
 * 
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

 */

// 二叉树完整路径数字总和
function sumNumbers(root) {
  
};

// 二叉树完整路径数字想加和目标值比较
function hasPathSum(root, targetNum) {
  
}



var sumNumbers = function(root) {
  return dfs(root, 0);
};


/**
 * 给你一个链表的头节点 head ，判断链表中是否有环。
如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
如果链表中存在环 ，则返回 true 。 否则，返回 false 。

输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
 */


/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function ListNode(val = 0, next = null) {
  this.val = val;
  this.next = next;
}

function hasCycle(head) {
    
};