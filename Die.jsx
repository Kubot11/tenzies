import React from "react";

export default function Die(props) {
  return (
    <div
      onClick={() => props.holdDice(props.id)}
      className={"die" + (props.isHeld ? " held" : "")}
    >
      {props.value}
    </div>
  );
}
