/**
  Given two coordinates on the infinte board, return the least amount of moves the knight has to make to get to that position
 */

let origin = [0, 0];
let target = [0, 0];
// let target = [7, 4];
//let target = [7, 5];

const movesMap = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];

const twoMovesMap = [
  [-1, 1],
  [-1, -1],
  [1, 1],
  [1, -1],
  [0, 2],
  [0, -2],
  [-2, 0],
  [2, 0],
];

const threeMovesMap = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];

const fourMovesMap = [
  [-2, 2],
  [-2, -2],
  [2, 2],
  [2, -2],
];

const distance = (a, b) => {
  let x = a[0] - b[0];
  let y = a[1] - b[1];
  return Math.sqrt(x * x + y * y);
};

let maxDistance = distance(origin, target);
let currDistance;
let visitedPosition = [];
let lastMoves = [];
let moves = [];

const isOnTarget = (position, target) => {
  if (position[0] === target[0] && position[1] === target[1]) {
    if (lastMoves.length === 0) {
      console.log('First postition');
      console.log('Target:', target);
      console.log('Moves number:', moves.length);
    } else {
      if (lastMoves.length < moves.length) {
        moves = [...lastMoves];
        lastMoves = [];
      }
    }
  }
};

const moveKnight = (position, target) => {
  let newX, newY;
  for (let move of movesMap) {
    let x = position[0] + move[0];
    let y = position[1] + move[1];
    let d = distance([x, y], target);
    if (
      d <= (currDistance = maxDistance) &&
      !visitedPosition.find((e) => {
        return e[0] === x && e[1] === y;
      })
    ) {
      maxDistance = d;
      newX = x;
      newY = y;
    }
  }
  lastMoves.push([newX, newY]);
  visitedPosition.push([newX, newY]);
  knightMoves([newX, newY], target);
};

const knightMoves = (position, target) => {
  isOnTarget(position, target);
  // fourMovesToFinish(position, target);
  // threeMovesToFinish(position, target);
  // twoMovesToFinish(position, target);
  moveKnight(position, target);
};

knightMoves(origin, target);

/*
 
   0  1  2  3  4  5  6  7
0 [S, 0, 0, 0, 0, 0, 0, 0],
1 [0, 0, 0, 0, 0, 0, 0, 0],
2 [0, 1, 0, 0, 0, 0, 0, 0],
3 [0, 0, 0, 0, 0, 0, 0, 0],
4 [0, 0, 2, 0, 0, 0, 0, 0],
5 [0, 0, 0, 0, 0, 4, 0, 0],
6 [0, 0, 0, 3, 0, 0, 0, 0],
7 [0, 0, 0, 0, T, 0, 0, 0],

function distance(x, y) {
  // axes symmetry
  x = Math.abs(x);
  y = Math.abs(y);
  // diagonal symmetry
  if (x < y) {
    t = x;
    x = y;
    y = t;
  }
  // 2 corner cases
  if (x == 1 && y == 0) {
    return 3;
  }
  if (x == 2 && y == 2) {
    return 4;
  }

  // main formula
  var delta = x - y;
  if (y > delta) {
    return delta - 2 * Math.floor((delta - y) / 3);
  } else {
    return delta - 2 * Math.floor((delta - y) / 4);
  }
}

console.log(distance(7, 4));


*/
