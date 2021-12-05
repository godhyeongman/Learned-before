const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// ctrl + y = 코드복원
// ctrl + shift + L = 선택한 모든단어 선택
// ctrl + home,end = 페이지 맨끝 혹은 맨첫번째

// 객채 정보저장 idea
const listStorage = {
  idCount: 0,
  task: [],
};

listStorage.start = function () {
  console.log("필기를 시작합니다.");
  this.getUserInput();
};

listStorage.getUserInput = function () {
  let userInput;
  const that = this;
  rl.question("", (answer) => {
    userInput = answer;
    that.separateInput(userInput);
  });
};

listStorage.separateInput = function (input) {
  const copiedUserInput = input;
  const separtedUserInput = copiedUserInput.trim().split("$");
  //띄어쓰기 코드 분리된 배열을 돌면서 join('') 하면됨
  this.checkWhatToDo(separtedUserInput);
};

listStorage.checkWhatToDo = function (input) {
  const check = input[0];
  if (this.checkError(input)) {
    return;
  }
  if (check === "add") {
    this.addTask(input);
  }
  if (check === "show") {
    this.showTask(input);
  }

  if (check === "update") {
    this.updateTask(input);
  }
};

listStorage.checkError = function (input) {
  if (input.length > 3) {
    console.log("너무큰 입력값입니다.");
    this.getUserInput();
    return;
  }
  if (!["add", "show", "update"].includes(input[0])) {
    console.log(
      "add, show, update 3가지 기능만을 지원합니다 입력을 확인하세요"
    );
    this.getUserInput();
    return;
  }
};

listStorage.addTask = function (input) {
  listStorage.idCount++;
  listStorage.task.push({
    id: listStorage.idCount,
    task: input[1],
    time: null,
    statement: "todo",
  });
  this.checkCurrentStateMent();
  this.getUserInput();
};

listStorage.checkCurrentStateMent = function () {
  let toDo = 0;
  let doing = 0;
  let done = 0;

  listStorage.task.forEach((item) => {
    if (item.statement === "todo") {
      toDo++;
    } else if (item.statement === "doing") {
      doing++;
    } else if (item.statement === "done") {
      done++;
    }
  });
  console.log(`현재상태: todo:${toDo}, doing:${doing}, done:${done}`);
};

listStorage.showTask = function (input) {
  const userWantedTask = input[1];
  const getUWTfromStorage = [];

  listStorage.task.forEach((item) => {
    if (item.statement === userWantedTask) {
      getUWTfromStorage.push([item.id, item.task]);
    }
  }); // 유저입력 task를 listStorage에서 확인후 getUWt[]에 id와task만 저장

  console.log(getUWTfromStorage.flat());
  this.getUserInput();
};

listStorage.updateTask = function (input) {
  const id = +input[1];
  const willChangeTask = input[2];
  this.willChangeTask();

  listStorage.task.forEach((item) => {
    if (item.id === id) {
      item.statement = willChangeTask;
      this.checkChangedDoing(willChangeTask, item);
      this.checkChangedDone(willChangeTask, item);
    }
  });
  this.checkCurrentStateMent();
  this.getUserInput();
};

listStorage.checkWillChangeTask = function (willChangeTask) {
  if (["todo", "doing", "done"].includes(willChangeTask)) {
    console.log("바꿔주고 싶은 상태에 오류가 있습니다.");
    this.getUserInput();
  }
};

listStorage.checkChangedDoing = function (willChangeTask, item) {
  if (willChangeTask === "doing") {
    item.time = new Date();
  }
};
listStorage.checkChangedDone = function (willChangeTask, item) {
  if (willChangeTask === "done") {
    const endTime = new Date();
    const startTime = item.time;
    item.time = Math.floor(endTime - startTime) / 1000;
  }
};
listStorage.start();
