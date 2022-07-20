const $ticTacToeTable = document.createElement("table");
const tableData = [];
let turn = "X"; // 클릭시 들어갈 텍스트 컨텐트(changeTurn()에 의해 O가 첫번째턴)

for (let i = 0; i < 3; i++) {
  const $ticTacToeHeight = document.createElement("tr");
  const tableDataHeight = [];
  for (let j = 0; j < 3; j++) {
    const $cell = document.createElement("td");
    tableDataHeight.push($cell);
    $cell.id = "cell";

    $ticTacToeHeight.append($cell);
  } // 틱택토 헤이트에 셀 삽입(셀의 인덱스 가로길이)
  tableData.push(tableDataHeight);
  $ticTacToeTable.append($ticTacToeHeight);
} // 틱택토 테이블에 div 삽입

const checkCell = (event) => {
  event.target.textContent = turn;
};

const changeTurn = () => {
  turn == "X" ? (turn = "O") : (turn = "X");
};

const checkCellsFull = () => {
  let count = 0;
  tableData.forEach((tr, idx) => {
    tr.forEach((cell, cellIdx) => {
      if (cell.textContent) {
        count++;
      }
    });
  });
  if (count == 9) {
    alert("무승부");
    clearTicTacToe();
  }
};

const blockSameChoice = (event) => {
  if (event.target.textContent) return true;
};

const haveHeihgtWinner = (heightCoord) => {
  let count = 0;
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[heightCoord][i].textContent == turn) {
      count++;
    }
  }
  if (count == 3) return true;
};

const haveWidthWinner = (widthCoord) => {
  let count = 0;
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i][widthCoord].textContent == turn) {
      count++;
    }
  }
  if (count == 3) return true;
};

const haveCrossWinner = () => {
  let count = 0;
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i][i].textContent == turn) count++;
  }
  if (count == 3) return true;
  if (
    tableData[0][2].textContent == turn &&
    tableData[1][1].textContent == turn &&
    tableData[2][0].textContent == turn
  ) {
    return true;
  }
};

const checkWinner = (event) => {
  let heightCoord = 0;
  let widhtCoord = 0;
  tableData.forEach((tr, idx) => {
    tr.forEach((cell, cell_Idx) => {
      if (cell == event.target) {
        heightCoord = idx;
        widhtCoord = cell_Idx;
      }
    });
  });

  // alert('승리') 부분 틱택토 초기화 함수 삽입할것
  if (haveHeihgtWinner(heightCoord)) {
    alert(`${turn}님의 승리!`);
    clearTicTacToe();
  }

  if (haveWidthWinner(widhtCoord)) {
    alert(`${turn}님의 승리!`);
    clearTicTacToe();
  }

  if (haveCrossWinner()) {
    alert(`${turn}님의 승리!`);
    clearTicTacToe();
  }
};

const clearTicTacToe = () => {
  tableData.forEach((tr, idx) => {
    tr.forEach((cell, cell_Idx) => {
      if (cell.textContent) {
        cell.textContent = "";
      }
    });
  });
};

const checkcomputerWinner = (randHeight, randWidth) => {
  if (haveHeihgtWinner(randHeight)) {
    alert(`${turn}님의 승리!`);
    clearTicTacToe();
  }

  if (haveWidthWinner(randWidth)) {
    alert(`${turn}님의 승리!`);
    clearTicTacToe();
  }

  if (haveCrossWinner()) {
    alert(`${turn}님의 승리!`);
    clearTicTacToe();
  }
};

const makeComputerCell = (evnet) => {
  changeTurn();

  const forReduceHeight = [0, 1, 2];
  const emptyTable = [];
  tableData.forEach((tr, idx) => {
    const emptyheight = [];
    tr.forEach((cell, cell_Idx) => {
      if (!cell.textContent) {
        emptyheight.push(cell_Idx);
      }
    });
    emptyTable.push(emptyheight);
  });

  for (let i = 0; i < 3; i++) {
    if (emptyTable[i].length == 0) {
      const forDelete = forReduceHeight.indexOf(i);
      forReduceHeight.splice(forDelete, 1);
    } // !!에러 수정사항 반복문이 돌며 forReduceHeight 인덱스 i를 splice하는데
    // forReduceHeight 인덱스 1을 삭제하면 foReduceHeihgt의 인덱스 2가 1로와서 반복문의 i가 2가 될때 에러를 유발함
  }
  console.log(forReduceHeight, emptyTable);

  const randHeight =
    forReduceHeight[Math.floor(Math.random() * forReduceHeight.length)];
  const randWidthLength = emptyTable[randHeight].length;
  console.log(emptyTable[randHeight]);
  const randWidth =
    emptyTable[randHeight][Math.floor(Math.random() * randWidthLength)];
  console.log(randHeight, randWidth);
  tableData[randHeight][randWidth].textContent = turn;

  checkcomputerWinner(randHeight, randWidth); // 컴퓨터의 승리 확인하는 함수
};

function onClickEvent(event) {
  if (blockSameChoice(event)) return;
  changeTurn(event);
  checkCell(event); // 표시되지 않은 칸일경우 체크 하는 함수
  checkWinner(event); // 승자가 있는지 확인하는 함수
  checkCellsFull(); // 무승부일때 alert('무승부')하는 함수
  makeComputerCell(event); // 컴퓨터의 랜덤한 체크
  checkCellsFull(); // 무승부일때 alert('무승부')하는 함수
}

$ticTacToeTable.addEventListener("click", onClickEvent);

document.body.append($ticTacToeTable);
