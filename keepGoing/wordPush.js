const $wordZone = document.createElement("div");
const $input = document.createElement("input");
const $button = document.createElement("button");

$button.textContent = "입력";

function checkWord(userWord) {
  if ($wordZone.textContent) return;
  for (let check of userWord) {
    if (isFinite(check)) {
      alert("문자만 입력가능합니다.");
      return true;
    }
    $wordZone.textContent = userWord;
    $input.value = "";
  }
}

function wordChange(word, input) {
  const direction = "";
  const howMany = 0;
  const arrayWord = [];
  MakeWordArray(word);
  checkUserControl(input);
  makeWordMove(arrayWord);
}

function MakeWordArray(word) {
  for (let i = 0; i < word.length; i++) {
    arrayWord.push(word[i]);
  }
}

function leftMove(word) {
  if (howMany > 0) {
    word.push(word[0]);
    word.shift();
    howMany--;
  } else if (howMany < 0) {
    word.unshift(word[word.length - 1]);
    word.pop;
    howMany++;
  }

  if (howMany != 0) leftMove();
}

function rightMove(word) {
  if (howMany < 0) {
    word.push(word[0]);
    word.shift();
    howMany++;
  } else if (howMany > 0) {
    word.unshift(word[word.length - 1]);
    word.pop;
    howMany--;
  }
  rightMove();
}

function makeWordMove(word) {
  if (direction == "l" || "L") leftMove(word);
  if (direction == "r" || "R") rightMove(word);
}

function checkUserControl(input) {
  let useable = ["l", "r", "L", "R"];
  direction = input[0];
  if (!useable.includes(direction)) {
    alert("입력값에 문제가 있습니다.");
    return;
  }
  howMany = +input.slice(1, input.length);
}

function onClickEvent(event) {
  const userWord = $input.value;
  if (checkWord(userWord)) return;

  wordChange($wordZone.textContent, $input.value);
}

$button.addEventListener("click", onClickEvent);

document.body.append($wordZone, $input, $button);
