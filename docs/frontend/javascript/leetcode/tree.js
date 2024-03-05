const root = [1, 2, 3, 4, 5, 6];

function TreeNode(val = 0, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// 数组转化为二叉树对象结构 即顺序存储结构转化为链式存储结构
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

/**
 * 二叉树的前序遍历
 */

function preorderTraversal(root) {
  // 递归操作
  // if (root === null) return [];
  // const ret = [];
  // ret.push(root.val);
  // if (root.left) {
  //   ret.push(...preorderTraversal(root.left));
  // }
  // if (root.right) {
  //   ret.push(...preorderTraversal(root.right));
  // }
  // return ret;

  /**
   * 迭代操作
   * 递归操作 利用了系统调用栈 这里可以用栈来模拟
   * 前序遍历顺序未（根->左->右） 因为栈 后进先出 所以入栈的顺序应为：右->左
   */
  if (root === null) return [];
  const ret = [];
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const node = stack.pop();
    ret.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return ret;
};

/**
 * 二叉树的中序遍历
 */
function inorderTraversal(root) {
  // 递归
  // if (root === null) return [];
  // const ret = [];
  // if (root.left) ret.push(...inorderTraversal(root.left));
  // ret.push(root.val);
  // if (root.right) ret.push(...inorderTraversal(root.right));
  // return ret;
  /**
   * 迭代
   * 与前序遍历不同，访问根节点要放在左子树遍历完之后。
   * 因此我们需要保证：在左子树访问之前，当前节点不能提前出栈。
   * 
   */
  if (root === null) return [];
  const ret = [];
  const stack = [];
  let head = root;
  while(head || stack.length > 0) {
    // 左子树一直入栈
    while (head) {
      stack.push(head);
      head = head.left
    }
    // 左子树为空时 当前栈顶元素为左子树的叶子节点 左子树节点依次出栈
    const node = stack.pop();
    ret.push(node.val);
    // 遍历右子树
    if (node.right) {
      head = node.right;
    }
  }
  return ret;
}

/**
 * 后续遍历
 */
function postorderTraversal(root) {
  // 递归
  // if (root === null) return [];
  // const ret = [];
  // ret.push(...postorderTraversal(root.left));
  // ret.push(...postorderTraversal(root.right));
  // ret.push(root.val);
  // return ret;
  /**
   * 迭代
   * 和前序遍历类似  前序 根 -> 左 -> 右  后续 左 -> 右 -> 根
   * 所以后续遍历只需要在插入数组的时候  从前添加即可
   * 
   */
  if (root === null) return [];
  const ret = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    ret.unshift(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return ret;
}

/**
 * 广度优先遍历 层序遍历
 * 输入：root = [3,9,20,null,null,15,7]
   输出：[[3],[9,20],[15,7]]  结果为二位数组
 */

function levelOrder(root) {
  // 递归
  // const ret = [];
  // function _levelOrder(node, level) {
  //   if (node === null) return;
  //   // 当前层数组初始化
  //   ret[level] = ret[level] ?? [];
  //   ret[level].push(node.val);
  //   // 遍历下一层节点
  //   _levelOrder(node.left, level + 1);
  //   _levelOrder(node.right, level + 1);
  // }
  // _levelOrder(root, 0);
  // return ret;
  /**
   * 迭代
   * 使用队列来保存节点，每轮循环中，都取一层出来，将它们的左右孩子放入队列。
   */
  if (root === null) return [];
  const ret = [];
  const queue = [root]; // 使用队列
  let level = 0;
  while (queue.length > 0) {
    ret.push([]); // 初始化每层
    // 一次性把该层的所有元素都遍历一下
    const len = queue.length; // len 循环过程中会变化 所以需要前置定义
    for (let i = 0; i < len; i++) {
      const node = queue.shift(); // 从前面取出当前元素a
      ret[level].push(node.val);  // 记录当前元素a的值
      // 元素a 出队列后 把它的子树放到队列中
      if (node.left) queue.push(node.left);  
      if (node.right) queue.push(node.right);
    }
    // 层级 + 1
    level++;
  }
  return ret;
}

/**
 * 二叉树的最大深度
 * 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
 */

function maxDepth(root) {
  // 递归方式
  // function _maxDepth(node) {
  //   // 确定终止条件
  //   if (node === null) return 0;
  //   const leftDepth = _maxDepth(node.left); // 递归左子树的最大深度
  //   const rightDepth = _maxDepth(node.right); // 递归右子树的最大深度
  //   return 1 + Math.max(leftDepth, rightDepth); // 计算当前节点的最大深度 并返回
  // }
  // return _maxDepth(root);

  /**
   * 迭代
   * 使用二叉树层序遍历 level 即为最大的深度
   */
  if (root === null) return 0;
  const queue = [root];
  let level = 0;
  while (queue.length > 0) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    level++;
  }
  return level;
};

/**
 * 二叉树的最小深度
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * [2,null,3,null,4,null,5,null,6]
 */
function miniDepth(root) {
  // 递归
  if (root === null) return 0;
  function _miniDepth(node) {
    if (node === null) return 0;
    if (node.left === null) return 1 +  _miniDepth(node.right); // 左子树为空时 只有右子树 递归右子树即可
    if (node.right === null) return 1 +  _miniDepth(node.left); // 右子树为空时 递归左子树
    const leftDepth = _miniDepth(node.left);
    const rightDepth = _miniDepth(node.right);
    return 1 + Math.min(leftDepth, rightDepth);
  }
  return _miniDepth(root);
  /**
   * 迭代
   * 可用层序遍历的方式
   * 当改节点的左右子树都为空时 此时的深度即为二叉树的最小深度
   */
  if (root === null) return 0;
  const queue = [root]
  let level = 0;
  while (queue.length > 0) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      if (node.left === null && node.right === null) return level + 1;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    level++;
  }
}

/**
 * 对称二叉树
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * [1,2,2,null,3,null,3]
 */
function isSymmetric(root) {
  if (root === null || (root.left === null && root.right === null)) return true;
  // 递归
  // function check(left, right) {
  //   if (!left && !right) return true;

  //   if (!left && right) return false;
  //   if (left && !right) return false;
  //   if (left.val !== right.val) return false;
  //   return check(left.left, right.right) && check(left.right, right.left);
  // }
  // return check(root.left, root.right);
  /**
   * 迭代
   */
  const queue = [root.left, root.right];
  while(queue.length > 0) {
    const tree1 = queue.shift();
    const tree2 = queue.shift();
    if (!tree1 && !tree2) continue;
    if (!tree1 && tree2) return false;
    if (tree1 && !tree2) return false;
    if (tree1.val !== tree2.val) return false;
    queue.push(tree1.left);
    queue.push(tree2.right);

    queue.push(tree1.right);
    queue.push(tree2.left);
  }
  return true;
};


/**
 * 最大二叉树
 * 输入：root = [1,2,2,3,4,4,3]
 * 
  输出：true
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
  // 递归
  function maxTree(nums = [], left, right) {
    if (left > right) return 0;
    let maxIndex = left;
    for (let i = left + 1; i <= right; i++) {
      if (nums[i] > nums[maxIndex]) maxIndex = i;
    }
    const node = new TreeNode(nums[maxIndex]);
    node.left = maxTree(nums, left, maxIndex - 1);
    node.right = maxTree(nums, maxIndex + 1, right);
    return node;
  };
  return maxTree(nums, 0, nums.length - 1);
};

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
      const cur = new TreeNode(num)
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