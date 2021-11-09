const $input = document.createElement("input");
const $button = document.createElement("button");
const $form = document.createElement("form");
const $SBOzone = document.createElement("div");

const numberScope = [];
const numbers = [];
const answer = [];
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

const inputCompareAnswer = (userInput) => {
  if (userInput == answer) {
  }
  return; // 홈런
  let strikeCount = 0;
  let ballCount = 0;
  let outCount = 0;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] == userInput[i]) {
      strikeCount++;
      break;
    }

    if (answer.includes(userInput[i])) {
      ballCount++;
    }
  } //스트라이크 일때

  // 볼일경우
  // 아웃일경우
};

onSubmitEvent = (event) => {
  event.preventDefault(); // form 태그가 submit 되면 다시고침 되는 작동을 차단
  const userInput = event.target[0].value;
  // 만약 문제가 있다면 form태그들이 밑에 있어서인지 체크해보자

  if (checkInputRule(userInput)) return;
  inputCompareAnswer(userInput);
};

$form.addEventListener("submit", onSubmitEvent);

$input.style.height = "18px";
$button.textContent = "입력";
$button.style.marginLeft = "7px";

$form.append($input, $button);
document.body.append($form);
