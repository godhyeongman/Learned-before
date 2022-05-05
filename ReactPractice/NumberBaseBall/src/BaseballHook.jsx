import React, { useState } from "react";

import * as fx from "./fx";

import Try from "./Try";

const L = {};

L.range = function* (list) {
  let i = -1;
  while (++i < list) {
    yield i;
  }
};

const take = (iter) => {
  const res = [];
  for (const value of iter) {
    res.push(value);
  }
  return res;
};

const getNumbers = (num) => {
  const range = L.range(num);
  const customArr = take(range);
  const res = [];

  for (let i = 0; i < 4; i++) {
    const pickedNum = customArr.splice(
      Math.floor(Math.random() * (customArr.length - i)),
      1
    )[0];

    res.push(pickedNum);
  }

  return res;
};

export const BaseballHook = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers(9));
  const [tries, setTries] = useState([]);

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (value === answer.join("")) {
      setResult("홈런");
      setTries((preveTries) => [...preveTries, { try: value, result: "홈런" }]);
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`실패 정답: ${answer.join(",")}`);
        alert("다시 시작");

        setValue("");
        setAnswer(getNumbers(9));
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }

        setTries((preveTries) => {
          [
            ...preveTries,
            { try: value, result: `${strike} 스트라이크, ${ball} 볼` },
          ];
        });
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div> 시도: {tries.length}</div>
      <ul>
        {fx.curryMap(
          (v) => (
            <Try triedData={v} />
          ),
          tries
        )}
      </ul>
    </>
  );
};
