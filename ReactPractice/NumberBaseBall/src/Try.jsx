import React, { Component } from "react";

export class Try extends Component {
  render() {
    return <li key={this.props.triedData}>{this.props.triedData}</li>;
  }
}
