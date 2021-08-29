import { concat, interval, range } from "rxjs";
import { take } from "rxjs/operators";

// concat
namespace test1 {
  const timer = interval(1000).pipe(take(4));
  const sequence = range(1, 10);
  const result = concat(timer, sequence);
  result.subscribe((x) => console.log(x));

  // results in:
  // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
}
namespace test2 {
  const timer1 = interval(1000).pipe(take(10));
  const timer2 = interval(2000).pipe(take(6));
  const timer3 = interval(500).pipe(take(10));

  const result = concat(timer1, timer2, timer3);
  result.subscribe((x) => console.log(x));

  // results in the following:
  // (Prints to console sequentially)
  // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
  // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
  // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
}

namespace test3 {
  const timer = interval(1000).pipe(take(2));

  concat(timer, timer) // concatenating the same Observable!
    .subscribe(
      (value) => console.log(value),
      (err) => {},
      () => console.log("...and it is done!")
    );
}
