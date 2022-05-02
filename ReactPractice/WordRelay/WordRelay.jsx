const React = require("react");
const { Component } = React;

export class WordRelay extends Component {
  state = {
    text: "hello, webpack",
  };

  render() {
    return <div>{this.state.text}</div>;
  }
}
