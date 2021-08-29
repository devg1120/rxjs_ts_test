import { Observable } from "rxjs";

namespace test1 {
  const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log("just before subscribe");
  observable.subscribe({
    next(x) {
      console.log("got value " + x);
    },
    error(err) {
      console.error("something wrong occurred: " + err);
    },
    complete() {
      console.log("done");
    },
  });
  console.log("just after subscribe");
}

namespace test2 {
  function foo() {
    console.log("Hello");
    return 42;
  }

  const x = foo(); // same as foo()
  console.log(x);
  const y = foo(); // same as foo()
  console.log(y);
}

namespace test3 {
  const foo = new Observable((subscriber) => {
    console.log("Hello");
    subscriber.next(42);
  });

  foo.subscribe((x) => {
    console.log(x);
  });
  foo.subscribe((y) => {
    console.log(y);
  });
}

import { of } from "rxjs";
import { map } from "rxjs/operators";
import { first } from "rxjs/operators";

namespace test4 {
  of(1, 2, 3)
    .pipe(map((x) => x * x))
    .subscribe((v) => console.log(`value: ${v}`));
  // Logs:
  // value: 1
  // value: 4
  // value: 9

  of(1, 2, 3)
    .pipe(first())
    .subscribe((v) => console.log(`value: ${v}`));
  // Logs:
  // value: 1
}
