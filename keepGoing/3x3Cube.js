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
const cubeColor = ["red", "green", "blue", "purple", "orange", "pink"];
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

      $cubeCell.textContent = j;
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
////////////////// 큐브 동작 함수 /////////////////////

function moveTopLeftTogether() {
  // 시계 방향으로 돌리는 부분이 에러 이부분을 고민하고 수정해야함
}

function moveTopRightTogether() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cubeTopSide[i][j].style.backgroundColor =
        cubeTopSide[j][2 - i].style.backgroundColor;
    }
  }
  console.log("top ok");
}

function moveBottomLeftTogether() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cubeBottomSide[i][j].style.backgroundColor =
        cubeBottomSide[2 - j][i].style.backgroundColor;
    }
  }
}
function moveBottomRightTogether() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cubeBottomSide[i][j].style.backgroundColor =
        cubeBottomSide[j][2 - i].style.backgroundColor; //!!!!! 리팩토링떄 바텀 탑에 top일경우 바텀일경우 정해서 함수 2개를 줄일수있다
    }
  }
  console.log("top ok");
}

function moveLeftTopTogether() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cubeLeftSide[i][j].style.backgroundColor =
        cubeLeftSide[j][2 - i].style.backgroundColor; //!!!!! 리팩토링떄 함수 2개를 줄일수있다
    }
  }
}

function moveRightTopTogether() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cubeLeftSide[i][j].style.backgroundColor =
        cubeLeftSide[2 - j][i].style.backgroundColor; //!!!!! 리팩토링떄 함수 2개를 줄일수있다
    }
  }
}

function moveLeftSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveTopLeftTogether();
  } else if (coord == 2) {
    moveBottomLeftTogether();
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
    moveLeftTopTogether();
  } else if (coord == 2) {
    moveRightTopTogether();
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
    moveRightTopTogether();
  } else if (coord == 2) {
    moveLeftBottomTogether();
  }
  changeVerticalCube(
    cubeTopSide,
    cubeCenterSide,
    cubeBottomSide,
    cubeBackSide,
    coord
  );
}

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

function checkMovement(input) {
  if (["h", "H"].includes(input[0])) {
    checkLOrR(input);
  } else if (["v", "v"].includes(input[0])) {
    checkTOrB(input);
  } else if (["c", "C"].includes(input[0])) {
    checkCOrU(input);
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

function onclickButton() {
  const input = $input.value;
  checkMovement(input);
}

$button.addEventListener("click", onclickButton);

$top.append($redCube);
$middle.append($greenCube, $blueCube, $purpleCube);
$bottom.append($orangeCube);
$back.append($pinkCube, $input, $button);
document.body.append($top, $middle, $bottom, $back);
