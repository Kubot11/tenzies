import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
/**
 * Challenge: Allow the user to play a new game when the
 * button is clicked and they've already won
 */

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  function rollDice() {
    setDice((oldDiceArr) => {
      const allNewDiceArr = allNewDice();
      const updatedDiceArr = [];
      const isHeld = oldDiceArr.map((die) => {
        return die.isHeld ? true : false;
      });

      for (let i = 0; i < 10; i++) {
        if (isHeld[i]) {
          updatedDiceArr[i] = oldDiceArr[i];
        } else {
          updatedDiceArr[i] = allNewDiceArr[i];
        }
      }
      return updatedDiceArr;
    });
  }

  function allNewDice() {
    const dice = [];

    for (let i = 0; i < 10; i++) {
      dice[i] = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    }

    return dice;
  }

  function holdDice(id) {
    setDice((old) => {
      const updated = old.map((item) => {
        if (item.id === id) {
          item.isHeld = !item.isHeld;
        }
        return item;
      });
      return updated;
    });
  }

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
  }
  React.useEffect(() => {
    const testArrHeld = dice.filter(
      (die) => die.isHeld && die.value === dice[0].value
    );
    if (testArrHeld.length === dice.length) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Rzucaj kośćmi aż wszystkie będą takie same. Kliknij kostkę aby zachować
        jej wartość i nie wliczać jej do kolejnego rzutu
      </p>
      <div className="container">
        {dice.map((item) => (
          <Die
            value={item.value}
            key={item.id}
            holdDice={holdDice}
            id={item.id}
            isHeld={item.isHeld}
          />
        ))}
      </div>
      <button className="btn" onClick={tenzies ? newGame :rollDice}>
        {tenzies ? "Nowa gra" : "Rzuć kośćmi"}
      </button>
    </main>
  );
}
