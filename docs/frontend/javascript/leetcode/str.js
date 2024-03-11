// 
/**
 * 字符串相加
 * 输入：num1 = "11", num2 = "123
 * 输出："134"
 */

function addStrings(num1 = '', num2 = '') {
  let p1 = num1.length - 1;
  let p2 = num2.length - 1;
  let ret = '';
  let add = 0;
  while(p1 >= 0 || p2 >= 0 || add !== 0) {
    const _num1 = num1[p1--] ?? 0;
    const _num2 = num2[p2--] ?? 0;
    const sumResult = (+_num1) + (+_num2) + add;
    add = Math.floor(sumResult / 10);
    ret = sumResult % 10 + ret;
  }
  return ret;
}

/**
 * 有效的括号
 * 
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 sss。
 * 输入：s = "()[]{}"  '([{}])'
输出：True
 */

function isValid(strs = '') {
  if (strs.length % 2 !== 0) return false;
  const stack = [];
  const map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ]);
  for (let s of strs) {
    if (map.get(stack[stack.length - 1]) === s) {
      stack.pop();
    } else {
      stack.push(s);
    }
  }
  return stack.length === 0;
}

/**
 * 基本计算器
 * 
 * 
 * 给你一个字符串表达式 s ，s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
 * 请你实现一个基本计算器来计算并返回它的值。

整数除法仅保留整数部分。 运算符只有 + - * /

你可以假设给定的表达式总是有效的。所有中间结果将在 [-231, 231 - 1] 的范围内。

注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。

输入：s = "35+21*2"
输出：7
 */

// 栈，乘除优先计算
// 时间: O(n)
// 空间: O(n)

function calculate(str) {
  const s1 = '+';
  const s2 = '-';
  const s3 = '*';
  const s4 = '/';
  const stack = [];
  let num = '';
  let preOpe = s1; // 存储操作符
  for (let i = 0; i < str.length; i++) {
    while (str[i] === ' ') i++; // 过滤空格
    // 获取连续的数字字符串
    while (![s1, s2, s3, s4].includes(str[i]) && i < str.length) {
      num += str[i];
      i++;
    }
    // 根据前置的操作符做判断
    // 如果当前字符是'+'，将后面的数字，push到stack中
    // 如果当前字符是'-'，将后面的数字的负数，push到stack中
    // 如果当前字符是'*'，将后面的数字与栈顶数字相乘后的结果，更新栈顶元素
    // 如果当前字符是'/'，将后面的数字与栈顶数字相除并向下取整后的结果，更新栈顶元素
    switch (preOpe) {
      case s1: 
        stack.push(num - 0);
        break;
      case s2:
        stack.push(0 - num);
        break;
      case s3:
        stack.push(stack.pop() * num);
        break;
      case s4:
        stack.push(Math.floor(stack.pop() / num));
        break;
    }
    preOpe = str[i]; // 更新操作符
    num = ''; // 重置当前值
  }
  return stack.reduce((pre, cur) => {
    return pre + cur;
  }, 0)
}

/**
 * 最长公共前缀
 * 字符串数组的最长公共前缀
 */
function findCommonPrefix(strs = []) {
  // 暴力 双重循环
  // let str = '';
  // const firstStr = strs[0];
  // const length = firstStr.length;
  // for (let j = 0; j < length; j++) {
  //   const _str = str + firstStr[j];
  //   for (let i = 1; i < strs.length; i++) {
  //     if (!strs[i].startsWith(_str)) {
  //       return str;
  //     }
  //   }
  //   str = _str;
  // }
  // return str;

  /**
   * 先对字符串数组进行排序（字母顺序）
   * 然后遍历第一个元素 只需要对比收尾两个字符串对应位置即可
   */
  strs = strs.sort();
  let str = '';
  const firstStr = strs[0];
  for (let i = 0; i < firstStr.length; i++) {
    if (firstStr[i] === strs[strs.length - 1][i]) {
      str += firstStr[i];
    } else {
      break;
    }
  }
  return str;
}

/**
 * 字符串解码
 * 
 * 给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 * 样例输入：s = "3[a2[c]]"
样例输出：accaccacc

输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"

输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
 */
// "3[a]2[bc]"
// "3[a2[c]]"
/**
 * 
如果当前的字符为数位，解析出一个数字（连续的多个数位）并进栈
如果当前的字符为字母或者左括号，直接进栈
如果当前的字符为右括号，开始出栈，一直到左括号出栈，出栈序列反转后拼接成一个字符串，此时取出栈顶的数字（此时栈顶一定是数字，想想为什么？），
就是这个字符串应该出现的次数，我们根据这个次数和字符串构造出新的字符串并进栈
 */

function decodeString(str) {
  let ret = '';
  const stack = [];
  let i = 0;
  while (i < str.length) {
    if (str[i] > 0) {
      const num = stack.pop() ?? 0;
      stack.push(num * 10 + str[i]);
    } else if (str[i] !== ']') {
      stack.push(str[i]);
    } else {
      let _str = '';
      while(stack.length && stack[stack.length - 1] !== '[') {
        _str = stack.pop() + _str;
      }
      stack.pop();
      let repeatCount = 0;
      while(stack.length && Number(stack[stack.length - 1]) > 0) {
        repeatCount = Number(stack.pop() ?? 0) +  repeatCount * 10; 
      }
      console.log(repeatCount, ret);
      const repeatStr = ret;
      while (repeatCount > 1) {
        ret += repeatStr;
        repeatCount--;
      }
      console.log(ret, repeatCount)
    }
    i++;
  }
  return ret;
}


/**
 * 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。

当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的正整数矩阵 costs 来表示的。

例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。

请计算出粉刷完所有房子最少的花费成本

输入: costs = [
  [17,2,17],
  [16,16,5],
  [14,3,19]
]
输出: 10
解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
     最少花费: 2 + 5 + 3 = 10。
*/

function findMin(prices = [], index) {
  const filter = index >= 0
    ? prices.filter((_, i) => i !== index)
    : prices;
  let min = filter[0];
  for (let i = 1; i < filter.length; i++) {
    if (filter[i] < min) {
      min = filter[i];
    }
  }
  return min;
}
function minCost(costs) {
  let result = 0;
  function _minCost(costs) {
    if ()
  }
  _minCost(costs);
  return result;
};

function minCost(costs: number[][]): number {
  const n: number = costs.length;

  // dp[i][0|1|2]
  const dp: number[][] = new Array(n + 1)
    .fill(0)
    .map(() => new Array(3).fill(0));

  for (let i = 1; i <= n; i++) {
    // 当前房子的颜色不能与上一个房子的颜色相同
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i - 1][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i - 1][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i - 1][2];
  }

  return Math.min(...dp[n]);
};

class Solution {
  public int minCost(int[][] costs) {
      int[][] dp = new int[costs.length][3];
      // 0 - 红色
      // 1 - 蓝色
      // 2 - 绿色
      dp[0][0] = costs[0][0];
      dp[0][1] = costs[0][1];
      dp[0][2] = costs[0][2];
      for (int i = 1; i < costs.length; i++) {
          dp[i][0] = Math.min(dp[i-1][1], dp[i-1][2]) + costs[i][0];
          dp[i][1] = Math.min(dp[i-1][0], dp[i-1][2]) + costs[i][1];
          dp[i][2] = Math.min(dp[i-1][0], dp[i-1][1]) + costs[i][2];
      }
      return Math.min(dp[costs.length-1][0], Math.min(dp[costs.length-1][1], dp[costs.length-1][2]));
  }
}

/**
 * 给你两个版本号 version1 和 version2 ，请你比较它们。

版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。
每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。
例如，2.5.33 和 0.1 都是有效的版本号。

比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。
也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。
例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。

返回规则如下：

如果 version1 > version2 返回 1，
如果 version1 < version2 返回 -1，
除此之外返回 0。

输入：version1 = "1.01", version2 = "1.001"
输出：0

 */

function compareVersion(version1, version2) {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');
  for (let i = 0; i < arr1.length || i < arr2.length; i++) {
    const num1 = Number(arr1[i] ?? 0);
    const num2 = Number(arr2[i] ?? 0);
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}