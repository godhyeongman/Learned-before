const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// enter + d 종료

class Todo {
  constructor() {
    this.listStorage = {};
    this.idCount = 0; // id값을 세어줌
    this.flag = false; // false는 unblcok true는 block
    this.start();
  }
  start() {
    this.listStorage.todoList = new Map();
    this.listStorage.doingList = new Map();
    this.listStorage.doneList = new Map();
    this.listStorage.timeList = new Map();
    console.log("todo 메모장을 시작합니다. 기록을 해주세요");
    this.inputUserNum(); // 할일 입력받기
  }

  inputUserNum() {
    // 인풋 값 입력받기
    let userInput;
    rl.question("", (answer) => {
      // TODO: Log the answer in a database
      userInput = answer;
      this.separateInput(userInput);
    });
  }

  returnErrorMessage(input) {
    if (input.length > 3) {
      console.log("규정에 어긋난 입력입니다.");
      this.inputUserNum();
      return;
    }
    if (input.length == 3 && !["doing", "done"].includes(input[2])) {
      console.log("오직 doing,done 상태로만 변경가능합니다.");
      this.inputUserNum();
      return;
    }
    if (!["show", "add", "update"].includes(input[0])) {
      console.log("명령 가능 단어는 /'show','add','update'/ 입니다.");
      this.inputUserNum();
    }
  }

  ///////////////입력  코드///////////////
  separateInput(input) {
    // 인풋값 쪼개서 배열에 저장 확인
    const splitedInput = input.trim().split("$"); // 만약 입력값에 띄어쓰기 있으면 해결방법 .join() 맞는가?
    //입력값에서 띄어쓰기 제거 및 $ 로 구분해서 복사
    this.returnErrorMessage(splitedInput);
    this.checkInput(splitedInput);
  }

  ///////////////입력  코드///////////////
  checkInput(splitedInput) {
    // 추가,출력,변환 분기점
    splitedInput[0] == "show" && this.showTask(splitedInput);
    splitedInput[0] == "add" && this.addTodo(splitedInput);
    splitedInput[0] == "update" && this.upDateThigs(splitedInput);
  }

  ///////////////리스트 추가 코드///////////////
  addTodo(splitedInput) {
    // key와 vlaue todolist에 전달
    splitedInput.splice(0, 1); //애드 확인했으니 삭제
    this.idCount++;
    console.log(`id: ${this.idCount}, ${splitedInput} 항목이 추가됬습니다.`);
    this.listStorage.todoList.set(this.idCount, splitedInput);
    this.showCurrentTask();
    this.inputUserNum();
  }

  showCurrentTask() {
    console.log(
      `현재상태: todo:${this.listStorage.todoList.size}개, doing:${this.listStorage.doingList.size}개, done:${this.listStorage.doneList.size}개`
    );
  }

  ///////////////입력 테스크 출력 코드///////////////
  showTask(splitedInput) {
    splitedInput.splice(0, 1); //쇼 확인했으니 삭제
    splitedInput == "todo" && this.showTodoList();
    splitedInput == "doing" && this.showDoingList();
    splitedInput == "done" && this.showDoneList();
  }

  showTodoList() {
    const showTodo = [];
    if (this.listStorage.todoList.size == 0) {
      console.log("헤야 할일이 없습니다.");
      this.inputUserNum();
      return;
    }
    for (let i of this.listStorage.todoList) {
      showTodo.push(i);
    }
    console.log(showTodo.join());
    this.inputUserNum();
  }

  showDoingList() {
    const showTodo = [];
    if (this.listStorage.doingList.size == 0) {
      console.log("하는중인 일이 없습니다.");
      this.inputUserNum();
      return;
    }
    for (let i of this.listStorage.doingList) {
      showTodo.push(i);
    }
    console.log(showTodo.join());
    this.inputUserNum();
  }

  showDoneList() {
    const showTodo = [];
    if (this.listStorage.doneList.size == 0) {
      console.log("끝내야 할일이 없습니다.");
      this.inputUserNum();
      return;
    }
    for (let i of this.listStorage.doneList) {
      const id = i[0];
      showTodo.push(i[1], this.listStorage.timeList.get(id)); //donelist의 value와 timelist의 value만을 가져옴
    }
    console.log(showTodo.join());
    this.inputUserNum();
  }

  ////////////////////상태 변환 코드///////////////////////
  upDateThigs(splitedInput) {
    // 하는일 상태를 변환해주는 함수
    splitedInput.splice(0, 1); //업데이트 확인했으니 삭제
    const id = +splitedInput[0]; //바꿔줄 id값(숫자형으로 형변환)
    const task = splitedInput[1]; //바꾸고싶은 상태

    setTimeout(() => {
      // 3초 딜레이
      const everyList = [
        this.listStorage.todoList,
        this.listStorage.doingList,
        this.listStorage.doneList,
      ];
      everyList.forEach((list) => {
        if (list.has(id)) {
          this.changeTask(id, task, list);
          // 이부분이 현재 상태를 2번 반복시킴 return이 안먹음 forEach문이라
        }
      });
    }, 3000);
  }

  changeTask(id, task, list) {
    const keyValue = list.get(id); // 해당 Map value 저장
    list.delete(id); //해당 Map에서 key 데이타 삭제
    if (task == "doing") {
      this.listStorage.doingList.set(id, keyValue);
      this.recordTime(id);
    } else if (task == "done") {
      this.listStorage.doneList.set(id, keyValue);
      this.checkTime(id, keyValue);
    }

    console.log(
      `현재상태: todo:${this.listStorage.todoList.size}개, doing:${this.listStorage.doingList.size}개, done:${this.listStorage.doneList.size}개`
    );
    this.inputUserNum();
  }

  ////////////////////시간 측정 코드///////////////////////
  recordTime(id) {
    // todo 에서 doing으로 변환시 시간 기록
    this.listStorage.timeList.set(id, new Date());
  }
  checkTime(id) {
    const endTime = new Date();
    const startTime = this.listStorage.timeList.get(id);
    const takedTime = Math.floor((endTime - startTime) / 1000); // 끝시간에서 시작시간을 빼서 표기해줌
    this.listStorage.timeList.set(id, takedTime + "초"); //!!!!!!! 시간초 정리해야함
  }
}

new Todo();
