function* test() {
  const x = yield 1;
  // x 에는 아직 아무것도 할당 되지 않았다.
  // yield 1은 첫 next() 의 value에 할당된다.
  // x 의 값은 두번째 next 가 호출될때
  const y = yield x; // y
  return x + y;
}

console.log(test());
const generator = test();

console.log(generator.next());
console.log(generator.next(3));
console.log(generator.next(3));
console.log(generator.next(3));
