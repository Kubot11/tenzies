import React from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Die from "./Die";
import Stopwatch from "./Stopwatch";
import heroImg from "./heroImage.jpg";
import diceRollSound from "./sounds/dice-roll-on-wood.mp3";
import buttonSound from "./sounds/button.mp3";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [startGame, setStartGame] = React.useState(false);
  const [bestResult, setBestResult] = React.useState({
    time: 999,
    throwNumber: 0,
  });

  function rollDice() {
    const diceRoll = new Audio(diceRollSound);
    diceRoll.play();

    setDice((oldDiceArr) => {
      let isHeld = [];
      const allNewDiceArr = allNewDice();
      const updatedDiceArr = [];
      isHeld = oldDiceArr.map((die) => !!die.isHeld);

      for (let i = 0; i < 10; i++) {
        if (isHeld[i]) {
          updatedDiceArr[i] = oldDiceArr[i];
        } else {
          updatedDiceArr[i] = allNewDiceArr[i];
        }

        setShake(true);
      }

      return updatedDiceArr;
    });
    setRolls((count) => count + 1);
  }

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice[i] = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    }
    return newDice;
  }

  function holdDice(id) {
    const btn = new Audio(buttonSound);
    btn.play();

    setDice((old) => {
      const updated = old.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          newItem.isHeld = !newItem.isHeld;
        }
        return newItem;
      });
      return updated;
    });
  }

  function newGame() {
    const btn = new Audio(buttonSound);
    btn.play();

    setDice(allNewDice());
    setTenzies(false);
    setRolls(0);
    setStartGame(true);
  }

  function secondsToTime(time) {
    let minutes = Math.trunc(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  // CHECK WINNING CONDITIONS
  React.useEffect(() => {
    const testArrHeld = dice.filter(
      (die) => die.isHeld && die.value === dice[0].value
    );
    if (testArrHeld.length === dice.length) {
      setTenzies(true);
    }
  }, [dice]);

  // SHAKING
  React.useEffect(() => {
    const elements = document.querySelectorAll(".dice-container > *");
    const filteredElements = Array.prototype.filter.call(
      elements,
      (element, index) => !dice[index].isHeld
    );

    Array.from(filteredElements).forEach((element) => {
      element.classList.add("shake");
    });

    setShake(false);
  }, [shake]);

  return (
    <main>
      {/* TITLE */}
      {tenzies && <Confetti />}
      <h1 className="title">{tenzies ? "Gratulacje" : "Tenzies"}</h1>
      {/* BEST REUSLT */}
      {tenzies && (
        <div className="best-result-container">
          <p>
            Najlepszy czas:
            {secondsToTime(bestResult.time)}
          </p>
          <p>
            Liczba rzutów:
            {bestResult.throwNumber}
          </p>
        </div>
      )}

      {startGame ? (
        <>
          {/* GAME SCREEN */}
          <div className="dice-container">
            {dice.map((item) => (
              <Die
                value={item.value}
                key={item.id}
                holdDice={() => holdDice(item.id)}
                id={item.id}
                isHeld={item.isHeld}
              />
            ))}
          </div>
          <div className={`info-container ${tenzies ? "corect-margin" : ""}`}>
            <div className="stopwatch">
              Czas gry:&nbsp;
              <Stopwatch
                win={tenzies}
                throwNumber={rolls}
                setBestResult={setBestResult}
              />
            </div>
            <div className="throw-counter">
              Liczba rzutów:
              {rolls}
            </div>
          </div>
          <button
            type="button"
            className="btn"
            onClick={tenzies ? newGame : rollDice}
          >
            {tenzies ? "Nowa gra" : "Rzuć kośćmi"}
          </button>
        </>
      ) : (
        <>
          {/* START SCREEN */}
          <img alt="dice" className="hero-image" src={heroImg} />
          <p className="instruction">
            Rzucaj kośćmi aż na wszystkich będzie taka sama liczba oczek.
            Kliknij na kostkę aby wyłączyć ją z rzutu.
          </p>
          <button type="button" className="btn" onClick={newGame}>
            Zacznij grę
          </button>
        </>
      )}
    </main>
  );
}
