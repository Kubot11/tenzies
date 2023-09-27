/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

// DICE RENDERING FUNCTIONS

function Dice1({ holdDice, id, isHeld }) {
  return (
    <div
      onClick={() => holdDice(id)}
      className={`first-face die${isHeld ? " held" : ""}`}
    >
      <span className="dot" />
    </div>
  );
}

Dice1.propTypes = {
  holdDice: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isHeld: PropTypes.bool.isRequired,
};

function Dice2({ holdDice, id, isHeld }) {
  return (
    <div
      onClick={() => holdDice(id)}
      className={`second-face die${isHeld ? " held" : ""}`}
    >
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}

Dice2.propTypes = {
  holdDice: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isHeld: PropTypes.bool.isRequired,
};

function Dice3({ holdDice, id, isHeld }) {
  return (
    <div
      onClick={() => holdDice(id)}
      className={`third-face die${isHeld ? " held" : ""}`}
    >
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}

Dice3.propTypes = {
  holdDice: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isHeld: PropTypes.bool.isRequired,
};

function Dice4({ holdDice, id, isHeld }) {
  return (
    <div
      onClick={() => holdDice(id)}
      className={`fourth-face die${isHeld ? " held" : ""}`}
    >
      <div className="fouth-face-row">
        <span className="dot" />
        <span className="dot" />
      </div>

      <div className="fouth-face-row">
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

Dice4.propTypes = {
  holdDice: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isHeld: PropTypes.bool.isRequired,
};

function Dice5({ holdDice, id, isHeld }) {
  return (
    <div
      onClick={() => holdDice(id)}
      className={`fifth-face die${isHeld ? " held " : ""}`}
    >
      <div className="fifth-face-row">
        <span className="dot" />
        <span className="dot" />
      </div>

      <span className="dot fifth-middle" />

      <div className="fifth-face-row">
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

Dice5.propTypes = {
  holdDice: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isHeld: PropTypes.bool.isRequired,
};

function Dice6({ holdDice, id, isHeld }) {
  return (
    <div
      onClick={() => holdDice(id)}
      className={`sixth-face die${isHeld ? " held" : ""}`}
    >
      <div className="sixth-face-row">
        <span className="dot" />
        <span className="dot" />
      </div>

      <div className="sixth-face-row">
        <span className="dot" />
        <span className="dot" />
      </div>

      <div className="sixth-face-row">
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

Dice6.propTypes = {
  holdDice: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isHeld: PropTypes.bool.isRequired,
};

export { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 };
