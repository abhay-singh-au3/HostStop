import React from "react";

export default function ClickedResult(props) {
  return <div>{props.match.params.id}</div>;
}
