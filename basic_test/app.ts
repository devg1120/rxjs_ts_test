
/* 
   宣言空間
     TypeScriptには、変数宣言空間と型宣言空間という2つの宣言空間があります。
     これらの概念については以下で解説します。
*/

class Foo {};
interface Bar {};
type Bas = {};

var foo: Foo;
var bar: Bar;
var bas: Bas;

var someVar1 = Foo;       // ok
//var someVar2 = Bar;       // err
//var someVar3 = Bas;       // err
var someOtherVar = 123;  // ok


/*
  ファイルモジュール
  export 
  import
*/

// cat ./foo.ts
//  export var foo2 = 123;
//  export var bar2 = 999;
//

import { foo2, bar2 } from "./foo";
var tmp = foo2; //ok
console.log(tmp);     // 123
console.log(bar2);    // 999

/*
  プリミティブ型(Primitive Types)
   string、number、 boolean
*/
var num: number;
var str: string;
var bool: boolean;

num = 123;
num = 123.456;
//num = '123'; // Error

str = '123';
//str = 123; // Error

bool = true;
bool = false;
//bool = 'false'; // Error

/*
  配列(Arrays)
*/
var boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]);     // true
console.log(boolArray.length); // 2
boolArray[1] = true;
boolArray = [false, false];

//boolArray[0] = 'false'; // Error!
//boolArray = 'false'; // Error!
//boolArray = [true, 'false']; // Error!

/*
  インターフェース(Interfaces)
*/
interface Name {
    first: string;
    second: string;
}

var name: Name;
name = {
    first: 'John',
    second: 'Doe'
};

//name = {           // Error : `second` is missing
//    first: 'John'
//};
//name = {           // Error : `second` is the wrong type
//    first: 'John',
//    second: 1337
//    };

/*
  特殊な型
  any、null、undefined、void
*/

// any
var power: any;

// Takes any and all types
power = '123';
power = 123;

// Is compatible with all types
var num: number;
power = num;
num = power;

// nullとundefined
var num: number;
var str: string;

// These literals can be assigned to anything
num = null;
str = undefined;

// :void
function log(message): void {
    console.log(message);
}

/*
  ジェネリックス(Generics)
*/
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // [3,2,1]

// Safety!
//reversed[0] = '1';     // Error!
//reversed = ['1', '2']; // Error!

reversed[0] = 1;       // Okay
reversed = [1, 2];     // Okay

var strArr = ['1', '2'];
var reversedStrs = reverse(strArr);
console.log(reversedStrs); // [ '2', '1' ]

//JavaScript配列には既に.reverse関数があり、
//TypeScriptはジェネリックを使ってその構造を定義しています：
var numArr = [1, 2];
var reversedNums = numArr.reverse();
console.log(reversedNums); // [ 2, 1 ]

/*
  ユニオン型(Union Type)
    string[] | string
*/
function formatCommandline(command: string[]|string): string {
    var line = '';
    if (typeof command === 'string') {
        line = command.trim();
    } else {
        line = command.join(' ').trim();
    }
    return line;
 }

 console.log(formatCommandline("  aaabbb  "));  // aaabbb
 console.log(formatCommandline(["  aaabbb  ", " XXX ZZZ YYY"]));  // aaabbb    XXX ZZZ YYY


/*
   交差型(Intersection Type)
*/
function extend<T, U>(first: T, second: U): T & U {
  return { ...first, ...second };
}

const x = extend({ a: "hello" }, { b: 42 });

console.log(x);  // { a: 'hello', b: 42 }
// x now has both `a` and `b`
const a = x.a;
const b = x.b;

/*
  タプル型
*/
namespace tuple {
var nameNumber: [string, number];

// Okay
nameNumber = ['Jenny', 8675309];

// Error!
//nameNumber = ['Jenny', '867-5309'];

var [name, num] = nameNumber;

console.log(name, num); // Jenny 8675309
}

/*
  型エイリアス(Type Alias)
*/
namespace typealias {
type StrOrNum = string|number;

// Usage: just like any other notation
var sample: StrOrNum;
sample = 123;
sample = '123';

// Just checking
//sample = true; // Error!


type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
}
