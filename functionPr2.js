//피보나치(100 이상일때 종료)
function fibo(a, b) {
  const temp = b;
  b = a + b;
  if (b >= 100) return;
  console.log(b);
  fibo(temp, b);
}

// 넓이 구하기
const runStorage = [];

function circle(half) {
  const goal = arguments[1];
  if (checkParameter(half, goal)) return;
  console.log(half * half * Math.PI);
  if (half >= goal) return;
  half++;
  if (arguments[1]) circle(half, goal);
}

const rectangle = (width, height) => {
  if (checkParameter(width, height)) return;

  return console.log(width * height);
};

const trapezoid = (topLength, bottomLength, height) => {
  if (checkParameter(topLength, bottomLength, height)) return;
  return console.log(((topLength + bottomLength) * height) / 2);
};

function checkParameter() {
  for (let i = 0; i < arguments.length; i++) {
    if (isNaN(arguments[i]) || !arguments[i]) {
      console.log("error");
      return true;
    }
  }
}

function getArea(figure) {
  let argumentsCount = 1;
  figure == "circle"
    ? circle(arguments[argumentsCount], arguments[argumentsCount + 1])
    : figure == "rect"
    ? rectangle(arguments[argumentsCount], arguments[argumentsCount + 1])
    : figure == "trapezoid"
    ? trapezoid(
        arguments[argumentsCount],
        arguments[argumentsCount + 1],
        arguments[argumentsCount + 2]
      )
    : console.log("error");
  runStorage.push(figure);
}

function printExecutionSequence() {
  console.log(`실행순서: ${runStorage.join(", ")}`);
}
getArea("circle", 7, 10);
getArea("circle");
getArea("rect", 2, 3);
getArea("trapezoid");
printExecutionSequence();
// >  원의 넓이 값출력
