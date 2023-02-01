import React from "react";

export default function Die(props) {
  return (
    <p className= {props.isHeld ? "dice held" : "dice"} onClick={props.holdDice}>
      {props.value}
    </p>
  )
}
