const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// enter + d 종료

class Todo {
  constructor() {
    this.todoList = new Map();
    this.doingList = new Map();
    this.doneList = new Map();
    this.timeList = new Map();

    this.idCount = 0; // id값을 세어줌
    this.flag = false; // false는 unblcok true는 block
    this.start();
  }
  start() {
    this.inputUserNum(); // 할일 입력받기
  }

  inputUserNum() {
    // 인풋 값 입력받기
    let userInput;
    rl.question("할일을 말해주세요", (answer) => {
      // TODO: Log the answer in a database
      userInput = answer;
      this.separateInput(userInput);
    });
  }

  separateInput(input) {
    // 인풋값 쪼개서 배열에 저장 확인
    const splitedInput = input.trim().split("$");
    //입력값에서 띄어쓰기 제거 및 $ 로 구분해서 복사
    if (splitedInput.length > 3) {
      console.log("규정에 어긋난 입력입니다.");
      this.inputUserNum();
      return;
    }
    if (
      splitedInput.length == 3 &&
      !["doing", "done"].includes(splitedInput[2])
    ) {
      console.log("오직 doing,done 상태로만 변경가능합니다.");
      this.inputUserNum();
      return;
    }
    this.checkInput(splitedInput);
  }

  checkInput(splitedInput) {
    if (!["show", "add", "update", "change"].includes(splitedInput[0])) {
      console.log("잘못된입력입니다.");
      this.inputUserNum();
    }
    splitedInput[0] == "show" && this.showTask(splitedInput);
    splitedInput[0] == "add" && this.addTodo(splitedInput);
    splitedInput[0] == "update" && this.upDateThigs(splitedInput);
  }

  addTodo(splitedInput) {
    // key와 vlaue todolist에 전달
    splitedInput.splice(0, 1); //애드 확인했으니 삭제
    this.idCount++;
    this.todoList.set(this.idCount, splitedInput);
    console.log(`id: ${this.idCount}, ${splitedInput} 항목이 추가됬습니다.`);
    console.log(
      `현재상태: todo:${this.todoList.size}개, doing:${this.doingList.size}개, done:${this.doneList.size}개`
    );
    this.inputUserNum();
  }

  showTask(splitedInput) {
    splitedInput.splice(0, 1); //쇼 확인했으니 삭제
    splitedInput == "todo" && this.showTodoList();
    splitedInput == "doing" && this.showDoingList();
    splitedInput == "done" && this.showDoneList();
  }
  ///////////////리팩토링 필요한 구문///////////////
  showTodoList() {
    const showTodo = [];
    if (this.todoList.size == 0) {
      console.log("헤야 할일이 없습니다.");
      this.inputUserNum();
      return;
    }
    for (let i of this.todoList) {
      showTodo.push(i.join());
    }
    console.log(showTodo.join());
    this.inputUserNum();
  }

  showDoingList() {
    const showTodo = [];
    if (this.doingList.size == 0) {
      console.log("하는중인 일이 없습니다.");
      this.inputUserNum();
      return;
    }
    for (let i of this.doingList) {
      showTodo.push(i.join());
    }
    console.log(showTodo.join());
    this.inputUserNum();
  }

  showDoneList() {
    const showTodo = [];
    if (this.doneList.size == 0) {
      console.log("끝내야 할일이 없습니다.");
      this.inputUserNum();
      return;
    }
    for (let i of this.doneList) {
      const id = i[0];
      showTodo.push(i.join(), this.timeList.get(id));
    }
    console.log(showTodo.join());
    this.inputUserNum();
  }

  upDateThigs(splitedInput) {
    // 하는일 상태를 변환해주는 함수
    splitedInput.splice(0, 1); //업데이트 확인했으니 삭제
    const id = +splitedInput[0]; //바꿔줄 id값(숫자형으로 형변환)
    const task = splitedInput[1]; //바꾸고싶은 상태
    console.log(typeof task);

    if (this.todoList.has(id)) {
      //투두리스트에 원하는 id가 있으면 상태변환
      this.changeTask(id, task);
    }
    if (this.doingList.has(id)) {
      //두잉리스트에 원하는 id가 있으면 상태변환
      this.changeTask(id, task);
    }
    if (this.doneList.has(id)) {
      //던리스트에 원하는 id가 있으면 상태변환
      this.changeTask(id, task);
    }
  }

  changeTask(id, task) {
    // 입력값을 확인후 Map값으로 전환

    //listKey
    [this.todoList, this.doingList, this.doneList].forEach((List) => {
      if (List.has(id)) {
        const keyValue = List.get(id); // 해당 Map key 저장
        List.delete(id); //해당 Map에서 key 데이타 삭제
        if (task == "doing") {
          this.doingList.set(id, keyValue);
          this.recordTime(id);
        } else if (task == "done") {
          this.doneList.set(id, keyValue);
          this.checkTime(id);
        }
      }
    });
    console.log(
      `현재상태: todo:${this.todoList.size}개, doing:${this.doingList.size}개, done:${this.doneList.size}개`
    );
    this.inputUserNum();
  }

  recordTime(id) {
    // todo 에서 doing으로 변환시 시간 기록
    this.timeList.set(id, new Date());
  }
  checkTime(id) {
    const endTime = new Date();
    const startTime = this.timeList.get(id);
    const takedTime = Math.floor(endTime - startTime / 1000);
    this.timeList.set(id, takedTime);
  }
}

new Todo();
