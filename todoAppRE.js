const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout,
});

const todoStorage = {}; // 할일 저장공간
const appFunc = {};

todoStorage.idCount = 0;
todoStorage.dataArr = [];

appFunc.getUserInput = function () {
  rl.question("할일 추가> ", (input) => {
    this.checkInput(input);
  });
};

appFunc.quitProccess = () => rl.close();

appFunc.addTodo = (input) => {
  todoStorage.idCount++;
  todoStorage.dataArr.push({
    name: input,
    status: "todo",
    id: todoStorage.idCount,
  });
};

appFunc.checkInput = function (input) {
  copiedInput = Array.from(input.split("$"));
  if (!this.showErr(copiedInput)) this.getUserInput();
  copiedInput[0] === "add" && this.addTodo(copiedInput[1]);
  copiedInput[0] === "show" && this.showTask(copiedInput[1]);
};

appFunc.showErr = function (error) {
  if (!["add", "show", "done"].includes(error[0])) {
    console.log(`${error[0]}는 제공하고 있는 기능이 이닙니다.`);
  } else if (error.length > 2) {
    console.log("입력양식에 문제가 있습니다.");
  }
};

appFunc.showTask = function (listOrAll) {
  if (listOrAll === "all") {
    let todo = 0;
    let doing = 0;
    let done = 0;
    todoStorage.dataArr.forEach((data) => {
      if (data.status === "todo") {
        todo++;
      } else if (data.status === "doing") {
        doing++;
      } else {
        done++;
      }
    });
    console.log(`현재상태: todo:${todo}개, doing: ${doing}개, done: ${done}개`);
  } else if (listOrAll === "todo") {
    const todoArr = todoStorage.dataArr.map((data) => data.name);
    console.log(todoArr);
  }
  this.getUserInput();
};

appFunc.getUserInput();

// 정보 저장공간
// - 정보를 저장할 공간제공
// - 정보를 분리(상태,입력값,id,태그)

// 앱 기능
// - 입력받기
// - 입력값 토대로 함수 호출
// - 입력값 토대로 정보 처리
// - 입력값 토대로 정보 출력
// - 프로세스 종료
