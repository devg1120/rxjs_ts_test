/*
  async wait

*/
//“async/await” と呼ばれる、より快適に promise を利用する特別な構文があります。驚くほど簡単に理解し、使用することができます。

// async関数
//async functionは呼び出されるとPromiseを返す。
//async functionが値をreturnした場合、Promiseは戻り値をresolveする。
//async functionが例外や何らかの値をthrowした場合はその値をrejectする。

namespace exasync {
// resolve1!!をreturnしているため、この値がresolveされる
async function resolveSample() {
    return 'resolve!!';
}

// resolveSampleがPromiseを返し、resolve!!がresolveされるため
// then()が実行されコンソールにresolve!!が表示される
resolveSample().then(value => {
    console.log(value); // => resolve!!
});


// reject!!をthrowしているため、この値がrejectされる
async function rejectSample() {
    throw new Error('reject!!');
}

// rejectSampleがPromiseを返し、reject!!がrejectされるため
// catch()が実行されコンソールにreject!!が表示される
rejectSample().catch(err => {
    console.log(err); // => reject!!
});


// resolveErrorはasync functionではないため、Promiseを返さない
function resolveError() {
    return 'resolveError!!';
}

// resolveErrorはPromiseを返さないため、エラーが発生して動かない
// Uncaught TypeError: resolveError(...).then is not a function
//resolveError().then(value => {
//    console.log(value);
//});


}




async function f() {
  return 1;
}
// 上のコードは 結果 1 を持つ解決された promise を返します
f().then((v)=> console.log(v)); // 1

// await
// キーワード await は promise が確定しその結果を返すまで、JavaScript を待機させます
// async 関数の中でのみ動作します

async function f2() {
// async関数は常にPromiseを返します

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise; // promise が解決するまで待ちます (*)
  
    console.log(result); // "done!"

    return result+'OKOKOK'; // async functionの機能で解決済Promiseが生成される
  }
  
f2().then((v)=> console.log(v)); // "done!OKOKOK"

/*
async function f3() {

    try {
      let response = await fetch('http://www.google.co.jp');
      return response;

    } catch(err) {
      console.log(err); // TypeError: failed to fetch
    }
  }
  
f3().then((v)=> console.log(v)); // 
*/

//awaitとは
//awaitを指定した関数のPromiseの結果が返されるまで、async function内の処理を一時停止する。
//結果が返されたらasync function内の処理を再開する。

//async function内でPromiseの結果（resolve、reject）が返されるまで待機する（処理を一時停止する）演算子のこと。
//以下のように、関数の前にawaitを指定すると、その関数のPromiseの結果が返されるまで待機する。

// async/awaitの利用例
// async/await
namespace a1 {
  function sampleResolve(value) :Promise<number>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value * 2);
        }, 2000);
    })
}

/**
 * sampleResolve()をawaitしているため、Promiseの結果が返されるまで処理が一時停止される
 * 今回の場合、2秒後にresolve(10)が返ってきてその後の処理（return result + 5;）が再開される
 * resultにはresolveされた10が格納されているため、result + 5 = 15がreturnされる
 */
async function sample() : Promise<number>{
     const r:number = await sampleResolve(5);
    return r + 5;
}

sample().then(result => {
    console.log(result); // => 15
});
}

// 上記の処理をPromiseの構文で書くと
namespace a2 {
  function sampleResolve(value) :Promise<number>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value * 2);
        }, 2000);
    })
}

function sample() :Promise<number>{
    return sampleResolve(5).then(result => {
        return result + 5;
    });
}

sample().then(result => {
    console.log(result); // => 15
});
}

//連続した非同期処理（Promise構文）

namespace a3 {
  function sampleResolve(value):Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    })
}

function sample() :Promise<number>{
    let result = 0;

    return sampleResolve(5)
        .then(val => {
            result += val;
            return sampleResolve(10);
        })
        .then(val => {
            result *= val;
            return sampleResolve(20);
        })
        .then(val => {
            result += val;
            return result;
        });
}

sample().then((v) => {
    console.log(v); // => 70
});
}

//連続した非同期処理（async/await構文）

namespace a4 {
  function sampleResolve(value):Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    })
}

async function sample() :Promise<number>{
    return await sampleResolve(5) * await sampleResolve(10) + await sampleResolve(20);
}

async function sample2() :Promise<number>{
    const a = await sampleResolve(5);
    const b = await sampleResolve(10);
    const c = await sampleResolve(20);
    return a * b + c;
}

sample().then((v) => {
    console.log(v); // => 70
});

sample2().then((v) => {
    console.log(v); // => 70
});

}

// forを利用した繰り返しの非同期処理も書ける。

namespace a5 {
  function sampleResolve(value) :Promise<number>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    })
}

async function sample() :Promise<string>{
    for (let i = 0; i < 5; i += 1) {
        const result = await sampleResolve(i);
        console.log(result);
    }

    return 'ループ終わった。'
}

sample().then((v) => {
    console.log(v); // => 0
                    // => 1
                    // => 2
                    // => 3
                    // => 4
                    // => ループ終わった。
});


}

// array.reduce()も利用できる。
/*
namespace a6 {
  function sampleResolve(value) : Promise<number>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    })
}

async function sample() :Promise<Promise<Promise<number>>> {
    const array = [5, 10, 20];
    const sum  = await array.reduce(async (sum, value):Promise<number>  => {
      return (await sum) + (await sampleResolve(value) * 2);
    }, 0);

    return sum;
}

sample().then((v) => {
    console.log(v); // => 70
});

}
*/

// 並列の非同期処理（Promise構文）
namespace a7 {
    function sampleResolve(value) :Promise<number>{
        return new Promise(resolve => {
              setTimeout(() => {
                  resolve(value);
              }, 2000);
          })
      }
      
      function sampleResolve2(value) :Promise<number>{
        return new Promise(resolve => {
              setTimeout(() => {
                  resolve(value * 2);
              }, 1000);
          })
      }
      
      function sample() :Promise<number[]>{
          const promiseA = sampleResolve(5);
          const promiseB = sampleResolve(10);
          const promiseC = promiseB.then(value => {
              return sampleResolve2(value);
          });
      
          return Promise.all([promiseA, promiseB, promiseC])
              .then(([a, b, c]) => {
                  return [a, b, c];
              });
      }
      
      sample().then(([a, b, c]) => {
          console.log(a, b, c); // => 5 10 20
      });
}

// 並列の非同期処理（async/await構文）

namespace a8 {
    function sampleResolve(value) :Promise<number>{
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value);
            }, 2000);
        })
    }
    
    function sampleResolve2(value) :Promise<number>{
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value * 2);
            }, 1000);
        })
    }
    
    async function sample() : Promise<[number,number,number]> {
        const [a, b] = await Promise.all([sampleResolve(5), sampleResolve(10)]);
        const c = await sampleResolve2(b);
    
        return [a, b, c];

    }
    
    sample().then(([a, b, c]) => {
        console.log(a, b, c); // => 5 10 20
    });
}


//

namespace a9 {
    function sampleResolve(value) : Promise<number>{
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value);
            }, 2000);
        })
    }
    
    async function sample() : Promise<number[]> {
        const array =[5, 10, 15];
        const promiseAll = await Promise.all(array.map(async (value) => {
            return await sampleResolve(value) * 2;
      }));
    
        return promiseAll;
    }
    
    sample().then(([a, b, c]) => {
        console.log(a, b, c); // => 10 20 30
    });

}

// 例外処理（エラーハンドリング）Promise構文）

namespace er1 {
    function throwError() :Promise<number|string>{
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                try {
                    throw new Error('エラーあったよ');
                    resolve('エラーなかった');
                } catch(err) {
                    reject(err);
                }
            }, 1000);
        });
    }
    
    function errorHandling() :Promise<number|string>{
        return throwError()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                throw err;
            });
    }
    
    errorHandling().catch((err) => {
        console.log(err); // => エラーあったよ
    });


}


// 例外処理（エラーハンドリング）async/await構文）

namespace er2 {
    function throwError() :Promise<number|string>{
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                try {
                    throw new Error('エラーあったよ')
                    resolve('エラーなかった');
                } catch(err) {
                    reject(err);
                }
            }, 1000);
        });
    }
    
    async function errorHandling() :Promise<number|string>{
        try {
            const result = await throwError();
            return result;
        } catch (err) {
            throw err;
        }
    }
    
    errorHandling().catch((err) => {
        console.log(err); // => エラーあったよ
    });

}