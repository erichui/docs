/**
 * keyof 获取 interface 的 key 后保存为联合类型
 */

interface UserInfo {
  name: string;
  age: number;
}

type KeyOfValue = keyof UserInfo; // name | age

/**
 * in: 取联合类型的值，主要用于数组和对象的构建
 */

type NameKey = 'firstName' | 'lastName';
type Name = {
  [key in NameKey]: string;
}
// { firstName: string; lastName: string }

type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

/**
 * infer 类型推断中声明类型变量 用于存储在模式匹配中所捕获的类型
 * infer 只能在条件类型的 extends 子句中使用，同时 infer 声明的类型变量只在条件类型的 true 分支中可用
 */

// 获取数组中的类型
type UnpackedArray<T> = T extends (infer R)[] ? R : T;

type FN = (a: string) => number;
// 获取函数返回值的类型
type UnpackedFnReturn<T extends (...args: any[]) => any> = T extends (...args: any) => infer R ? R : never;
// 获取函数参数的类型
type UnpackedFnParameter<T extends (...args) => any> = T extends (...args: infer R) => void ? R : never;


/**
 * Exclude 返回一个从T中去掉能代入K的成员后的type。
 * 多用于联合类型
 */
type MyExclude<T, E> = T extends E ? never : T;

/**
 * 和Exclude<T, E>正好相反， Extract<T, E>返回T中可以代入到E的成员所组成的type。
 */
type MyExtract<T, E> = T extends E ? T : never;

/**
 * 从类型 T 中选出符合 K 的属性，构造一个新的类型
 * 多用于对象 interface 类型
 */
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}

/**
 * Omit<T, E>返回一个从T的属性中剔除掉E过后的type
 */
type MyOmit<T, K extends keyof any> = MyPick<T,  MyExclude<keyof T, K>>; // 借助上述的 Pick Exclude 实现
type MyOmit1<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P] :T[P]
}
