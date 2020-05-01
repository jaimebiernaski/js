/***************************************************************
01) What is a potential pitfall with using typeof bar === "object"  to determine if bar is an object? How can this pitfall be avoided? 
***************************************************************/

//The typeof operator returns a string indicating the type of the unevaluated operand.

console.log(typeof 42); // "number"
console.log(typeof 'blubber'); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undeclaredVariable); // "undefined";

//ANSWER:
/**
 * 1) the problem is that in js, null is considered an object
 * If "bar" is null, the typeof bar === "object" return true!
 * to avoid this pitfall, add null condition
 */

console.log(typeof null); // object
console.log(bar !== null && typeof bar === 'object');

// in case bar is array, it return true too
console.log(typeof []); // object

console.log(bar !== null && typeof bar === 'object' && !Array.isArray(bar));

/***************************************************************
02) What will the code below output to the console and why?
***************************************************************/

(function () {
  var a = (b = 3);
})();

console.log('a defined? ' + (typeof a !== 'undefined'));
console.log('b defined? ' + (typeof b !== 'undefined'));

//ANSWER
/**
 * It depends of the strict mode
 * Without STRICT MODE
 * a & b are defined
 * b=3
 * var a=b
 *
 * With STRICT MODE, runtime error: b is undefined
 */

/***************************************************************
03) What will the code below output to the console and why?
***************************************************************/

var myObject = {
  foo: 'bar',
  func: function () {
    var self = this;
    console.log('outer func:  this.foo = ' + this.foo);
    console.log('outer func:  self.foo = ' + self.foo);
    (function () {
      console.log('inner func:  this.foo = ' + this.foo);
      console.log('inner func:  self.foo = ' + self.foo);
    })();
  },
};
myObject.func();

//ANSWER
/**
 * 1 - bar : this refers to the myObject out func
 * 2 - bar : self is a copy of this
 * 3 - undefined : this does not refers to inner func
 * 4 - bar : self if a copy of this, is the same scope
 */

/***************************************************************
04) What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?
***************************************************************/

//ANSWER
/**
 * Creates a common namespace to avoid conficts of modules and libraries
 */

/***************************************************************
05) What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?
***************************************************************/

//ANSWER
/**
 * With the Use Strict, the javascript engine will run the javascript in stric mode, enforcrias a stricer parins and error hanslding, for example using a variable without declaring it. The use of strict mode also benefits code optimation. Sometimes the same code runs faster with the stric mode is on.
 *  - Makes debugging easier.
 *  - Prevents accidental globals. wihtout SM, var wihtout declartaion are declared globally with that name.
 *  - Eliminates this coercion: this.null or this.undefined throws an error.
 *  - Disallows duplicate parameter values: throws an error when it detects a duplicate named argument for a function.
 */

/***************************************************************
06) Consider the two functions below. Will they both return the same thing? Why or why not?
***************************************************************/

function foo1() {
  return {
    bar: 'hello',
  };
}

function foo2() {
  return;
  {
    bar: 'hello';
  }
}

//ANSWER
/**
 * The first return 'Hello', the second on return 'undefined'
 * the syntax for the return on javascript is
 *
 *    return [[expression]];
 *
 * if a expression is ommited, undefined is returned.
 * The "return" statement is affected by the
 *
 * ASI - Automatic semicolon insertions : No line terminator is allowed between the return keyword and the expression.
 * 
 * Automatic semicolon insertion
 * 
 * Some JavaScript statements must be terminated with semicolons and are therefore affected by automatic semicolon insertion (ASI):

- Empty statement
- let, const, variable statement
- import, export, module declaration
- Expression statement
- debugger
- continue, break, throw
- return

 */

/***************************************************************
07) What is NaN? What is its type? How can you reliably test if a value is equal to NaN?
***************************************************************/

//ANSWER
/**
 * NaN - Not-a-Number
 * Its a property of the global object, that represents the
 * value not-a-number
 *
 */
let a = 1;
let b = '2';
let c = 'three';

console.log(a + b); // 12 : concatenate
console.log(a * b); // 2 : multiplies beucase there is a number
console.log(a + c); // 1three
console.log(a * c); // NaN

console.log(isNaN('asdf')); // true
console.log(isNaN(1)); // false

NaN === NaN; // false
Number.NaN === NaN; // false
isNaN(NaN); // true
isNaN(Number.NaN); // true

function valueIsNaN(v) {
  return v !== v;
}
valueIsNaN(1); // false
valueIsNaN(NaN); // true
valueIsNaN(Number.NaN); // true

/***************************************************************
08) What will the code below output? Explain your answer.
***************************************************************/

console.log(0.1 + 0.2);
// returns sum 0.30000000000000004

console.log(0.1 + 0.2 == 0.3);

// returns FALSE to the boolean expression

/**
 * Due the float point precision, the result can not be
 * the expected
 * It can be true or not.
 */

//Number.EPSILON

/**
 * The Number.EPSILON property represents the difference
 * between 1 and the smallest loating point number greater than 1
 */

console.log(0.1 + 0.2 == 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); //true

/***************************************************************
09) Discuss possible ways to write a function isInteger(x) that 
determines if x is an integer.
***************************************************************/

//ANSWER

//Using the isInterger Method
Number.isInteger(1.1); //false

//Bitwise XORing any number x with 0 yields x.
function isInteger(x) {
  return (x ^ 0) === x;
}

//using string interpolation to find a .
`${x}`.split('.').length === 2;

/***************************************************************
10) In what order will the numbers 1-4 be logged to the console
 when the code below is executed? Why?
***************************************************************/

(function x() {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  console.log(4);
})();

//ANSWER
/**
 * The setTimeout() method of the WindowOrWorkerGlobalScope mixin
 * (and successor to Window.setTimeout()) sets a timer which executes a
 * function or specified piece of code once the timer expires.
 */

//1
//4
//3
//2

/**
 * the setTImeout is a scheduling process that has to enter in the queue
 * to be executde in next (tick + time) of the javascript engine,
 *    |> setTimeout(0) call > event queue, asap next timer tick
 *      |> console.log
 *         |> setTimeout executed in the next timer tick
 *
 *  |......|......|......|...... |> timer tick
 *
 * which delays more than the console.log
 */

/***************************************************************
11) Write a simple function (less than 160 characters) that returns 
a boolean indicating whether or not a string is a palindrome
***************************************************************/

/**
 * \W: Matches any character that is not a word character from the basic
 * Latin alphabet.
 */

const pal = (a) => {
  let s = a.replace(/\W/g, '').toLowerCase();
  return s === s.split('').reverse().join('');
};

console.log(pal('A car, a man, a maraca'));

/***************************************************************
12) Write a sum method which will work properly when invoked using
 either syntax below.
***************************************************************/

/**
 * it was called in the form sum(2)(3), so we return an anonymous function
 * that adds together the argument passed to sum() (in this case 2) and
 * the argument passed to the anonymous function (in this case 3).
 */

function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function (y) {
      return x + y;
    };
  }
}

const sum = (x, y) => {
  if (y !== undefined) {
    return x + y;
  } else {
    // y === undefined in the sum func
    // means there is an arg to the anonymous function
    // ( (x)=>{body} )(arg)
    return (arg) => x + arg;
  }
};

console.log(sum(2, 3)); // Outputs 5
console.log(sum(2)(3)); // Outputs 5

/**
 * Immediately Invoked Function Expression
 *
 * formal functions: ( function(x){body} )(arg)
 * arrow function:   ( (x)=>{body} )(y)
 *
 *        |> this is the arg passed to the anonymous function
 * sum(2)(3)
 *
 */

/***************************************************************
13) Consider the following code snippet:
***************************************************************/

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function () {
    console.log(i);
  });
  document.body.appendChild(btn);
}

/**
 * (a) What gets logged to the console when the user clicks on
 * “Button 4” and why?
 *
 * No matter what button the user clicks the number 5 will always be
 * logged to the console. This is because, at the point that the onclick
 * method is invoked (for any of the buttons), the for loop has already
 * completed and the variable i already has a value of 5.
 *
 * (b) Provide one or more alternate implementations that will
 * work as expected.
 */

for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  (function (i) {
    btn.addEventListener('click', function () {
      console.log(i);
    });
  })(i);
  document.body.appendChild(btn);
}
//Lastly, the simplest solution, if you’re in an ES6/ES2015 context,
//is to use let i instead of var i:

for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function () {
    console.log(i);
  });
  document.body.appendChild(btn);
}

/***************************************************************
14) Assuming d is an “empty” object in scope, say:
***************************************************************/
var d = {};
/**
 * …what is accomplished using the following code?
 */

['zebra', 'horse'].forEach((k) => {
  d[k] = undefined;
});

/**
 * The array elements becomes  properties of the object d
 * with value undefined
 * useful to ensure an object will have the a set of keys.
 * Object.keys(d) = ['zebra','horse']
 */

/***************************************************************
15) What will the code below output to the console and why?
***************************************************************/

var arr1 = 'john'.split('');
// ['j','o','h','n']
var arr2 = arr1.reverse();
// ['n','h','o','j'] the array 1, and create a reference as array 2
// Changes on array 2 will will reflect on array 1

var arr3 = 'jones'.split('');
// ['j','o','n','e','s']
arr2.push(arr3); //['n','h','o','j',['j','o','n','e','s']]

console.log('array 1: length=' + arr1.length + ' last=' + arr1.slice(-1));
console.log('array 2: length=' + arr2.length + ' last=' + arr2.slice(-1));
//"array 1: length=5 last=j,o,n,e,s"
//"array 2: length=5 last=j,o,n,e,s"
//The array are the same due the reference.

/***************************************************************
16) What will the code below output to the console and why ?
***************************************************************/

console.log(1 + '2' + '2'); // 122 concatenating string
console.log(1 + +'2' + '2'); // 32
// (the extra + before the first "2" is treated as a unary operator)
// JavaScript converts the type of "2" to numeric and then applies the
// unary + sign to it
// 1+2 = 3 = '2' = 32
console.log(1 + -'1' + '2'); // 02
// the - before one, is treated as unary operator. JS converser the
// type of 1 to numeric, and then applies the unary signal to it
// 1 + -"1" > 1 + -1 > 0 and then concatenate with 2 02
console.log(+'1' + '1' + '2'); //122
//+1 is typecast to number, but then, and then converted back to string to
// concatenated with the string 1 and 2
console.log('A' - 'B' + '2'); //NaN2
// Neither A and B can not be converted to number
// Not-a-Number opetarion concat with2
console.log('A' - 'B' + 2); //NaN operation with numbers and no numbers

/***************************************************************
17) The following recursive code will cause a stack overflow if the 
array list is too large. How can you fix this and still retain the recursive pattern?
***************************************************************/
var list = readHugeList();

var nextListItem = function () {
  var item = list.pop();

  if (item) {
    // process the list item...
    nextListItem();
  }
};

//Modification

var list = readHugeList();

var nextListItem = function () {
  var item = list.pop();

  if (item) {
    // process the list item...
    setTimeout(nextListItem(), 0); // <<<<<< Add set Timeout
  }
};
/**
 * using the setTimeout, the next executions of nextListItem is queue
 * to the event looper. With this, the event looper will handle the
 * recursion, not the call stack.  Accordingly, the method is processed
 * from start to finish without a direct recursive call, so the call stack
 * remains clear, regardless of the number of iterations.
 *
 * |--- NEXTLISTITEM MEMORY ---|
 * |xxxxxxxxxxxxxxxxxxxxxxxxxxx|
 * |xxxxxxxx-------------------|
 * |---------------------------| << call stack
 * |---  EVENT LOOP MEMORY  ---|
 * |-------- process 1 --------|
 * |-------- process 2 --------|
 * |----- new nextListItem ----| << setTimeout, separated process
 * |---------------------------|
 */

/***************************************************************
18) What is a “closure” in JavaScript? Provide an example.
***************************************************************/

/**
 * a closure gives you access to an outer function’s scope from
 * an inner function. In JavaScript, closures are created every time
 * a function is created, at function creation time.
 *
 * A closure is an inner function that has access to the variables
 * in the outer (enclosing) function’s scope chain.
 */

/***************************************************************
19) What will be the output of the following code:
***************************************************************/

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
/**
 * Explain your answer. How could the use of closures help here?
 */

/**
 * Print i =
 * 5 after 1 sec
 * 5 after 2 sec
 * 5 after 3 sec
 * 5 after 4 sec
 * 5 after 5 sec
 * Bacause the loop will finish before the timeout.
 */

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}

/**
 * DIFERENCE OF LET & VAR
 *
 * Main difference is scoping rules
 *  - var is function scoped
 *  - let is block { } scoped
 *
 * Variables declared by var keyword are scoped to the immediate
 * function body (hence the function scope) while let variables are
 * scoped to the immediate enclosing block denoted by { }
 * (hence the block scope).
 *
 *  - let can also be used to avoid problems with closures.
 * It binds fresh value rather than keeping an old reference.
 *
 * While variables declared with var keyword are hoisted (initialized
 * with undefined before the code is run) which means they are accessible
 * in their enclosing scope even before they are declared.
 *
 * let variables are not initialized until their definition is evaluated.
 * Accessing them before the initialization results in a ReferenceError.
 * Variable said to be in "temporal dead zone" from the start of the block
 * until the initialization is processed.
 */

function run() {
  var foo = 'Foo';
  let bar = 'Bar';

  console.log(foo, bar);

  {
    let baz = 'Bazz';
    console.log(baz);
    console.log(foo, bar);
  }

  console.log(baz); // ReferenceError
}

run();

/***************************************************************
20) What would the following lines of code output to the console?
***************************************************************/

console.log('0 || 1 = ' + (0 || 1));
//1
console.log('1 || 2 = ' + (1 || 2));
//1
console.log('0 && 1 = ' + (0 && 1));
//0
console.log('1 && 2 = ' + (1 && 2));
//2
console.log('2 && 1 = ' + (1 && 2));

/**
 * In JavaScript, both || and && are logical operators that return the first
 * fully-determined “logical value” when evaluated from left to right.
 * Javascript considers 0 as false.
 * this explains the 0 || 1 and 0 && 1
 *
 * In the OR operation, for two truthy values, the first true resolves.
 * In the AND operation, its necessary validate until the last element
 * to check it the condition is true or false. When True, it return the
 * last element
 */

/***************************************************************
21) What will be the output when the following code is executed? Explain.
***************************************************************/

// ABASTRACT comparison
console.log(false == '0'); //true
// The more commonly-used abstract comparison (e.g. ==) converts the
// operands to the same type before making the comparison.

// STRICT comparison
console.log(false === '0'); //false
// console.log(false === '0');
// A strict comparison (e.g., ===) is only true if the operands are of
// the same type and the contents match

/***************************************************************
22) What is the output out of the following code? Explain your answer.
***************************************************************/
var a = {},
  b = { key: 'b' },
  c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);

//The output of this code will be 456 (not 123).

//When setting a object property, js strinfy paramenter valeu
//   |> a object
//     |> will set b as property! But b is an object
//        so String(b) = "[object Object]" <| this is the key of a{}
/**/ a[b] = 123;
//   |> a object
//     |> will set c as property as above. c is also and object
//        it is stringfied to the same key "[object Object]"
/**/ a[c] = 456;

// After Strinfy b = c = "[object Object]"

/**

The output of this code will be 456 (not 123).

The reason for this is as follows: When setting an object property, 
JavaScript will implicitly stringify the parameter value. In this case,
since b and c are both objects, they will both be converted to 
"[object Object]". As a result, a[b] and a[c] are both equivalent to 
a["[object Object]"] and can be used interchangeably. 
Therefore, setting or referencing a[c] is precisely the same as setting 
or referencing a[b].

*/

/***************************************************************
23) What will the following code output to the console:
***************************************************************/

console.log(
  (function f(n) {
    return n > 1 ? n * f(n - 1) : n;
  })(10)
);

/**
 * This is a classical recursive fatorial problem
 * 10! = 9 x 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1
 * F(n) = F(n) x F(n-1) x F(n-2) x .. x 1
 * Each recursive step the function receice a descrised n
 * The recursivite stop is when n === 1
 * From that moment, it returs with the result
 * F(1) = 1
 * F(2) = 2 * (F(1) = 1)
 * F(3) = 3 * F(2)
 * ...
 * F(10) = 10.F(9)
 */

/***************************************************************
24) Consider the code snippet below. What will the console output be and why?
***************************************************************/

(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);

/**
 * The output will be 1, even though the value of x is never set in the
 * inner function. Here’s why:
 *
 * As explained in our JavaScript Hiring Guide, a closure is a function,
 * along with all variables or functions that were in-scope at the time
 * that the closure was created.
 *
 * In JavaScript, a closure is implemented
 * as an “inner function”; i.e., a function defined within the body of
 * another function. An important feature of closures is that an inner
 * function still has access to the outer function’s variables.
 * Therefore, in this example, since x is not defined in the inner
 * function, the scope of the outer function is searched for a defined
 * variable x, which is found to have a value of 1.
 */

/***************************************************************
25) What will the following code output to the console and why:
***************************************************************/

var hero = {
  _name: 'John Doe',
  getSecretIdentity: function () {
    return this._name;
  },
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
//print undefined. This refers to the hero object
// and here its being invoked in the global context
// (i.e., the window object)
//where the _name property does not exist.

console.log(hero.getSecretIdentity());
//It will print the hero nome

/**
 * What is the issue with this code and how can it be fixed.
 */

var hero = {
  _name: 'John Doe',
  getSecretIdentity: function () {
    return this._name;
  },
};

var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
/**
 * The bind() method creates a new function that, when called,
 * has its this keyword set to the provided value, with a given
 * sequence of arguments preceding any provided when the new function
 * is called.
 */

/***************************************************************
26) Create a function that, given a DOM Element on the page, 
will visit the element itself and all of its descendents 
(not just its immediate children). For each element visited, 
the function should pass that element to a provided callback function.

The arguments to the function should be:

a DOM element
a callback function (that takes a DOM element as its argument)
***************************************************************/

// Visiting all elements in a tree (DOM) is a classic Depth-First-Search
// algorithm application. Here’s an example solution:

function Traverse(p_element, p_callback) {
  p_callback(p_element);
  var list = p_element.children;
  for (var i = 0; i < list.length; i++) {
    Traverse(list[i], p_callback); // recursive call
  }
}

/***************************************************************
27) Testing your this knowledge in JavaScript: 
What is the output of the following code?
***************************************************************/

var length = 10; // window level

//Scope window
function fn() {
  console.log(this.length); // this === window
}

var obj = {
  length: 5,
  //method bound to obj
  // <| obj.method Accepts just 1 parameter
  method: function (fn) {
    fn(); //executes the global fn with length = 10
    // Hence arguments[0]() is nothing but calling fn().
    // Inside fn now, the scope of this function becomes
    // the arguments array, and logging the length of arguments[]
    // will return 2.
    arguments[0]();
  },
};

// <| obj.method called with 2 parameters, the global fn and 1
obj.method(fn, 1);

/**
 * Output
 * 10
 * 2
 */

/***************************************************************
28) Consider the following code. What will the output be, and why?
***************************************************************/

(function () {
  try {
    throw new Error();
  } catch (x /* inner */) {
    var x = 1, // inner x, not the outer one
      y = 2; // there is only one y, which is in the outer scope
    console.log(x); // 1
  }
  console.log(x); // undefined : var statements are hoisted
  console.log(y); // 2
})();

/**
 * var statements are hoisted (without their value initialization)
 * to the top of the global or function scope it belongs to, even when
 * it’s inside a with or catch block.
 */

/***************************************************************
29) What will be the output of this code?
***************************************************************/
var x = 21;

var girl = function () {
  // <| the functions checks there is a x inside
  console.log(x); //because this, it does not look for the global x
  var x = 20;
};
girl();

/**
 * Neither 21, nor 20, the result is undefined

It’s because JavaScript initialization is not hoisted.

(Why doesn’t it show the global value of 21? The reason is that when 
the function is executed, it checks that there’s a local x variable 
present but doesn’t yet declare it, so it won’t look for global one.)
 
 */

/***************************************************************
30) How do you clone an object?
***************************************************************/

let clone = { ...object }; // for simples objects
let clone = JSON.parse(JSON.stringify(object)); // deep copy

/***************************************************************
31) What will this code print?
***************************************************************/

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
/**
 * let is block scoped. If used fazer, the value would be 5
 * 0 > after 1 sec
 * 1 > after 2 sec
 * 3 > after 3 sec
 * 4 > after 4 sec
 */

/***************************************************************
32) WWhat do the following lines output, and why?
***************************************************************/
console.log(1 < 2 < 3); //true
console.log(3 > 2 > 1); //false

/**
 * The second returns false because of how the engine works regarding
 * operator associativity for < and >.
 * It compares left to right, so 3 > 2 > 1 JavaScript translates
 * to true > 1. true has value 1, so it then compares 1 > 1, which
 * is false.
 */
//            |> this is true, and true in js is 1
//            1 > 1 is false
console.log(3 > 2 > 1); //false

/***************************************************************
33) How do you add an element at the begining of an array? 
How do you add one at the end?
***************************************************************/
array = [newElement, ...array];
array = [...array, newElement];

var myArray = ['a', 'b', 'c', 'd'];
myArray.push('end');
myArray.unshift('start');
console.log(myArray); // ["start", "a", "b", "c", "d", "end"]
myArray = ['start', ...myArray, 'end'];

/***************************************************************
34)Imagine you have this code:
***************************************************************/
var a = [1, 2, 3];
//a) Will this result in a crash?
a[10] = 99;
//No, it ad 99 in the postion 10, and empty position between

//b) What will this output?
console.log(a[6]); //undefined

/***************************************************************
35) What is the value of typeof undefined == typeof NULL?
***************************************************************/
true;
//The valu is true because the typeof null is undefined

/***************************************************************
36) What would following code return?
***************************************************************/
console.log(typeof typeof 1);
string;

//typeof 1 is 'number', and typeof 'number' is string

/***************************************************************
37) What will the following code output and why?
***************************************************************/
var b = 1;
function outer() {
  var b = 2;
  function inner() {
    b++;
    var b = 3; //Local > Global
    console.log(b); //3 because the closure
  }
  inner();
}
outer();

/**
 * When a variable is invoked closures will be checked in order
 * from local to global until an instance is found. Since the inner
 * closure has a b variable of its own, that is what will be output.
 */
