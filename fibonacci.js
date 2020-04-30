/**
 * Fibonacci
 * f(n)=f(n-1)+f{n-2}
 *
 * How to use
 * $ node fibonacci.js <integer>
 */

let n = process.argv[process.argv.length - 1];

const fibonacci = (n) => (n < 3 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));

console.log(`Fibonacci (${n}) =`, fibonacci(n));
