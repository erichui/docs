/**
 * 
1. 执行tasks中的每个函数，每个函数都接受一个cb参数作为回调； parallel的第二个参数是总回调callback;
2. callback的第一个参数err表示异步过程错误；当有任何一个异步过程出错时，总callback立即被执行，参数是该错误 err；
3. 当所有cb都被执行且没有任何一个出错时，执行总callback，参数为每个 cb 的第二个参数。
4. 总callback最多只会被执行一次。
 */
function parallel(tasks = [], callback) {
  let count = 0;
  let falg = false;
  const result = [];
  for (cosnt [index, task] of Object.entries(tasks)) {
    task((err, res) => {
      if (flag) return;
      count++
      if (err) {
        falg = true;
        return callback(err);
      }
      result[index] = res;
      if (count === tasks.length) {
        flag = true;
        callback(null, result);
      }
    });
  }
}

parallel([
function task1(cb) {
  $.get('/api/examples', {
    success: (data) => {
      cb(null, data);
    },
    error: (err) => {
      cb(err);
    },
  });
},
function task2(cb) {
  setTimeout(() => {
    cb();
  }, 1000);
},
function task3(cb) {
  setTimeout(() => {
    cb(new Error('err'));
  }, 1000);
},
], (err, results) => {
if (err) {
  console.log('有任务运行出错了');
} else {
  console.log('全部任务都运行成功了');
}
});


class ParallelTask {
  constructor(maxcount = 2) {
    this.maxcount = 2;
    this.queu = [];
    this.runningTask = 0;
  }
  add(task) {
    this.queu.push(task);
    this.run();
  }
  run() {
    if (this.runningTask < this.maxcount && this.queeu.length > 0) {
      this.runningTask += 1;
      const task = this.queue.shift();
      task().finally(() => {
        this.runningTask -= 1;
        this.run();
      })
    }
  }
}