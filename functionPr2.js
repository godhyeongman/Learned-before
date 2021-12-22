//피보나치(100 이상일때 종료)
function fibo(a, b) {
  const temp = b;
  b = a + b;
  if (b >= 100) return;
  console.log(b);
  fibo(temp, b);
}

// 넓이 구하기

const circle = (half, argumentsCount) => {
  if (isNaN(half)) {
    return console.log("error");
  }

  console.log(half * half * Math.PI);
  // 재귀넣어서 미션 요건 충족시키자
  argumentsCount++;
};

const rectangle = (width, height) => {
  if (checkParameter(width, height)) return;

  return width * height;
};

const trapezoid = (topLength, bottomLength, height) => {
  if (checkParameter(topLength, bottomLength, height)) return;
  return ((topLength + bottomLength) * height) / 2;
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
    ? circle(arguments[argumentsCount], argumentsCount)
    : figure == "rect"
    ? rectangle(arguments[argumentsCount], arguments[argumentsCount + 1])
    : figure == "trapezoid"
    ? trapezoid(
        arguments[argumentsCount],
        arguments[argumentsCount + 1],
        arguments[argumentsCount + 2]
      )
    : console.log("error");
}
getArea("circle", 10);
// >  원의 넓이 값출력
