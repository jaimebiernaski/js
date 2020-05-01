/**
 *  Palindrome
 *
 * "level"                   // logs 'true'
 * "levels"                  // logs 'false'
 * "A car, a man, a maraca"  // logs 'true'
 */

let arg = process.argv[process.argv.length - 1];

const isPalindrome = (arg) => {
  let str = arg.replace(/\W/g, '');
  return str === str.split('').reverse().join('');
};

console.log(`Is a palindrome (${arg}) ?`, isPalindrome(arg));
