import { interval, of, range, from, Subject, Observable } from "rxjs"
import { map, scan, filter } from 'rxjs/operators'
import { concatMap, mergeMap, switchMap  } from 'rxjs/operators'
import { zipWith } from 'rxjs/operators'


//Observable：イベントや値を RxJS で受け取れる形にする
//Operators：受け取ったイベントや値を加工する
//Subject：Observable を同時にいろんなところで受け取れるようにする（マルチキャストを可能にする）
//Subscription：subscribe の解除を行う


// ヘルパ関数
function pt(x: any) {
  console.log(`${typeof(x)} ${x.constructor.name}`);
  }

namespace n1 {
/* Observable インスタンスを直接作成 */

const observable :Observable<number> = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
})

console.log(pt(observable));
observable.subscribe((x) => console.log(x));

}





namespace n2 {

/* from で値を渡して Observable を作成 */

const observable = from([1, 2, 3])
observable.subscribe((v) => console.log(v))

}


namespace n3 {

/* of で可変長引数に値を渡して Observable を作成 */
/* of を使うと、可変長の引数を渡して Observable を作ることができます。*/

const observable = of(1, 2, 3)
observable.subscribe((v) => console.log(v))


}

namespace n4 {

/* Operators：受け取ったイベントや値を加工する */
/* Observable に pipe メソッドで処理を追加してコレクション化 */


console.log("pipe -------------------------------");
const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9)
observable.pipe(
                     filter(x => x%2 === 0)

           )
          .subscribe((v) => console.log(v))
}

namespace n5 {

/* Subject：Observable を同時にいろんなところで受け取れるようにする（マルチキャストを可能にする  */

console.log("subject -------------------------------");
const subject = new Subject<number>()

  subject.subscribe((v) => console.log(`observerA: ${v}`))
  subject.subscribe((v) => console.log(`observerB: ${v}`))

  const observable = from([1, 2, 3])
  observable.subscribe(subject)


  //Subject は Observable 自体としても使える

  const subject2 = new Subject<number>()

    subject2.subscribe((v) => console.log(`observerA: ${v}`))
    subject2.subscribe((v) => console.log(`observerB: ${v}`))

    subject2.next(1)
    subject2.next(2)
    subject2.next(3)

  //subscribe メソッドの引数は本来は next、error、complete メソッドを持つ

  const observable2 = from([1, 2, 3])

  observable2.subscribe({
    next: (x) => console.log("got value " + x),
    error: (err) => console.error("something wrong occurred: " + err),
    complete: () => console.log("done"),
  })

  //Subscription は subscribe メソッドの戻り値

  const observable3 = interval(1000)
  const subscription = observable3.subscribe((x) => console.log(x))

  setTimeout(() => {
    subscription.unsubscribe()
    }, 5000)

}


// Map


/* concatMap, mergeMap, switchMapの違い */

console.log("mergeMap--------------------------")

namespace n6 {

  of(5)
  .pipe(
    mergeMap(value => {
      return range(1, value)
        .pipe(
          zipWith(interval(500))
        )
    }),
    map(values => values[0])
  )
  .subscribe(value => {
    console.log(value)
  })

}
