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

function checkInput() {
  if ($userNum.length < 4) {
    $userNum.value = "";
    alert("4자리수 초과 입력금지");
    return false;
  } else if ($userNum.length > 3) {
    alert("4자리수 미만입력금지");
  }
  return false;
}

const onClickEvent = () => {
  if (!checkInput()) {
    return;
  }

  let ballcount = 0;
  let strikecount = 0;
  let outcount = 0;

  for (let i = 0; i < computerNum.length + 1; i++) {
    let checkIndex = computerNum.indexOf($userNum[i]);
    if (checkIndex > -1) {
      if (checkIndex === i) {
        strikecount++;
      } else {
        ballcount++;
      }
    }
  }

  $HSB.append(
    `${strikecount}: 스트라이크 ${ballcount}: 볼 ${outcount}: 아웃`,
    document.createElement("br")
  );
  $userNum.value = "";
};
$userBtn.addEventListener("click", onClickEvent);
