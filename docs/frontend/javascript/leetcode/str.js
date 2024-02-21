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

console.log(addStrings('1', '9'));

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
  const map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');
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
    num = ''; // 充值当前值
  }
  return stack.reduce((pre, cur) => {
    return pre + cur;
  }, 0)
}
function calculate(s) {
  // 如果当前字符是'+'，将后面的数字，push到stack中
  // 如果当前字符是'-'，将后面的数字的负数，push到stack中
  // 如果当前字符是'*'，将后面的数字与栈顶数字相乘后的结果，更新栈顶元素
  // 如果当前字符是'/'，将后面的数字与栈顶数字相除并向下取整后的结果，更新栈顶元素
  // 最后再遍历stack，将所有数字相加，得到答案
  const stack = [];
  let ans: number = 0;
  let cur: number = 0;
  let prevOpe: string = "+";
  for (let i = 0; i < s.length; ) {
    while (s[i] === " ") {
      i++;
    }
    while (
      !(
        s[i] === "+" ||
        s[i] === "-" ||
        s[i] === "*" ||
        s[i] === "/" ||
        s[i] === " "
      ) &&
      i < s.length
    ) {
      cur = cur * 10 + (s[i].charCodeAt(0) - "0".charCodeAt(0));
      i++;
    }
    switch (prevOpe) {
      case "+":
        stack.push(cur);
        break;
      case "-":
        stack.push(-cur);
        break;
      case "*":
        stack.push((stack.pop() || 0) * cur);
        break;
      case "/":
        // 题目要求只保留整数部分
        // 正数: 向下取整
        // 负数: 向上取整
        const temp = (stack.pop() || 0) / cur;
        stack.push(temp > 0 ? Math.floor(temp) : Math.ceil(temp));
        break;
      default:
    }
    prevOpe = s[i];
    i++;
    cur = 0;
  }
  // 再遍历一次，把所有数字相加，得到答案
  for (const n of stack) {
    ans += n;
  }
  return ans;
}

console.log(calculate("35+21*2"), 'calculate');