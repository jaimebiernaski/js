/**
 * Factorial
 * n! = n x (n-1) x (n-2) x ... x 3 x 2 x 1
 *
 * How to use
 * $ node factorial.js <integer>
 */

let n = process.argv[process.argv.length - 1];

const factorial = (n) => (n < 2 ? 1 : n * factorial(n - 1));

console.log(`Factorial (${n}) =`, factorial(n));
