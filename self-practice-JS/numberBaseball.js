const $userNum = document.querySelector("#userNum");
const $HSB = document.querySelector("#HSB");
const $userBtn = document.querySelector("#userBtn");
let computerNumLenght = 4;
let baseballScope = 9;

let baseballNum = [];
for (let i = 0; i < baseballScope; i++) {
  baseballNum.push(i + 1);
}

let computerNum = [];
for (let i = 0; i < computerNumLenght; i++) {
  let randNum = Math.floor(Math.random() * (baseballNum.length - i));
  computerNum.push(baseballNum[randNum]);
  baseballNum.splice(randNum, 1);
}

const onClickEvent = () => {
  if (userNum.length > computerNumLenght || userNum.length < 3) {
    $userNum.textContent = "";
    return alert("숫자 4개를 입력해주세요");
  }

  let ballcount = 0;
  let strikecount = 0;
  let outcount = 0;

  for (let j = 0; j < computerNum.length + 1; j++) {
    if (computerNum[j] == $userNum[j]) {
      strikecount++;
    } else if (computerNum.includes($userNum[j])) {
      ballcount++;
    }
  }

  $HSB.append(
    `${strikecount}: 스트라이크 ${ballcount}: 볼 ${outcount}: 아웃`,
    document.createElement("br")
  );
  $userNum.textContent = "";
};
$userBtn.addEventListener("click", onClickEvent);
