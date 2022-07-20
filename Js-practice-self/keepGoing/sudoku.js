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

function filterVertical(numScopeCopy, i) {
  if (i % 2 == 0) {
    const firstFilter = numScopeCopy.indexOf(
      +wholeSudokuData[1][0][0].textContent
    );
    firstFilter != -1 && numScopeCopy.splice(firstFilter, 1);
    const secondFilter = numScopeCopy.indexOf(
      +wholeSudokuData[1][1][0].textContent
    );
    secondFilter != -1 && numScopeCopy.splice(secondFilter, 1);
    return;
  }
  const thirdFilter = numScopeCopy.indexOf(
    +wholeSudokuData[1][0][1].textContent
  );
  thirdFilter != -1 && numScopeCopy.splice(thirdFilter, 1);
  const forthFilter = numScopeCopy.indexOf(
    +wholeSudokuData[1][1][1].textContent
  );
  forthFilter != -1 && numScopeCopy.splice(forthFilter, 1);
}

function filterHorizon(numScopeCopy, i) {
  if (i < 2) {
    const firstFilter = numScopeCopy.indexOf(
      +wholeSudokuData[2][0][0].textContent
    );
    firstFilter != -1 && numScopeCopy.splice(firstFilter, 1);
    const secondFilter = numScopeCopy.indexOf(
      +wholeSudokuData[2][0][1].textContent
    );
    secondFilter != -1 && numScopeCopy.splice(secondFilter, 1);
    return;
  }
  const thirdFilter = numScopeCopy.indexOf(
    +wholeSudokuData[2][1][0].textContent
  );
  thirdFilter != -1 && numScopeCopy.splice(thirdFilter, 1);
  const forthFilter = numScopeCopy.indexOf(
    +wholeSudokuData[2][1][1].textContent
  );
  forthFilter != -1 && numScopeCopy.splice(forthFilter, 1);
}

function filterZone(numScopeCopy, forthZone) {
  forthZone.forEach((element, idx) => {
    if (element.textContent) {
      const check = numScopeCopy.indexOf(+element.textContent);
      check != -1 && numScopeCopy.splice(check, 1);
    }
  });
}

function makeforthZone(numScopeCopy, numScope) {
  const forthZone = wholeSudokuData[3].flat();
  for (let i = 0; i < 4; i++) {
    filterVertical(numScopeCopy, i);
    filterHorizon(numScopeCopy, i);
    filterZone(numScopeCopy, forthZone);
    const random =
      numScopeCopy[Math.floor(Math.random() * numScopeCopy.length)];
    forthZone[i].textContent = random;
    numScopeCopy = numScope.slice(0, numScope.length);
  }

  numScopeCopy;
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
  makeforthZone(numScopeCopy, numScope);
  // 완성은 되었지만 마지막 칸에 빈칸이 생기는 에러가 존재함 1,2,3스도쿠 칸을
  // 만들때 노가다 방식으로 해서 생기는 에러로 추정중
}

setSudokuZone();
makeNumber();
$top.append($firstTable, $secondTable);
$bottom.append($thirdTable, $forthTable);
document.body.append($top, $bottom);
