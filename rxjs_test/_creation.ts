// RxJS v6+
import { of, from, Observable, throwError } from "rxjs";
import { map, take, mergeMap, catchError } from "rxjs/operators";

// https://www.learnrxjs.io/learn-rxjs/operators/creation/of
// https://rxjs.dev/guide/overview

/****************************/
/* Creation */
/****************************/

namespace _create_ {
  const hello = Observable.create(function (observer) {
    observer.next("Hello");
    observer.next("World");
    observer.complete();
  });

  //output: 'Hello'...'World'
  const subscribe = hello.subscribe((val) => console.log(val));
}

//import { ajax } from "rxjs/ajax";
import { AjaxRequest } from "rxjs/ajax";
import { request } from "universal-rxjs-ajax";

namespace _ajax_ {


/*
    ----
    node_modules/universal-rxjs-ajax/lib/index.d.ts:4:59 
    - error TS2314: Generic type 'AjaxResponse<T>' requires 1 type argument(s).
    
    4 export function request(options: AjaxRequest): Observable<AjaxResponse>
    
    ----
    vi node_modules/universal-rxjs-ajax/lib/index.d.ts
    
    export function request(options: AjaxRequest): Observable<AjaxResponse> 
    export function request(options: AjaxRequest): Observable<AjaxResponse<any>> 
    
*/


  // 'AjaxRequest': method, async, headers, timeout, and 3 more.



  /*
  // https://rxjs.dev/api/ajax/AjaxRequest

  interface AjaxRequest {
     url: string
     body?: any
     method: string
     async: boolean
     headers: Readonly<Record<string, any>>
     timeout: number
     user?: string
     password?: string
     crossDomain: boolean
     withCredentials: boolean
     responseType: XMLHttpRequestResponseType
  }
  */
  
interface Repo {
  name: string
  }
  request({
     url: "https://api.github.com/users?per_page=2",
     method: 'GET',
     async: true,
     headers: {
            'Content-Type':'application/json'
        },
     timeout: 3000,
     crossDomain: false,
     withCredentials: false,
     responseType: 'json'
     })
  .pipe(map(({response}) => response as Repo ,map((repo: Repo) => repo.name)))
  .subscribe(repoNames => console.log(repoNames))
      
}

namespace _from_ {
  const arraySource = from([1, 2, 3, 4, 5]);
  //output: 1,2,3,4,5
  const subscribe = arraySource.subscribe((val) => console.log(val));
}

namespace _of_ {
  const source = of(1, 2, 3, 4, 5);
  //output: 1,2,3,4,5
  const subscribe = source.subscribe((val) => console.log(val));

  const source2 = of({ name: "Brian" }, [1, 2, 3], function hello() {
    return "Hello";
  });
  //output: {name: 'Brian'}, [1,2,3], function hello() { return 'Hello' }
  const subscribe2 = source2.subscribe((val) => console.log(val));
}

import { range } from "rxjs";

namespace _range_ {
  //emit 1-10 in sequence
  const source = range(1, 10);
  //output: 1,2,3,4,5,6,7,8,9,10
  const example = source.subscribe((val) => console.log(val));
}

import { interval } from "rxjs";

namespace _interval_ {
  //  const source = interval(1000);
  //  //output: 0,1,2,3,4,5....
  //  const subscribe = source.subscribe((val) => console.log(val));
  //
  //
  const numbers = interval(1000);

  const takeFourNumbers = numbers.pipe(take(4));

  takeFourNumbers.subscribe((x) => console.log("Next: ", x));
}

import { generate } from "rxjs";

namespace _generate_ {
  const gen = generate(
    2, //initialState
    (x) => x <= 8, //condition
    (x) => x + 3 //iterate
  );
  gen.subscribe(console.log);
  // 2 5 8
}

import { timer } from "rxjs";
import { concatMapTo } from "rxjs/operators";

namespace _timer_ {
  //const source = timer(1000, 2000);
  ////output: 0,1,2,3,4,5......
  //const subscribe = source.subscribe(val => console.log(val));

  const source = of(1, 2, 3);

  const result = timer(3000).pipe(concatMapTo(source)).subscribe(console.log);
}
