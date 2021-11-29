class Test {
  constructor() {
    this.$button = document.createElement("button");
    this.$input = document.createElement("input");
    this.$screen = document.createElement("div");
    this.clickable = true;
    this.save = [];
    this.setGame();
  }

  setGame() {
    document.body.append(this.$screen, this.$input, this.$button);
    this.$button.textContent = "입력";
    this.$button.addEventListener("click", this.onclickButton);
    this.$screen.id = "screen";
  }

  onclickButton = (event) => {
    const input = this.$input.value;
    input == "준비" && this.readyGame();
    input == "시작" && this.startGame();
    this.checkCorrect(input);
  };

  readyGame() {
    console.log(2);
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

    // const randomTime = Math.floor(Math.random() * 4);
    let wordCopy = word.slice(0, word.length);
    for (let i = 0; 0 < wordCopy.length; i++) {
      const randomIndex = Math.floor(Math.random() * wordCopy.length);
      this.save.push(wordCopy.splice(randomIndex, 1)[0]);
      console.log(this.save);
    }
  }

  startGame() {
    const startTime = new Date();
    const input = this.$input.value;
    // let lev = 0;
    this.showWord();
  }
  checkCorrect(userInput) {
    console.log(userInput);
    console.log(this.save[0]);
    if (userInput == this.save[0]) {
      this.save.splice(0, 1);
      this.showWord();
    }
  }
  showWord() {
    this.save.length == 0 && alert("축하합니다 모두 맞추셨습니다.");
    setTimeout(() => {
      this.$screen.textContent = this.save[0];
    }, 1000 /* - 1000 * lev */);

    setTimeout(() => {
      this.$screen.textContent = "";
    }, 2000);
  }
}
new Test();
