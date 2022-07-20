const $timeZone = document.createElement("div");
const $dateZone = document.createElement("div");
const $stopWatchZone = document.createElement("div");
const $stopWatchButton = document.createElement("button");

$stopWatchButton.innerText = "측정";

let stopWatchIntervalID;
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();
let days = new Date().getDate();
let month = new Date().getUTCMonth();
let years = new Date().getFullYear();
let stopWatchHours = 0;
let stopWatchMinutes = 0;
let stopWatchSeconds = 0;
let stopWatchMilliSeconds = 0;

setInterval(() => {
  seconds++;
  $dateZone.textContent = `${years}년 ${month + 1}월 ${days}일`;
  $timeZone.textContent = `${hours}시 ${minutes}분 ${seconds}초`;
  if (seconds >= 60) {
    // 60초가 되면 분을 올리고 초는 0으로
    minutes++;
    seconds = 0;
  } else if (minutes >= 60) {
    // 60 분이 되면 시간을 1올리고 분을 0으로
    hours++;
    minutes = 0;
  } else if (hours > 24) {
    // 24시를 넘으면 날을 1올리고 시간을 1로 되돌림
    hours = 1;
    days++;
  } else if (month == 2) {
    if (days > 28) {
      month++;
      days = 1;
    }
  } else if (month % 2 == 1) {
    if (days > 31) {
      month++;
      days = 1;
    }
  } else if (month % 2 == 0) {
    if (days > 30) {
      month++;
      days = 1;
    }
  } else if (month > 12) {
    years++;
    month = 1;
  }
}, 1000);

const clearTimeData = () => {
  stopWatchHours = 0;
  stopWatchMinutes = 0;
  stopWatchSeconds = 0;
  stopWatchMilliSeconds = 0;
};
let clickAble = false;
const onClickButton = (event) => {
  if (clickAble) {
    clearInterval(stopWatchIntervalID);
    clearTimeData();
    clickAble = false;
    return;
  }

  clickAble = true;
  const recordTime = document.createElement("div");
  $stopWatchZone.append(recordTime);
  stopWatchIntervalID = setInterval(() => {
    recordTime.textContent = `${stopWatchMilliSeconds} 밀리초`;
    stopWatchMilliSeconds++;
    if (stopWatchMilliSeconds >= 100) {
      stopWatchMilliSeconds = 0;
      stopWatchSeconds++;
    }

    if (stopWatchSeconds > 0) {
      recordTime.textContent = `${stopWatchSeconds} 초 ${stopWatchMilliSeconds} 밀리초`;
    }

    if (stopWatchSeconds > 59) {
      stopWatchSeconds = 0;
      stopWatchMinutes++;
    }

    if (stopWatchMinutes > 0) {
      recordTime.textContent = `${stopWatchMinutes} 분 ${stopWatchSeconds} 초 ${stopWatchMilliSeconds} 밀리초`;
    }
  }, 10);
};

$stopWatchButton.addEventListener("click", onClickButton);

$stopWatchZone.append($stopWatchButton);
document.body.append($dateZone, $timeZone, $stopWatchZone);
