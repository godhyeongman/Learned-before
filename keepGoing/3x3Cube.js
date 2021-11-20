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
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cubeTopSide[i][j] = cubeTopSide[2 - j][i]; //메서드로 slice해서 써보자
    }
  }
  console.log("top ok");
}

function moveLeftSide(input) {
  const coord = +input[2] - 1;
  if (coord == 0) {
    moveTopLeftTogether();
  } else if (coord == 2) {
    moveBottomLeftTogether();
  }
  const cubeChangeTurn = [
    cubeLeftSide,
    cubeCenterSide,
    cubeRightSide,
    cubeBackSide,
  ];
  for (let i = 0; i < 4; i++) {
    let j = i + 1;
    const fi = cubeChangeTurn[i][coord];
    if (j == 4) j = 0;
    cubeChangeTurn[j][coord] = fi;
  } // !!!!!!!!!!!!!!!!!!!!! 큐브의 디스플레이는 처음부터 cubeOrder과 참조관계인데 나는 cubeData만 조작하고있었음
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
