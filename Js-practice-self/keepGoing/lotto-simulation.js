const $answerZone = document.createElement("div");
const $userZone = document.createElement("form");
const $input = document.createElement("input");
const $button = document.createElement("button");
const $userNum = document.createElement("div");

const numScope = Array(45)
  .fill()
  .map((el, idx) => idx + 1);
const randomNum = [];
const answer = [];
const userAnswer = [];

for (let i = 0; i < 45; i++) {
  const random = Math.floor(Math.random() * numScope.length);
  const forPush = numScope.splice(random, 1);
  randomNum.push(forPush[0]);
}

for (let i = 0; i < 7; i++) {
  answer.push(randomNum[i]);
}
answer.sort((a, b) => a - b);

const checkuserinput = (userInput) => {
  const numbers = Array(45)
    .fill()
    .map((el, idx) => idx + 1);
  if (!numbers.includes(+userInput)) {
    alert("1부터 45중에 숫자를 입력해주세요");
    return true; // 유저 입력값이 1부터 45 가 아니면 식 종료
  }

  if (+userInput <= +userAnswer[userAnswer.length - 1]) {
    alert("이전 입력값보다 더큰값을 입력하세요");
    return true;
  }
  if (userAnswer.length == 7) {
    alert("이미 모든 값을 입력했습니다. 곧있으면 정답이 공개 됩니다.");
    return true;
  }
};

const makeUserBall = (userInput) => {
  const balls = document.createElement("div");
  balls.textContent = userInput;
  balls.className = "ball";
  makeBallColor(balls, userInput);
  $answerZone.append(balls);
};

const makeBallColor = (balls, userInput) => {
  if (+userInput > 0 && 17 > +userInput) {
    balls.style.backgroundColor = "red";
  } else if (+userInput >= 17 && 27 > +userInput) {
    balls.style.backgroundColor = "aqua";
  } else if (+userInput >= 27 && 39 > +userInput) {
    balls.style.backgroundColor = "lime";
  } else if (+userInput >= 39) {
    balls.style.backgroundColor = "gold";
  }
};

const showAnswer = () => {
  const result = document.createElement("div");
  result.textContent = "결과는: ";
  $userNum.append(result);
  for (let i = 0; i < answer.length; i++) {
    setTimeout(
      () => {
        const AnswerBall = document.createElement("div");
        AnswerBall.textContent = answer[i];
        AnswerBall.className = "ball";
        makeBallColor(AnswerBall, answer[i]);
        result.append(AnswerBall);
      },
      1000 + 1000 * i,
      [i]
    );
  }
};

compareAnswer = () => {
  let winCount = 0;

  setTimeout(() => {
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] == +userAnswer[i]) {
        winCount++;
      }
    }
    const scoreBoard = document.createElement("div");
    checkScore(winCount, scoreBoard);
    document.body.append(scoreBoard);
  }, answer.length * 1000);
};

const checkScore = (winCount, scoreBoard) => {
  if (winCount > 4) {
    scoreBoard.textContent = "3등입니다.";
  } else if (winCount > 5) {
    scoreBoard.textContent = "2등입니다.";
  } else if (winCount == 7) {
    scoreBoard.textContent = "축하합니다. 로또입니다.";
  } else if (winCount < 5) {
    scoreBoard.textContent = "당첨결과 없음!";
  }
};

const onclickSubmit = (event) => {
  event.preventDefault();
  const userInput = $input.value;

  if (checkuserinput(userInput)) return; // 유저 입력값이 문제가 있으면 리턴
  userAnswer.push(userInput); // 유저 입력값에 문제가 없다면 유저정답에 저장
  makeUserBall(userInput); // 문제 없는 유저 입력 값 정답에 저장

  if (userAnswer.length == 7) {
    showAnswer(userInput);
    compareAnswer();
  }
};

$userZone.addEventListener("submit", onclickSubmit);

$input.style.height = "18px";
$button.style.marginLeft = "6px";
$button.textContent = "입력";
$userZone.append($input, $button);

document.body.append($answerZone, $userZone, $userNum);
