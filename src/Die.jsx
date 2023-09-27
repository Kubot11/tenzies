import React from "react";
import PropTypes from "prop-types";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "./dice-render";

export default function Die({ value, holdDice, isHeld, id }) {
  switch (value) {
    case 1:
      return <Dice1 holdDice={holdDice} isHeld={isHeld} id={id} />;
    case 2:
      return <Dice2 holdDice={holdDice} isHeld={isHeld} id={id} />;
    case 3:
      return <Dice3 holdDice={holdDice} isHeld={isHeld} id={id} />;
    case 4:
      return <Dice4 holdDice={holdDice} isHeld={isHeld} id={id} />;
    case 5:
      return <Dice5 holdDice={holdDice} isHeld={isHeld} id={id} />;
    case 6:
      return <Dice6 holdDice={holdDice} isHeld={isHeld} id={id} />;
    default:
      throw new Error("Incorrect value");
  }
}

Die.propTypes = {
  value: PropTypes.number.isRequired,
  holdDice: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isHeld: PropTypes.bool.isRequired,
};
