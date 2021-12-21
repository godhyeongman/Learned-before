// 반지름을 통해 원의 넓이 리턴
circle = (half) => half * half * Math.PI;

// 인자를 입력받아 사각형의 넓이를 리턴
rectangle = (width, height) => width * height;

// 인자를 입력받아 사다리꼴 넓이를 리턴
trapezoid = (topLength, bottomLength, height) =>
  ((topLength + bottomLength) * height) / 2;

// 인자를 입력받아 원기둥의 넓이를 리턴
cylinder = (half, height) => {
  return circle(half) * 2 + 2 * Math.PI * half * height;
};
