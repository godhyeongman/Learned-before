const $rspZone = document.createElement("div");
const $userZone = document.createElement("div");
const $rock = document.createElement("button");
const $scissor = document.createElement("button");
const $paper = document.createElement("button");
const $scoreZone = document.createElement("div");
const IMG_URL = "./rsp.png";

$rock.innerText = "바위";
$scissor.innerText = "가위";
$paper.innerText = "보";
$userZone.append($rock, $scissor, $paper);

$rspZone.style.height = "200px";
$rspZone.style.width = "142px";
$rspZone.style.background = `url(${IMG_URL}) 0 0`;
$rspZone.style.backgroundSize = "auto 200px";

const rspPosition = {
  rock: "-220px",
  scissor: "0px",
  paper: "-440px",
};

const rspScoreTable = {
  rock: 0,
  scissor: 1,
  paper: 2,
};

let hand = "rock";
function changeHand() {
  if (hand == "rock") {
    hand = "scissor";
  } else if (hand == "scissor") {
    hand = "paper";
  } else if (hand == "paper") {
    hand = "rock";
  }
  $rspZone.style.background = `url(${IMG_URL}) ${rspPosition[hand]} 0`;
  $rspZone.style.backgroundSize = "auto 200px";
}

let handChangeInterval = setInterval(changeHand, 100);

const stopHandWorking = () => {
  setTimeout(() => {
    clearInterval(handChangeInterval);
    handChangeInterval = setInterval(changeHand, 100);
    clickBlock = false;
  }, 1000);
};

let stack = 0;
const checkWinOrLose = (event) => {
  let userChoice =
    event.target.innerText == "바위"
      ? "rock"
      : event.target.innerText === "가위"
      ? "scissor"
      : "paper";

  let battleScore = rspScoreTable[userChoice] - rspScoreTable[hand];
  console.log(userChoice, battleScore, hand);
  if (battleScore == 0) {
    $scoreZone.textContent = `무승부 점수: ${stack}`;
  } else if ([2, -1].includes(battleScore)) {
    stack++;
    $scoreZone.textContent = `승리 점수: ${stack}`;
  } else if ([-2, 1].includes(battleScore)) {
    stack--;
    $scoreZone.textContent = `패배 점수: ${stack}`;
  }
};

let clickBlock = false;
const onclickEvent = (event) => {
  if (clickBlock) return;
  clickBlock = true;
  clearInterval(handChangeInterval);
  stopHandWorking();
  checkWinOrLose(event);
  if (stack >= 2) {
    $scoreZone.textContent = "승리 게임을 멈춥니다.";
    $userZone.removeEventListener("click", onclickEvent);
  } else if (stack <= -2) {
    $scoreZone.textContent = "패배 게임을 멈춥니다.";
    clearInterval(handChangeInterval);
    $userZone.removeEventListener("click", onclickEvent);
  }
};

$userZone.addEventListener("click", onclickEvent);
document.body.append($rspZone, $userZone, $scoreZone);
