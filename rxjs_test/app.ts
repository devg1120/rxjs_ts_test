// RxJS v6+
import { of, Observable, throwError } from 'rxjs'
import { map, take, mergeMap, catchError } from 'rxjs/operators'

// ** 簡単な例

of(1,2,3).pipe(
    take(2),
    map((n) => n ** 2)
).subscribe(n => {
    console.log(n);
});

console.log('--------------------------------------------------');

// ** 複雑な例

// エラーを返しうるなんらかのAPIの模倣
function someApi(n: number): Observable<string> {
    if (n === 0) {
        return throwError('zeroはダメ');
    } else if (n < 0) {
        return of('ng');
    }

    return of('ok');
}

// 引数に属性を付けて返すなんらかのAPIの模倣
function someApi2(s: string): Observable<string> {
    return of(s + '@@@');
}

// ユーザの入力値の模倣
const userInput = of(1,3,-1, 0, 2);

userInput.pipe(
    mergeMap(n => someApi(n)),
    // someApiでのエラー時に、subscribeのエラー処理にフローを移す場合はcatchErrorをコメントアウトする
    catchError(error => of('catch_error')),
    mergeMap(someApiResult => {
        // someApiの結果によってsomeApi2の呼出しを分岐する
        if (someApiResult === 'ok') {
            return someApi2(someApiResult);
        }else if(someApiResult === 'catch_error') {
            // なんらかのエラー処理
            console.log('catched');
        }
        // throwErrorとしないことで、正常系として後続処理を行う（後続処理はnullチェックが必要になる）
        return of(null);
    })
).subscribe(
  next => {
      if (next !== null)  {
        // someApi2を呼んだときに行う何らかの処理
        console.log(next)
      }
  },
  error => console.log('error.' + error),
  () =>  console.log('complete.')
);
