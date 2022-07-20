///////////전역 변수 /////////////

const $top = document.createElement("div");
$top.id = "top";
const $middle = document.createElement("div");
$middle.id = "middle";
const $bottom = document.createElement("div");
$bottom.id = "bottom";
const $back = document.createElement("div");
$back.id = "back";
const $input = document.createElement("input");
const $button = document.createElement("button");
$button.textContent = "입력";

const $redCube = document.createElement("table"); //top에 추가
const $greenCube = document.createElement("table"); //middle에 추가
const $blueCube = document.createElement("table"); //middle에 추가
const $purpleCube = document.createElement("table"); //middle에 추가
const $orangeCube = document.createElement("table"); //bottom에 추가
const $pinkCube = document.createElement("table"); //back에 추가

const cubeOrder = [
  $redCube,
  $greenCube,
  $blueCube,
  $purpleCube,
  $orangeCube,
  $pinkCube,
];
const cubeColor = ["tomato", "turquoise", "blue", "lime", "orange", "beige"];
const cubeData = [];
for (let i = 0; i < cubeOrder.length; i++) {
  const cubeFilter = [];
  makeCube(cubeOrder[i], i, cubeFilter);
  cubeData.push(cubeFilter);
}

const cubeTopSide = cubeData[0];
const cubeLeftSide = cubeData[1];
const cubeCenterSide = cubeData[2];
const cubeRightSide = cubeData[3];
const cubeBottomSide = cubeData[4];
const cubeBackSide = cubeData[5];
///////////큐브 만드는 함수//////////////

function makeCube(cube, turn, cubeFilter) {
  for (let i = 0; i < 3; i++) {
    const $cubeRow = document.createElement("tr");
    const cubeDataRow = [];
    for (let j = 0; j < 3; j++) {
      const $cubeCell = document.createElement("td");
      fillColor($cubeCell, turn);
      $cubeRow.append($cubeCell);
      cubeDataRow.push($cubeCell);
    }
    cube.append($cubeRow);
    cubeFilter.push(cubeDataRow);
  }
}

function fillColor(givenColor, turn) {
  givenColor.style.backgroundColor = cubeColor[turn];
}
////////////////// 큐브 배열값을 옮기는 함수 /////////////////////

function moveRightTogether(cube) {
  const colorTemp = [];
  for (let i = 0; i < 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      const newColor = cube[2 - j][i].style.backgroundColor;
      temp.push(newColor);
    }
    colorTemp.push(temp);
  }
  changeClockwiseCube(cube, colorTemp);
}

function moveLeftTogether(cube) {
  const colorTemp = [];
  for (let i = 0; i < 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      const newColor = cube[j][2 - i].style.backgroundColor;
      temp.push(newColor);
    }
    colorTemp.push(temp);
  }
  changeClockwiseCube(cube, colorTemp);
}

function moveLeftSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveRightTogether(cubeTopSide);
  } else if (coord == 2) {
    moveRightTogether(cubeBottomSide);
  }
  changeHorizonCube(
    cubeLeftSide,
    cubeCenterSide,
    cubeRightSide,
    cubeBackSide,
    coord
  );
}

function moveRigthSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveLeftTogether(cubeTopSide);
  } else if (coord == 2) {
    moveLeftTogether(cubeBottomSide);
  }
  changeHorizonCube(
    cubeBackSide,
    cubeRightSide,
    cubeCenterSide,
    cubeLeftSide,
    coord
  );
}

function moveTopSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveLeftTogether(cubeLeftSide);
  } else if (coord == 2) {
    moveRightTogether(cubeRightSide);
  }
  changeVerticalCube(
    cubeTopSide,
    cubeCenterSide,
    cubeBottomSide,
    cubeBackSide,
    coord
  );
}

function moveBottomSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveRightTogether(cubeLeftSide);
  } else if (coord == 2) {
    moveLeftTogether(cubeRightSide);
  }
  changeVerticalCube(
    cubeBackSide,
    cubeBottomSide,
    cubeCenterSide,
    cubeTopSide,
    coord
  );
}

function moveClockSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveLeftTogether(cubeBackSide);
  } else if (coord == 2) {
    moveLeftTogether(cubeCenterSide);
  }
  changeCircleCube(
    cubeTopSide,
    cubeRightSide,
    cubeBottomSide,
    cubeLeftSide,
    coord
  );
}

function moveUnClockSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveRightTogether(cubeBackSide);
  } else if (coord == 2) {
    moveRightTogether(cubeCenterSide);
  }
  changeUnCircleCube(
    cubeTopSide,
    cubeLeftSide,
    cubeBottomSide,
    cubeRightSide,
    coord
  );
}
//////////////오른쪽 왼쪽 확인하는 함수 //////////////////
function checkLOrR(input) {
  if (["l", "L"].includes(input[1])) {
    moveLeftSide(input);
  }
  if (["r", "R"].includes(input[1])) {
    moveRigthSide(input);
  }
}

function checkTOrB(input) {
  if (["t", "T"].includes(input[1])) {
    moveTopSide(input);
  }
  if (["b", "B"].includes(input[1])) {
    moveBottomSide(input);
  }
}

function checkCOrU(input) {
  if (["c", "C"].includes(input[1])) {
    moveClockSide(input);
  }
  if (["u", "U"].includes(input[1])) {
    moveUnClockSide(input);
  }
}
/////////////// 큐브 시계 가로 세로 방향 확인//////////
function checkMovement(input) {
  if (["h", "H"].includes(input[0])) {
    checkLOrR(input);
  } else if (["v", "v"].includes(input[0])) {
    checkTOrB(input);
  } else if (["c", "C"].includes(input[0])) {
    checkCOrU(input);
  }
}
///////////////브라우저 큐브 색상 변환 함수 /////////////
function changeCircleCube(
  chagedCube1,
  chagedCube2,
  chagedCube3,
  chagedCube4,
  coord
) {
  const temp = [];
  for (let i = 0; i < cubeData[0][0].length; i++) {
    temp.push(chagedCube1[coord][i].style.backgroundColor);
    chagedCube1[coord][i].style.backgroundColor =
      chagedCube2[i][2 - coord].style.backgroundColor;
    chagedCube2[i][2 - coord].style.backgroundColor =
      chagedCube3[2 - coord][2 - i].style.backgroundColor;
    chagedCube3[2 - coord][2 - i].style.backgroundColor =
      chagedCube4[2 - i][coord].style.backgroundColor;
    chagedCube4[2 - i][coord].style.backgroundColor = temp[i];
  }
}
function changeUnCircleCube(
  chagedCube1,
  chagedCube2,
  chagedCube3,
  chagedCube4,
  coord
) {
  const temp = [];
  for (let i = 0; i < cubeData[0][0].length; i++) {
    temp.push(chagedCube1[coord][i].style.backgroundColor);
    chagedCube1[coord][i].style.backgroundColor =
      chagedCube2[2 - i][coord].style.backgroundColor;
    chagedCube2[2 - i][coord].style.backgroundColor =
      chagedCube3[2 - coord][2 - i].style.backgroundColor;
    chagedCube3[2 - coord][2 - i].style.backgroundColor =
      chagedCube4[i][2 - coord].style.backgroundColor;
    chagedCube4[i][2 - coord].style.backgroundColor = temp[i];
  }
}

function changeHorizonCube(
  chagedCube1,
  chagedCube2,
  chagedCube3,
  chagedCube4,
  coord
) {
  const temp = [];
  for (let i = 0; i < cubeData[0][0].length; i++) {
    temp.push(chagedCube1[coord][i].style.backgroundColor);
    chagedCube1[coord][i].style.backgroundColor =
      chagedCube2[coord][i].style.backgroundColor;
    chagedCube2[coord][i].style.backgroundColor =
      chagedCube3[coord][i].style.backgroundColor;
    chagedCube3[coord][i].style.backgroundColor =
      chagedCube4[coord][i].style.backgroundColor;
    chagedCube4[coord][i].style.backgroundColor = temp[i];
  }
}

function changeVerticalCube(
  chagedCube1,
  chagedCube2,
  chagedCube3,
  chagedCube4,
  coord
) {
  const temp = [];
  for (let i = 0; i < cubeData[0][0].length; i++) {
    temp.push(chagedCube1[i][coord].style.backgroundColor);
    chagedCube1[i][coord].style.backgroundColor =
      chagedCube2[i][coord].style.backgroundColor;
    chagedCube2[i][coord].style.backgroundColor =
      chagedCube3[i][coord].style.backgroundColor;
    chagedCube3[i][coord].style.backgroundColor =
      chagedCube4[i][coord].style.backgroundColor;
    chagedCube4[i][coord].style.backgroundColor = temp[i];
  }
}
function changeClockwiseCube(cube, colorTemp) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cube[i][j].style.backgroundColor = colorTemp[i][j];
    }
  }
}

///////////////버튼에 이벤트 추가 및 동작 함수 ///////////////////
function onclickButton() {
  const input = $input.value;
  checkMovement(input);
}

$button.addEventListener("click", onclickButton);
////////////////////브라우저 디스플레이 함수////////////////////
$top.append($redCube);
$middle.append($greenCube, $blueCube, $purpleCube);
$bottom.append($orangeCube);
$back.append($pinkCube, $input, $button);
document.body.append($top, $middle, $bottom, $back);
