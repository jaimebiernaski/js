function* gen() {
  for (let i = 0; i < 5; i++) yield i;
}

const myGen = gen();

// console.log('>', myGen.next().value);
// console.log('>', myGen.next().value);
// console.log('>', myGen.next().value);

const sum = () => {
  return count + sum(myGen.next().value);
};

console.log(sum());
