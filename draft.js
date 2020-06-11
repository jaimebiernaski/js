// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
var A = [2];

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let tmp = 1;
  let array = A.sort((a, b) => a - b);
  if (array[array.length - 1] > 0) {
    tmp = array[0] + 1;

    array.forEach((el, index) => {
      if (array.find((e) => e === tmp)) {
        tmp = el + 1;
      }
    });
  }
  return tmp;
}

console.log(solution(A));
