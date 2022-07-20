const isIterable = (v) =>
  v !== null && typeof v[Symbol.iterator] === "function";
// 매개 변수가 null이 아니고 Symbol.iterator의 타입이 함수!!

console.log(isIterable(new Set()));
console.log(isIterable(new Map()));
console.log(isIterable([]));
console.log(isIterable({}));
console.log(isIterable("문자"));
