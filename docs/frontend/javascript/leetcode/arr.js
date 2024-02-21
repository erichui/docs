// 合并两个有序数组
/**
 * arr1 = [1,2,3,0,0,0], m = 3, arr2 = [2,5,6], n = 3
 * [1,2,2,3,5,6]
 * 时间复杂度为 O(m + n) 
 */
function merge(arr1, m, arr2, n) {
  // return arr1.concat(arr2).sort((a, b) => a - b);

  let ret = [];
  let p1 = 0;
  let p2 = 0;
  while(p1 < m || p2 < n) {
    if (p1 === m) {
      ret.push(arr2[p2]);
      p2++;
    } else if (p2 === n) {
      ret.push(arr1[p1]);
      p1++;
    } else if (arr1[p1] < arr2[p2]) {
      ret.push(arr1[p1]);
      p1++
    } else {
      ret.push(arr2[p2]);
      p2++;
    }
  }
  return ret;
}


// 只出现一次的数字

function singleNumber(nums) {
  // const map = {};
  // for (let i = 0; i < nums.length; i++) {
  //   const key = nums[i];
  //   const value = map[key] ?? 0;
  //   map[key] = value + 1;
  // }
  // return Object.entries(map).find(([_key, val]) => val === 1)[0];
  
  /**
   * 异或操作
   * 任务数字 n 和 0 异或 都为自身 即 n ^ 0 = n
   * 数字本身异或都为 0 即 n ^ n = 0
   */
  let ret = 0;
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    ret = ret ^ nums[i];
  }
  return ret;
};


/**
 * 旋转数组
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负整数。
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
 */

function rotate(nums, k) {
  // k = k%nums.length;
  // const tail = nums.slice(0, -k);
  // const pre = nums.slice(-k);
  // [...pre, ...tail].forEach((item, index) => {
  //     nums[index] = item
  // })
  for (let i = 0; i < k; i++) {
    const last = nums.pop();
    nums.unshift(last);
  }
};


rotate([1,2,3,4,5,6,7], 3);

/**
 * 两个数组的交集 II
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。
 * 返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。
 * 可以不考虑输出结果的顺序。
  输入：nums1 = [1,2,2,1], nums2 = [2,2]
  输出：[2,2]
 */


function intersect(nums1 = [], nums2 = []) {
  // map 保存每个 num 出现的次数
  const map = new Map();
  for(let i = 0; i < nums1.length; i++) {
    const val = map.get(nums1[i]);
    map.set(nums1[i], val ? val + 1 : 1);
  }
  const res = [];
  for (let i = 0; i< nums2.length; i++) {
    const val = map.get(nums2[i]);
    if (val) {
      res.push(nums2[i]);
      map.set(nums2[i], val - 1);
    }
  }
  return res;
}

intersect();

// 排序以后 双指针
function intersectSort(nums1 = [], nums2 = []) {
  nums1.sort((a,b)=>a-b);
  nums2.sort((a,b)=>a-b);
  let i = 0, j = 0;
  const res = [];
  while(i < nums1.length && j < nums2.length){
      if(nums1[i] == nums2[j]){
          res.push(nums1[i]);
          i++;
          j++;
      }else if (nums1[i] > nums2[j]){
          j++;
      }else{
          i++;
      }
  }
  return res;
};

/**
 * 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 
 */

// 即寻找 数组中是否存在 target - nums[i] 的元素
function twoSum(nums = [], target) {
  /**
   * 时间复杂度 O(n^2)
   * 空间复杂度 O(1)
   */
  // for (let i = 0; i < nums.length; i++) {
  //   const ret = target - nums[i];
  //   let j = nums.length - 1;
  //   while(j >= 0) {
  //     if (nums[j] === ret && j !== i) {
  //       return [i, j];
  //     }
  //     j--;
  //   }
  // }

  /**
   * 遍历的时候 同时生成对应的 哈希表
   * 后续元素即可快速比较
   * 空间换时间： 时间复杂度 O(n) 空间复杂度 O(n)
   */
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const ret = target - nums[i];
    if (map.has(ret)) {
      return [map.get(ret), i];
    }
    map.set(nums[i], i);
  }
};




/**
 * 单调栈（从左到右遍历）
 * 单调递增栈 寻找第一个比元素大的值  
 * 单调递减栈 寻找第一个比当前元素小的值
 * - 元素左侧寻找：当前元素将要入栈时的栈顶元素  栈为空时 说明左侧不存在比目标元素大/小的值
 * - 元素右侧寻找：当前元素出栈时即将入栈的元素  目标元素未出栈 说明右侧不存在比目标元素大/小的值
 */
// 构造单调递增栈 monotoneIncreasingStack
function MIStack(arr = []) {
  const stack = [];
  for (let item of arr) {
    // 当前元素大于栈顶元素时 栈内较小的元素需要出栈
    while (stack.length > 0 && item > stack[stack.length - 1]) {
      stack.pop();
    }
    stack.push(item);
  }
  return stack;
}

// 构造单调递减栈 monotoneDecreasingStack
function MDStack(arr = []) {
  const stack = [];
  for (let item of arr) {
    while(stack.length > 0 && stack[stack.length - 1] > item) {
      stack.pop();
    }
    stack.push(item);
  }
  return stack;
}


/**
 * 给出每个a元素左侧第一个比a 大的元素
 * 单调递增栈
 * 入栈时的栈顶元素 
 */
function leftFirstMax(arr = []) {
  const stack = [];
  const map = new Map();
  for (const item of arr) {
    while(stack.length > 0 && stack[stack.length - 1] < item) {
      stack.pop();
    }
    map.set(item, stack[stack.length - 1] ?? -1)
    stack.push(item);
  }
  return map;
}

// 镜像问题 右侧
function rightFirstMax(arr = []) {
  const stack = [];
  const map = new Map();
  for (const item of arr) {
    while(stack.length > 0 && stack[stack.length - 1] < item) {
      const popItem = stack.pop();
      map.set(popItem, item);
    }
    stack.push(item);
  }
  for (const stackItem of stack) {
    map.set(stackItem, -1);
  }
  return map;
}


/**
 * 下一个更大的元素
 * 
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。

给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。

对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。
如果不存在下一个更大元素，那么本次查询的答案是 -1 。

返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。

输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
输出：[-1,3,-1]
解释：nums1 中每个值的下一个更大元素如下所述：
- 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
- 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
- 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 */

function nextGreaterElement(nums1, nums2) {
  const ret = [];
  /**
   * 遍历 nums1 然后再遍历 nums2 生成单调递增栈 同时找出右侧下一个更大的元素
   * 时间复杂度 O(n^2)
   */
  // for (let i = 0; i < nums1.length; i++) {
  //   const stack = [];
  //   let flag = false;
  //   for (let j = 0; j < nums2.length; j++) {
  //     while(stack.length > 0 && stack[stack.length - 1] < nums2[j]) {
  //       const popItem = stack.pop();
  //       if (popItem === nums1[i]) {
  //         flag = true;
  //         ret.push(nums2[j]);
  //         break;
  //       }
  //     }
  //     stack.push(nums2[j]);
  //   }
  //   if (!flag) ret.push(-1);
  // }
  // return ret;

  /**
   * 因为 nums1 是 nums2 的子集 所以可以遍历 nums2 生成单调递增栈 并记录每个元素右侧下一个更大值
   * 遍历 nums1 获取对应的最大值即可
   * 时间复杂度 O(n)
   */
  const map = new Map();
  const stack = [];
  for (const item of nums2) {
    while(stack.length > 0 && stack[stack.length - 1] < item) {
      const popItem = stack.pop();
      map.set(popItem, item);
    }
    stack.push(item);
  }
  for(const stackItem of stack) {
    map.set(stackItem, -1);
  }
  return nums1.map(_item => map.get(_item));
};