/**
 * Minefield
 *
 * Given a minefield, return the number of mines nearby position
 *
 *  0 0 0 0 0
 *  0 1 0 0 0
 *  0 0 x 0 0
 *  0 1 1 0 0
 *  0 0 0 0 0
 *
 *  mf[2,2] = 3
 *  mf[1,1] = "You died"
 *
 * * How to use
 * $ node minefield [3,3]
 *
 */

let [arg1, arg2, ...args] = process.argv;
let [x, y] = args.map((arg) => parseInt(arg));

const mf = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

const nearby = [
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
];

if (mf[x][y] !== 0) {
  console.log('You Died!');
} else {
  let posX,
    posY,
    nearbyMines = 0;

  for (let pos of nearby) {
    posX = pos[0] + x;
    posY = pos[1] + y;
    mf[posX] && mf[posX][posY] ? (nearbyMines += mf[posX][posY]) : null;
  }
  console.log(`There is ${nearbyMines} mines arould you`);
}
