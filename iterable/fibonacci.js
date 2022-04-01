const fibonacci = {
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const MAX = 10;

    return {
      next() {
        [pre, cur] = [cur, cur + pre];
        return { value: cur, done: cur >= MAX };
      },
    };
  },
};

for (const i of fibonacci) {
  console.log(i);
}
