const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// enter + d 종료

class Please {
  constructor() {
    this.tool = {};
    this.flag = false; // false는 ok true는 막힘
    this.start();
  }
  start() {
    this.inputUserNum(); // 참가자 확인
    this.tool.currentTurn = 0;
    // this.checkWord();
  }

  inputUserNum() {
    rl.on("line", (line) => {
      this.tool.userNum = line; // 한 줄씩 입력받은 후 실행할 코드
      rl.close(); // 필수. 없으면 입력을 무한히 받는다
    });
    rl.on("close", () => {
      // 입력이 끝난 후 실행할 코드
      this.checkUserNum();
    });
  }

  checkUserNum() {
    if (!isFinite(this.tool.userNum)) {
      console.log("잘못된 값을 입력하셨습니다. 다시입력하세요!");
      this.inputUserNum();
    }
  }

  // checkWord() {
  //   this.tool.currentTurn++;
  //   console.log(`현재턴: ${this.tool.currentTurn}번째 참가자`);
  //   let word = "";
  //   rl.on("line", (line) => {
  //     word = line; // 한 줄씩 입력받은 후 실행할 코드
  //     rl.close(); // 필수. 없으면 입력을 무한히 받는다
  //   });
  //   rl.on("close", () => {
  //     this.copyWord(word); // 입력이 끝난 후 실행할 코드
  //   });
  // }

  // copyWord(word) {
  //   console.log(`입력받은값: ${word}`);
  //   const copyWordArr = Array.from(word);
  // }
}

new Please();
