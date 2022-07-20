import React, { Component } from "react";

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

export class Baseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(9),
    tries: [],
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런",
        tries: [
          ...this.state.tries,
          { try: this.state.value, result: "홈런 !" },
        ],
      });
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `실패 정답: ${answer.join(",")}`,
        });

        alert("다시 시작");
        this.setState({
          value: "",
          answer: getNumbers(9),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike++;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.setState({
          tries: [
            ...this.state.tries,
            {
              try: this.state.value,
              result: `${strike} 스트라이크, ${ball} 볼`,
            },
          ],
        });
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    console.log(Try);
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div> 시도: {this.state.tries.length}</div>
        <ul>
          {fx.curryMap(
            (v) => (
              <Try triedData={v} />
            ),
            this.state.tries
          )}
        </ul>
      </>
    );
  }
}
