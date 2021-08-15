/*
 Promise

 https://knowledge.sakura.ad.jp/24890/
*/

/************************************************/
//Promiseとは
//非同期処理を「操作」するもの
//成功時の処理、失敗時の処理を明示的に書ける。
//非同期処理の成功、失敗の処理を分岐する。
//複数の非同期処理を順番に実行したり、並行して実行する。（直列・並列）


/************************************************/
// Promiseの基本
// Promiseの引数には関数を指定し、その関数内に実行したい非同期処理を記述します。

namespace a1 {
    var myPromise = new Promise(function (resolve, reject) {
        // 実行したい処理を記述
        setTimeout(function() {
          // 成功
          resolve('成功!'); // resolve(渡したい値)
        }, 1000);
      });
      
      
      myPromise
        .then(function(value) {
          // 非同期処理が成功した場合
          console.log('実行結果:' + value); // => 実行結果:成功!
        })
        .catch(function(value) {
          // 非同期処理が失敗した場合
          console.log('実行結果:' + value); // 呼ばれない
        });

    // 複数の値を配列で渡す
    var myPromise2 = new Promise(function (resolve, reject) {
        // 複数の値を渡す場合は、配列にまとめる
        resolve([123, 'abc']); // resolve([値1, 値2...])
      });
  
  
      myPromise2
        .then(function(value) {
          console.log(value[0]); // => 123
          console.log(value[1]); // => abc
        });
}
/************************************************/
//実行パターン

/************************************************/
// 順番に実行 - その１ （直列）
namespace jp1 {
Promise.resolve()
.then(function(){
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      console.log('task1 処理中...');
      resolve('task1 完了!');
    }, 1000);
  });
})
.then(function(value){
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      console.log(value); // => task1 完了!
      console.log('task2 処理中...');
      resolve(['task2 完了!', 123]); // 複数の値を渡す時は、配列にまとめる
    }, 3000);
  });
})
.then(function(value){ // resolveで渡された値の受け取り  => ['task2 完了!', 123]
  return new Promise(function (resolve, reject) {
    console.log(value[0]); // => task2 完了!
    console.log(value[1]); // => 123
    console.log('task3 完了!');
    resolve('ok');
  });
});
} 


/****************************************************/
// 順番に実行 - その２ （直列）   then()と関数を分けて書く
namespace jp2 {
    Promise.resolve()
    .then(task1) // .then(実行したい関数名)
    .then(task2)
    .then(function(value){ // 直に処理を直接書いてもOK
      return new Promise(function (resolve, reject) {
        console.log(value[0]);
        console.log(value[1]);
        console.log('task3 完了!');
        resolve('ok');
      });
    });
  
  
  function task1(){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log('task1 処理中...');
        //resolve('task1 完了!');
        reject('task1 ERROR');
      }, 1000);
    });
  }
  
  function task2(value){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log(value);
        console.log('task2 処理中...');
        resolve(['task2 完了!', 123]); // 複数の値を渡す時は、配列にまとめる
      }, 3000);
    });
  }
}

/****************************************************/
// 順番に実行 - その２ （直列）   ERR処理
namespace jp2 {
    Promise.resolve()
    .then(task1) // .then(実行したい関数名)
    .then(task2)
    .then(function(value){ // 直に処理を直接書いてもOK
      return new Promise(function (resolve, reject) {
        console.log(value[0]);
        console.log(value[1]);
        console.log('task3 完了!');
        resolve('ok');
      });
    }).catch(function (error) {
        // 呼ばれる
        console.log(error)
      }
    );
  
  
  function task1(){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log('task1 処理中...');
        resolve('task1 完了!');
      }, 1000);
    });
  }
  
  function task2(value){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log(value);
        console.log('task2 処理中...');
        resolve(['task2 完了!', 123]); // 複数の値を渡す時は、配列にまとめる
      }, 3000);
    });
  }
}

/****************************************************/
// 順番に実行 - その３ （直列）   then()で呼び出す関数に引数を渡す
namespace jp3 {
    Promise.resolve()
    .then(task1.bind(null, '123'))
    .then(task2.bind(null, ['aaa', 'bbb'])) // bindでtask2の第1引数を固定
    .then(function(value){
      return new Promise(function (resolve, reject) {
        console.log(value);
        console.log('task3 完了!');
        resolve('ok');
      });
    })
  
  
  function task1(msg){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log('task1 処理中...');
        console.log(msg); // => 123
        resolve(['task1 完了!', msg]);
      }, 1000);
    });
  }
  
  // thenでtask2を呼び出す時に、第一引数をbindで固定しているため、値の受け取りは以下になる
  // 第1引数 args  => ['aaa','bbb']
  // 第2引数 value => ['task1 完了!', '123']
  function task2(args, value){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log(value[0]);  // => task1 完了!
        console.log(value[1]);  // => 123
        console.log(args[0]);   // => aaa
        console.log(args[1]);   // => bbb
        console.log('task2 処理中...');
        resolve('task2 完了!');
      }, 3000);
    });
  }
}
/****************************************************/
// 同時に実行 - その１ （並列）
namespace pp1 {
    Promise.all([
        taskA(),  //同時に実行したい関数名
        taskB(),
        taskC()
      ]);
      
      function taskA(){
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            console.log('taskA 完了!');
            resolve('ok');
          }, 1000);
        });
      }
      
      function taskB(){
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            console.log('taskB 完了!');
            resolve('ok');
          }, 3000);
        });
      }
      
      function taskC(){
        return new Promise(function (resolve, reject) {
          console.log('taskC 完了!');
            resolve('ok');
        });
      }


}

// 同時に実行 - その２ （並列）
namespace pp2 {
    Promise.resolve()
    .then(parallel) // 関数にまとめた並列処理を実行
  
  function parallel() {
    return Promise.all([
      taskA(),  //同時に実行したい関数名
      taskB(),
      taskC()
    ]);
  }
  
  function taskA(){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log('taskA 完了!');
        resolve('ok');
      }, 1000);
    });
  }
  
  function taskB(){
    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        console.log('taskB 完了!');
        resolve('ok');
      }, 3000);
    });
  }
  
  function taskC(){
    return new Promise(function (resolve, reject) {
      console.log('taskC 完了!');
      resolve('ok');
    });
  }
}
/************************************************/
// 引数付きPromiseチェイン

namespace pc {

    var wait_msec = function (timeout) {
        return function () {  // *1
          return new Promise((resolve) => {  // *2
            setTimeout(()=>{
              resolve('ok');
            }, timeout);
          });
        };
      };

    var main = function(){
        Promise.resolve()
        .then( wait_msec(1000) )  // 1秒待つ
        .then( ()=>{ console.log("1000 msec"); })
        .then( wait_msec(2000) )  // 2秒待つ
        .then( ()=>{ console.log("2000 msec"); })
        ;
      }

  main();

}

/*****************************************************/
import * as fs from 'fs'
namespace ex {
    
  function readFilePromise(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
          reject(err); // 失敗: 内部状態をrejectedにする
        }
        else {
          resolve(data); // 成功: 内部状態をfulfilledにする
        }
      });
    });
  }

  readFilePromise("/etc/passwd_")
  .then(
    (data) => {
      // 読み出しに成功したらresolve()に渡した値が引数として渡される
      console.log("OK", data);
    },
    (err) => {
      // 読み出しに失敗するか fs.readFile() 自体が例外を投げたら
      // reject()に渡した値が引数として渡される
      console.log("error", err);
    }
  );
  readFilePromise("/etc/passwd")
  .then(
    (data) => {
      // 読み出しに成功したらresolve()に渡した値が引数として渡される
      console.log("OK", data);
    },
    (err) => {
      // 読み出しに失敗するか fs.readFile() 自体が例外を投げたら
      // reject()に渡した値が引数として渡される
      console.log("error", err);
    }
  );
}