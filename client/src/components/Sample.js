import React, { Component } from "react";

export class Sample extends Component {
  componentDidMount = () => {
    console.log("mounted");
  };
  render() {
    return (
      <div>
        <h2>Hello welcome to sample</h2>
      </div>
    );
  }
}

export default Sample;
