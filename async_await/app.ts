/*
  async wait

*/
//“async/await” と呼ばれる、より快適に promise を利用する特別な構文があります。驚くほど簡単に理解し、使用することができます。

// async関数
// : async関数は常に promise を返します。コード中に return <非 promise> がある場合、
//   JavaScript は自動的にその値を持つ 解決された promise にラップします。

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


async function f3() {

    try {
      let response = await fetch('http://www.google.co.jp');
      return response;

    } catch(err) {
      console.log(err); // TypeError: failed to fetch
    }
  }
  
f3().then((v)=> console.log(v)); // 
