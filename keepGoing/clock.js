const $timeZone = document.createElement("div");
const $dateZone = document.createElement("div");

let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();
let days = new Date().getDate();
let month = new Date().getUTCMonth();
let years = new Date().getFullYear();

setInterval(() => {
  seconds++;
  $dateZone.textContent = `${years}년 ${month + 1}월 ${days}일`;
  $timeZone.textContent = `${hours}시 ${minutes}분 ${seconds}초`;
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  } else if (minutes >= 60) {
    hours++;
    minutes = 0;
  } else if (hours > 24) {
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
}, 1);

document.body.append($dateZone);
document.body.append($timeZone);
