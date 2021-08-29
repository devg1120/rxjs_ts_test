// RxJS v6+
import { of, from, Observable, throwError } from "rxjs";
import { map, take, mergeMap, catchError } from "rxjs/operators";

//import { ajax } from "rxjs/ajax";
import { request } from "universal-rxjs-ajax";

// https://www.learnrxjs.io/learn-rxjs/operators/creation/of
// https://rxjs.dev/guide/overview

/**************************************************/
/* universal-rxjs-ajax  for  node ajax */
/**************************************************/


/*
  ----
  node_modules/universal-rxjs-ajax/lib/index.d.ts:4:59 - error TS2314: 
  Generic type 'AjaxResponse<T>' requires 1 type argument(s).
  
  4 export function request(options: AjaxRequest): Observable<AjaxResponse>
  
  ----

  vi node_modules/universal-rxjs-ajax/lib/index.d.ts

  export function request(options: AjaxRequest): Observable<AjaxResponse> 

   ↓

  export function request(options: AjaxRequest): Observable<AjaxResponse<any>> 


*/

namespace _ajax_ {

  //const githubUsers = `https://api.github.com/users?per_page=2`;

  //const users = ajax.getJSON(githubUsers);
  //const subscribe = users.subscribe(
  //  (res) => console.log(res),
  //  (err) => console.error(err)
  //);

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
    name: string;
  }

  request({
    url: "https://api.github.com/users?per_page=2",
    method: "GET",
    async: true,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 3000,
    crossDomain: false,
    withCredentials: false,
    responseType: "json",
  })
    .pipe(
      map(
        ({ response }) => response as Repo,
        map((repo: Repo) => repo.name)
      )
    )
    .subscribe((repoNames) => console.log(repoNames));
}

namespace _ajax_2 {

  //const githubUsers = `https://api.github.com/users?per_page=2`;

  //const users = ajax.getJSON(githubUsers);
  //const subscribe = users.subscribe(
  //  (res) => console.log(res),
  //  (err) => console.error(err)
  //);



  const users = request({
    url: "https://api.github.com/users?per_page=3",
    method: "GET",
    async: true,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 3000,
    crossDomain: false,
    withCredentials: false,
    responseType: "json",
    });

  const subscribe = users.subscribe(
    (res) => {
                 console.log("res------------");
                 console.log(res);
             },
    (err) => console.error(err)
  );
}
