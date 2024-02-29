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

console.log(decodeString('3[a]2[bc]'), 'decodeString');