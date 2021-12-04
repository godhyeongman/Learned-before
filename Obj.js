const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// ctrl + y = 코드복원
// ctrl + shift + L = 선택한 모든단어 선택
// ctrl + home,end = 페이지 맨끝 혹은 맨첫번째

// 객채 정보저장 idea
// const listStorage = {
//   todo: {
//     id1: [
//       /*정보입력*/
//     ],
//     id2: function blahBlah() {},
//   },
// };

function start() {
  console.log("필기를 시작합니다.");
  getUserInput();
}

function getUserInput() {
  let userInput;
  rl.question("", (answer) => {
    userInput = answer;
    separateInput(userInput);
  });
}

function separateInput(input) {
  const copiedUserInput = Array.from(input.trim());
  const separtedUserInput = copiedUserInput.split($);
  checkWhatToDo(separtedUserInput);
}

function checkWhatToDo(input) {
  const check = input[0];
  checkError(input);
  if (check === "add") {
  }
  if (check === "show") {
  }
  if (check === "done") {
  }
}

function checkError() {
  if (input.length > 3) {
    console.log("너무큰 입력값입니다.");
    getUserInput();
    return;
  }
  if (!["add", "show", "done"].includes(input[0])) {
    console.log("add, show, done 3가지 기능만을 지원합니다 입력을 확인하세요");
    getUserInput();
    return;
  }
}

start();
