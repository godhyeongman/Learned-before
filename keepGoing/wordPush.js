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
    return true;
  }
}

let direction = "";
let howMany = 0;
const arrayWord = [];
function wordChange(word) {
  checkUserControl(direction);
  MakeWordArray(word);
  makeWordMove();
}

function MakeWordArray(word) {
  for (let i = 0; i < word.length; i++) {
    arrayWord.push(word[i]);
  }
  console.log(arrayWord);
}

function leftMove() {
  if (howMany > 0) {
    arrayWord.push(arrayWord[0]);
    arrayWord.shift();
    howMany--;
  } else if (howMany < 0) {
    arrayWord.unshift(arrayWord[arrayWord.length - 1]);
    arrayWord.pop();
    howMany++;
  }

  if (howMany != 0) {
    leftMove();
  }
  if (howMany == 0) {
    arrayWord.join("");
    $wordZone.textContent = arrayWord.join("");
  }
}

function rightMove() {
  if (howMany < 0) {
    arrayWord.push(arrayWord[0]);
    arrayWord.shift();
    howMany++;
  } else if (howMany > 0) {
    arrayWord.unshift(arrayWord[arrayWord.length - 1]);
    arrayWord.pop();
    howMany--;
  }
  console.log(howMany);
  if (howMany != 0) {
    rightMove();
  }
  if (howMany == 0) {
    $wordZone.textContent = arrayWord.join("");
  }
}

function makeWordMove() {
  if (direction == "l" || direction == "L") leftMove();
  if (direction == "r" || direction == "R") rightMove();
}

function checkUserControl() {
  const input = $input.value;
  let useable = ["l", "r", "L", "R"];
  direction = input.slice(0, 1);

  if (!useable.includes(direction)) {
    alert("입력값에 문제가 있습니다.");
    return;
  }
  howMany = +input.slice(1, input.length);
  console.log(input);
}

function onClickEvent(event) {
  const userWord = $input.value;
  if (checkWord(userWord)) return;

  wordChange($wordZone.textContent);
}

$button.addEventListener("click", onClickEvent);

document.body.append($wordZone, $input, $button);
// 만들기는 완성 더넣을 기능들
// 1. 원하는 방향 전환후 다시 누르면 전에 뱡향 바꾼 단어는 삭제하기
// 2. 함수 길이가 긴부분들 줄여보기
// 3. 에러 때매 잠시 빼둔 젠열변수 다시 함수안에 넣기
