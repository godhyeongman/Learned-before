const $input = document.createElement("input");
const $button = document.createElement("button");
const $form = document.createElement("form");
const $SBOzone = document.createElement("div");

const numberScope = [];
const numbers = [];
const answer = [];
const userTry = [];

for (let i = 1; i < 10; i++) {
  numberScope.push(i);
  numbers.push(i);
} // 1 부터 9 까지의 숫자 범위 생성

for (let i = 0; i < 3; i++) {
  const randomNum = Math.floor(Math.random() * numberScope.length);
  const forPush = numberScope.splice(randomNum, 1);
  answer.push(forPush[0]);
} // 랜덤한 수를 뽑아 숫자범위 배열에서 뺴내 answer에 추가

const checkInputRule = (userInput) => {
  if (userInput.length != 3) {
    alert("3글자만 입력가능합니다.");
    return true;
  } // 3글자가 맞는지 검사

  for (let i = 0; i < userInput.length; i++) {
    if (!numbers.includes(+userInput[i])) {
      alert("잘못된 답을 입력하셧습니다.");
      return true;
    }
  } // 문자가 포함 되어있는지 검사
};

const checkHomerun = () => {
  const homerunBoard = document.createElement("div");
  homerunBoard.textContent = "홈런입니다. 승리하셨습니다.";
  document.body.append(homerunBoard);
  $form.removeEventListener("submit", onSubmitEvent);
  // form태그 이벤트 삭제 (삭제후 클릭시 submit 기본동작으로 인해 페이지가 새로고침됨)
  return true; // 홈런
};

const returnScore = (userInput) => {
  let strikeCount = 0;
  let ballCount = 0;
  let outCount = 0;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] == +userInput[i]) {
      strikeCount++;
      continue;
    } //스트라이크 일때

    if (answer.includes(+userInput[i])) {
      ballCount++;
    }
  } //스트라이크 일때

  if (strikeCount == 3) {
    checkHomerun();
    return;
  } // 홈런일경우 홈런 함수 실행

  if (ballCount == 0 && strikeCount == 0) {
    outCount++;
  }

  /* 비교후 결과를 화면에 송출해주는 코드*/
  const SBOboard = document.createElement("div");
  SBOboard.textContent = `입력값: ${userInput}/ 스트라이크: ${strikeCount}, 볼: ${ballCount}, 아웃: ${outCount} 남은 횟수: ${
    10 - userTry.length
  }`;
  document.body.append(SBOboard);
};

const blockReAnswer = (userInput) => {
  if (userTry.includes(userInput)) {
    alert("이미 시도한 숫자입니다.");
    return true;
  }
};

const checkLose = () => {
  if (userTry.length > 9) {
    const LoserBoard = document.createElement("div");
    LoserBoard.textContent = "시도횟수가 10번이 넘어 패배 했습니다.";
    document.body.append(LoserBoard);
    return true;
  }
};

const checkSameNumber = (userInput) => {
  if (new Set(userInput).size != 3) {
    alert("중복된 숫자를 입력하셨습니다.");
    return true;
  }
}; // 중복된 숫자가 있는경우 block !! new Set() 매서드는 몰라서 정답봄... .length 가 아닌 .size를 써야함

onSubmitEvent = (event) => {
  event.preventDefault(); // form 태그가 submit 되면 다시고침 되는 작동을 차단
  const userInput = $input.value;
  if (blockReAnswer(userInput)) return;
  if (checkLose()) return; // 시도 횟수가 10회 이상일경우 작동안함
  if (checkInputRule(userInput)) return; // 유저 인풋값이 룰에 어긋날 경우 return
  if (checkSameNumber(userInput)) return; // 중복된 숫자가 있을경우  return
  userTry.push(userInput);
  returnScore(userInput); // SBO을 카운트 및 화면 송출해주는 함수, 홈런일 경우 승리임을 알리고 이벤트 삭제
  $input.value = "";
};

$form.addEventListener("submit", onSubmitEvent);

$input.style.height = "18px";
$button.textContent = "입력";
$button.style.marginLeft = "7px";

$form.append($input, $button);
document.body.append($form);
