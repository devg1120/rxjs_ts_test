import { of, zip, interval, merge } from "rxjs";
import { map, publish, publishLast, take, tap } from "rxjs/operators";
 

namespace test1 {
const source$ = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
  map(values => values[1])
);
 
source$
  .pipe(
    publish(multicasted$ =>
      merge(
        multicasted$.pipe(tap(x => console.log('Stream 1:', x))),
        multicasted$.pipe(tap(x => console.log('Stream 2:', x))),
        multicasted$.pipe(tap(x => console.log('Stream 3:', x))),
      )
    )
  )
  .subscribe();
 
// Results every two seconds
// Stream 1: 1
// Stream 2: 1
// Stream 3: 1
// ...
// Stream 1: 9
// Stream 2: 9
// Stream 3: 9
}

