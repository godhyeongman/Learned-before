import React, { Component } from "react";

import * as fx from "./fx";

import Try from "./Try";

const getNumbers = () => {};

export class Baseball extends Component {
    
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: ["김치", "치츠"],
  };

  onSubmitForm = () => {};

  onChangeInput = () => {};

  render() {
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
