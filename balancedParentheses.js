/**
 * Balanced parentheses
 * balanced: ()(), (())
 * unlanced: )(, (()
 *
 * How to use
 * $ node balancedParentheses <string>
 */

let arg = process.argv[process.argv.length - 1];

balancedParentheses = (arg) =>
  arg.split('').reduce((acc, cur) => {
    return cur === '(' && acc >= 0 ? ++acc : --acc;
  }, 0);

console.log(
  `The string "${arg}" is`,
  balancedParentheses(arg) === 0 ? 'balanced' : 'unbalanced!'
);
