const iter = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value, done };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

const map = (f, iter) => {
  if (!iter[Symbol.iterator]) {
    return;
  }

  const res = [];

  for (const value of iter) {
    res.push(f(value));
  }

  return res;
};

const filter = (f, iter) => {
  const res = [];

  for (const value of iter) {
    if (f(value)) {
      res.push(value);
    }
  }

  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const go = (...args) => reduce((acc, currFunc) => currFunc(acc), args);

const pipe =
  (f, ...funcs) =>
  (...values) =>
    go(f(...values), ...funcs);

const curry =
  (f) =>
  (arg, ...rest) =>
    rest.length ? f(arg, ...rest) : (...oneMore) => f(arg, ...oneMore);

const curryMap = curry(map);
const curryFilter = curry(filter);
const curryReduce = curry(reduce);
const curryGo = (...args) => curryReduce((value, f) => f(value), args);
const curryPipe =
  (f, ...funcs) =>
  (...values) =>
    curryGo(f(...values), ...funcs);

export { curryMap, curryFilter, curryReduce, curryGo, curryPipe };
