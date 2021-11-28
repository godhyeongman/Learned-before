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

function makeSecondZone() {
  const topSide = [];
  const bottomSide = [];
  for (let i = 0; i < 2; i++) {
    bottomSide.push(wholeSudokuData[0].flat()[i].textContent);
    topSide.push(wholeSudokuData[0].flat()[i + 2].textContent);
  }

  for (let j = 0; j < 2; j++) {
    const random = Math.floor(Math.random() * wholeSudokuData[0][1].length);
    const random2 = Math.floor(Math.random() * wholeSudokuData[0][1].length);
    const splicedNum = topSide.splice(random, 1);
    const splicedNum2 = bottomSide.splice(random2, 1);
    topSide.push(splicedNum[0]);
    bottomSide.push(splicedNum2[0]);
  }

  for (let k = 0; k < 2; k++) {
    wholeSudokuData[1][0][k].textContent = topSide[k];
    wholeSudokuData[1][1][k].textContent = bottomSide[k];
  }
}

function makeThirdZone(numScopeCopy, numScope) {
  let leftSide = [];
  const rightSide = [];
  for (let i = 0; i < 2; i++) {
    rightSide.push(wholeSudokuData[0][i][0].textContent);
    leftSide.push(wholeSudokuData[0][i][1].textContent);
  }

  for (let j = 0; j < 2; j++) {
    const random = Math.floor(Math.random() * wholeSudokuData[2].length);
    const random2 = Math.floor(Math.random() * wholeSudokuData[2].length);
    const splicedNum = leftSide.splice(random, 1);
    const splicedNum2 = rightSide.splice(random2, 1);
    leftSide.push(splicedNum[0]);
    rightSide.push(splicedNum2[0]);
  }

  for (let k = 0; k < 2; k++) {
    wholeSudokuData[2][k][0].textContent = leftSide[k];
    wholeSudokuData[2][k][1].textContent = rightSide[k];
  }
}

function makeNumber() {
  const numScope = [1, 2, 3, 4];
  let numScopeCopy = numScope.slice(0, numScope.length);

  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * numScopeCopy.length);
    const splicedNum = numScopeCopy.splice(random, 1);
    wholeSudokuData[0].flat()[i].textContent = splicedNum[0];
  }
  numScopeCopy = numScope.slice(0, numScope.length);

  makeSecondZone();
  makeThirdZone();
}

setSudokuZone();
makeNumber();
$top.append($firstTable, $secondTable);
$bottom.append($thirdTable, $forthTable);
document.body.append($top, $bottom);
