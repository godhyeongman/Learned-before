// 반지름을 통해 원의 넓이 리턴
const circle = (half) => {
  if (isNaN(half)) {
    return console.log("error");
  }
  return half * half * Math.PI;
};

// 인자를 입력받아 사각형의 넓이를 리턴
const rectangle = (width, height) => {
  if (checkParameter(width, height)) return;

  return width * height;
};

// 인자를 입력받아 사다리꼴 넓이를 리턴
const trapezoid = (topLength, bottomLength, height) => {
  if (checkParameter(topLength, bottomLength, height)) return;
  return ((topLength + bottomLength) * height) / 2;
};

// 인자를 입력받아 원기둥의 넓이를 리턴
const cylinder = (half, height) => {
  if (checkParameter(half, height)) return;
  return circle(half) * 2 + 2 * Math.PI * half * height;
};

function checkParameter() {
  for (let i = 0; i < arguments.length; i++) {
    if (isNaN(arguments[i]) || !arguments[i]) {
      console.log("error");
      return true;
    }
  }
}
// console.log(circle(3));
// console.log(rectangle(1, 3));
// console.log(trapezoid(1, 3, 7));
// console.log(cylinder(1, 3));

// 테스트 결과 오류 검증 O, 계산 결과 출력 O
