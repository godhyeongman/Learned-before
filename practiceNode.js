const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Please {
  constructor() {
    this.tool = {};
    this.start();
  }
  start() {
    let word;
    rl.on("line", (line) => {
      word = line; // 한 줄씩 입력받은 후 실행할 코드
      rl.close(); // 필수. 없으면 입력을 무한히 받는다
    });
    rl.on("close", () => {
      this.copyWord(word); // 입력이 끝난 후 실행할 코드
    });
  }

  copyWord(word) {
    console.log(`입력받은값${word}`);
    const copyWordArr = Array.from(word);
    console.log(`배열로 얕은복사 ${copyWordArr}`);
    console.log(`다시문자열로 ${copyWordArr.join("")}`);
    console.log(`이건 타입이 뭘까? ${typeof copyWordArr.join("")}`);
    console.log(`다시 쪼개뿔기 ${copyWordArr.join("")}`);
    console.log(copyWordArr, word);
  }
}

new Please();
