const $top = document.createElement("div");
const $bottom = document.createElement("div");
const $firstTable = document.createElement("table");
const $secondTable = document.createElement("table");
const $thirdTable = document.createElement("table");
const $forthTable = document.createElement("table");
$top.className = "top";
$bottom.className = "bottom";
const wholeSudokuData = [];

function makeSudokuZone(sudokuZoneTurn, a) {
  const sudokuData = [];
  for (let i = 0; i < 2; i++) {
    const $tr = document.createElement("tr");
    const sudokuRow = [];
    for (let j = 0; j < 2; j++) {
      const $td = document.createElement("td");
      $tr.append($td);
      sudokuRow.push($td);
    }
    sudokuZoneTurn[a].append($tr);
    sudokuData.push(sudokuRow);
  }
  return sudokuData;
}

function setSudokuZone() {
  const sudokuZoneTurn = [$firstTable, $secondTable, $thirdTable, $forthTable];
  for (let a = 0; a < sudokuZoneTurn.length; a++) {
    wholeSudokuData.push(makeSudokuZone(sudokuZoneTurn, a));
  }
}

function ruleFirst(filter) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (filter.inclues(+wholeSudokuData[i][j].textContent)) {
        filter.splice(+wholeSudokuData[i][j], 1);
      }
    }
  }
}

function ruleSecond(filter) {
  // 줄비교
  //   for (let i = 0; i < 2; i++) {
  //     for (let j = 0; j < 2; j++) {
  //       if (filter.inclues(+wholeSudokuData[i][j].textContent)) {
  //         filter.splice(+wholeSudokuData[i][j], 1);
  //       }
  //     }
  //   }
  // 코드가 잘못되었음
}

function ruleSecond() {} // 행 비교
function ruleThird() {} // 칸 비교
function makeNumber() {
  const numScope = [1, 2, 3, 4];
  // 조건 3개 만들기
  ruleFirst(numScope); // 조건 1 가로 안에서 안쓰인 숫자들 넘겨줌
  ruleSecond(); // 조건 2 세로 안에서 안쓰인 숫자들 넘겨줌
  ruleThird(); // 조건 3 칸안에 값들을 검사해서 없는 숫자들 리턴

  //걸러진 값들을 랜덤 메서드로 적용하여 삽입
}

setSudokuZone();
makeNumber();
$top.append($firstTable, $secondTable);
$bottom.append($thirdTable, $forthTable);
document.body.append($top, $bottom);
