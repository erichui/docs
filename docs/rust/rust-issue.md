### Vec

1. 获取集合中的元素时，是否需要添加引用 `&`
    - 当集合内元素实现了 `Copy trait` 时（多为标量类型存储在栈上），可加可不加
        - 加 `&` 获取元素的引用
        - 不加则会拷贝当前元素的值到新的变量上
    - 当元素没有实现 `Copy trait` 时，类如 `String` 则必须加 `&`，如果不加的话会触发 `move` 操作，同时为了保证 `vec` 的完整性，要触发元素的 `copy` 操作，添加引用 `&` 后就不会触发 `move` 操作

    ```rust
    let test_vec = vec![String.from("str1"), String.from("str2")];
    let str1 = &test_vec[0];
    ```

### Struct

1. 如何在结构体中存储引用
  > 要想存储引用，必须加上生命周期，以确保结构体的作用范围比引用的数据的作用范围小
  ```rust
  struct User<'a'> {
    username: &'a str,
  }
  let color: (i32, i32, i32) = (112, 23, 21);
  struct Color (i32, i32, i32);
  ```