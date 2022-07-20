class Word {
  constructor() {
    this.$input = document.createElement("input");
    this.$button = document.createElement("button");
    this.$wordZone = document.createElement("div");
    this.$button.textContent = "입력";
    this.$wordZone.textContent = "단어:";
    this.word = "";
    this.turnCount = 0;
    document.body.append(this.$wordZone, this.$input, this.$button); //디스플레이 세팅
    this.setGame();
  }
  setGame() {
    this.userNum = +prompt("몇명이 참가할까요?", "");

    if (!isFinite(this.userNum) || this.userNum == false) {
      // 숫자가 아닌값을 입력할경우 잘못됨을 알려주고 다시 시작
      this.userNum == false && alert("취소하셨습니다.");
      this.userNum != false && alert("잘못된 입력입니다.");
      this.setGame();
      return;
    }

    this.checkTurn(this.userNum);
    this.$wordZone.textContent = `${this.turnCount}번쨰 차래 ${this.$wordZone.textContent}`;
    this.$button.addEventListener("click", this.onclickButton);
  }
  onclickButton = (event) => {
    const input = this.$input.value;
    if (this.word == "" && input.length == 3) {
      // 첫번째 차례는 단어의 길이가 3일경우 무조건 넘겨줌
      this.word = input;
      this.checkTurn(this.userNum);
      this.$wordZone.textContent = "단어:";
      this.$wordZone.textContent = `${this.turnCount}번쨰 차래 ${this.$wordZone.textContent} ${this.word}`;
      this.$input.value = "";
      return;
    }
    if (this.errorBlock(input)) return;
    this.checkWord(input);
  };
  checkTurn(userNum) {
    this.turnCount++; // 오류시 확인
    if (this.turnCount > userNum) {
      this.turnCount = 1;
    }
  }
  errorBlock(input) {
    if (input.length > 3 || input.length < 3) {
      // 단어의 길이가 다를때
      alert("단어의 길이가 다릅니다.");
      this.resetGame();
      return true;
    }
    if (this.word[this.word.length - 1] != input[0]) {
      alert("끝말이 이어지지 않았습니다.");
      this.resetGame();
      return true;
    }
    const testWord = input.split("");
    console.log(testWord);
    testWord.forEach((el) => {
      if (+el) {
        alert("숫자가 포함되었습니다.");
        this.resetGame();
        return true;
      }
    });
  }
  checkWord(input) {
    if (this.errorBlock(input)) return;
    this.word = input;
    this.checkTurn(this.userNum);
    this.$wordZone.textContent = "단어:";
    this.$wordZone.textContent = `${this.turnCount}번쨰 차래 ${this.$wordZone.textContent} ${this.word}`;
    this.$input.value = "";
  }
  resetGame() {
    this.word = "";
    this.$wordZone.textContent = "단어:";
    this.turnCount = 0;
    this.$input.value = "";
    this.setGame();
  }
}
new Word();
