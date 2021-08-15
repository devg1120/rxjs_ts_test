/*
  アンビエント宣言(declare)

  アンビエント型宣言(declare) を使用すると、既存の一般的なJavaScriptライブラリを
  安全に使用したり、JavaScript/CoffeeScript/など、他のJavaScriptにコンパイルされる
  プロジェクトを TypeScript に段階的に移行することができます。
  declareキーワードを使用して他の場所に存在するコードを記述しようとしていることを
  TypeScriptに伝えることができます
*/
namespace declare1 {
//  foo = 123; // Cannot find name 'foo'.
}

namespace declare2 {
  declare var foo: any;
  foo = 123; // allowed
  console.log(foo);
}

/*
  インターフェース(Interfaces)
*/
interface Point {
    x: number; y: number;
    }
declare var myPoint: Point;


interface Point {     // 宣言を拡張
    z: number;
    }

var myPoint = {x:1, y:2, z:3};
console.log(myPoint); // { x: 1, y: 2, z: 3 }


/*
  クラスはインターフェースを実装できる
*/
namespace classImplements {
interface Point {
    x: number; y: number;
}

class MyPoint implements Point {
        x: number; y: number; // Same as Point
}

var foo: Point = new MyPoint();
foo.x = 88;
foo.y = 33;
console.log(foo);  // MyPoint { x: 88, y: 33 }
}

/*
  列挙型(Enums)
*/
enum Color {
    Red,
    Green,
    Blue
   }
var col = Color.Red;
console.log(typeof(col));   // number
console.log(col);           // 0

enum Color2 {
    DarkRed = 3,  // 3
    DarkGreen,    // 4
    DarkBlue      // 5
}
var col2 = Color2.DarkRed;
console.log(typeof(col2));   // number
console.log(col2);           // 3


/*
  フラグとしての数値列挙型(Number Enums as flags)
  */

enum AnimalFlags {
      None           = 0,
      HasClaws       = 1 << 0,
      CanFly         = 1 << 1,
      EatsFish       = 1 << 2,
      Endangered     = 1 << 3
}

type Animal = {
    flags: AnimalFlags
}

/*
|=を使ってフラグを追加する
&=と~の組み合わせを使ってフラグをクリアする
|を使ってフラグを組み合わせる
*/

function printAnimalAbilities(animal: Animal) {
    var animalFlags = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly');
    }
    if (animalFlags == AnimalFlags.None) {
        console.log('nothing');
    }
}

let animal: Animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly

/*
  文字列列挙型(String Enums)
*/
namespace syringEnums {
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}

const value =  EvidenceTypeEnum.PASSPORT;

if (value === EvidenceTypeEnum.PASSPORT){
    console.log('You provided a passport');
    console.log(value); // `passport`
}
}

/*
  静的関数を持つ列挙型(Enum with static functions)
*/
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
namespace Weekday {
    export function isBusinessDay(day: Weekday) {
        switch (day) {
            case Weekday.Saturday:
            case Weekday.Sunday:
                return false;
            default:
                return true;
        }
    }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false

/*
   関数の型
*/

namespace functionType {
// variable annotation
var sampleVariable: { bar: number }

// function parameter annotation
function foo1(sampleParameter: { bar: number }) { }

interface Foo {
    foo: string;
}

// Return type annotated as `: Foo`
function foo2(sample: Foo): Foo {
    return sample;
}

// Option paramator
function foo3(bar: number, bas?: string): void {
    // ..
}

foo3(123);
foo3(123, 'hello');

// Default paramater value
function foo4(bar: number, bas: string = 'hello') {
    console.log(bar, bas);
}

foo4(123);           // 123, hello
foo4(123, 'world');  // 123, world


type LongHand = {
    (a: number): number;
};

type ShortHand = (a: number) => number;
}

/*
  呼び出し可能オブジェクト
*/

interface Overloaded {
    (foo: string): string
    (foo: number): number
}

// example implementation
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello ${foo}`;
    }
}

const overloaded: Overloaded = stringOrNumber;

// example usage
const str = overloaded('gusa'); // type of `str` is inferred as `string`
console.log(str);
const num = overloaded(123); // type of `num` is inferred as `number`
console.log(num);

/*
  アロー構文
*/

namespace arrow {
const simple: (foo: number) => string
    = (foo) => foo.toString();

console.log(typeof(simple(1234)));
console.log(simple(1234));
}

/*
  Type Assertion（型アサーション）

*/
namespace typeAssertion {
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';

var goo :Foo = {bar: 123, bas: 'hello'};


function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
//logName(random); // Error: property `name` is missing


}

/*
  型ガード
*/

// typeof

function doSomething(x: number | string) {
    if (typeof x === 'string') { 
        console.log(x.substr(1)); // OK
    }
}


doSomething("AHQ");

// instanceof

class Foo {
    foo = 123;
    common = '123';
}

class Bar {
    bar = 123;
    common = '123';
}

function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // OK
        //console.log(arg.bar); // Error!
    }
    if (arg instanceof Bar) {
        //console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }

    console.log(arg.common); // OK
    //console.log(arg.foo); // Error!
    //console.log(arg.bar); // Error!
}

doStuff(new Foo());
doStuff(new Bar());

/*
  イテレータ
*/

class Component {
  constructor (public name: string) {}
  }

class Frame implements IterableIterator<Component> {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }

  [Symbol.iterator](): IterableIterator<Component> {
    return this;
  }

  }

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
for (let cmp of frame) {
  console.log(cmp);
  }


/*
  Promise
  Promiseの結果は、.then(resolveが実行された場合)または.
                    catch(rejectが実行された場合)を使用して監視(Subscribe)できます。

*/

namespace promise_basic {
const promise1 = new Promise((resolve, reject) => {
    resolve(123);
});
promise1.then((res) => {
    console.log('I get called:', res === 123); // I get called: true
});
promise1.catch((err) => {
    // これは呼び出されません
    });

/*
const promise2 = new Promise((resolve, reject) => {
    reject(new Error("何かひどいことが起きた"));
});
promise2.then((res) => {
    // これは呼び出されません
});
promise2.catch((err) => {
    console.log('I get called:', err.message); // I get called: '何かひどいことが起きた'
    });
*/

}


// Promiseのチェーン
async function sample1() {

return await Promise.resolve(123)
    .then((res) => {
        console.log(res); // 123
        return 456;
    })
    .then((res) => {
        console.log(res); // 456
        return Promise.resolve(123); // resolveされたPromiseを返しています
    })
    .then((res) => {
        console.log(res); // 123 : resolveされた値で`then`が呼び出されます
        return 123;
    })
}

async function sample2() {

return await Promise.reject(new Error('何か悪いことが起きた'))
    .then((res) => {
        console.log(res); // 呼び出されない
        return 456;
    })
    .then((res) => {
        console.log(res); // 呼び出されない
        return 123;
    })
    .then((res) => {
        console.log(res); // 呼び出されない
        return 123;
    })
    .catch((err) => {
        console.log(err.message); // 何か悪いことが起きた
    });

 }

sample1();
sample2();

/*
  ジェネレータ
*/

function* infiniteSequence() {
    var i = 0;
    while( i < 9) {
        yield i++;
    }
}

var iterator = infiniteSequence();
while (true) {
//console.log(iterator.next()); // { value: xxxx, done: false } forever and ever
      let result = iterator.next();
      if (result.done) {
         break;
         }
      console.log(result);
    }


// ジェネレータ関数の外部制御

namespace genaratorctl {
function* generator(){
    console.log('Execution started');
    yield 0;
    console.log('Execution resumed');
    yield 1;
    console.log('Execution resumed');
}

var iterator = generator();
console.log('Starting iteration'); // これはジェネレータ関数の本体の前に実行されます
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: undefined, done: true }]
}
