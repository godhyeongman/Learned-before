class Test {
  constructor() {
    this.$button = document.createElement("button");
    this.$input = document.createElement("input");
    this.$screen = document.createElement("div");
    this.setGame();
  }

  setGame() {
    document.body.append(this.$screen, this.$input, this.$button);
    this.$button.textContent = "입력";
    this.$button.addEventListener("click", this.onclickButton);
    this.$screen.id = "screen";
  }

  onclickButton = (event) => {
    this.save = [];
    const input = this.$input.value;
    let clickable = true;
    input == "준비" && this.readyGame();
    input == "시작" && this.startGame();
    this.save.push(input);
  };

  readyGame() {
    const word = [
      "업!",
      "탕",
      "사과",
      "raise",
      "아이폰",
      "i-phone",
      "갤럭시",
      "galaxy",
    ];
    const randomTime = Math.floor(Math.random() * 4);
    this.randomWord = [];
    let wordCopy = word.slice(0, word.length);
    for (let i = 0; i < wordCopy.length; i++) {
      const randomIndex = Math.floor(Math.random() * wordCopy.length);
      this.randomWord.push(wordCopy.splice(randomIndex, 1));
    }
  }

  startGame() {
    const startTime = new Date();
    const input = this.$input.value;
    let lev = 0;
    let i = 0;
    const intervalID = setInterval(() => {
      this.$screen.textContent = this.randomWord[i];
      i++;
      this.randomWord.length == 0 && clearInterval(intervalID);
    }, 3500 - 1000 * lev);
  }
  //   checkCorrect(randomWord, i) {
  //     if (this.save === randomWord[i]) {
  //       randomWord.splice(i, 1);
  //       !randomWord.includes("업!") && lev++;
  //       return;
  //     }
  //     if (this.save !== randomWord[i]) {
  //       alert("잘못된 단어입력입니다.");
  //       return;
  //     }
  //   }
}
new Test();
