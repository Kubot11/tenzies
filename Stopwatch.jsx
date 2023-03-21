import React from "react";
import { useStopwatch } from "react-timer-hook";

export default function Stopwatch(props) {
  const { seconds, minutes, pause, reset } = useStopwatch({
    autoStart: true,
  });

  function makeDoubleDigits(number) {
    if (number < 10) {
      number = `0${number}`;
    }
    return number;
  }

  function updateBestResult(throwNumber, oldResult, setter) {
    const time = seconds + minutes * 60;
    if (time < oldResult.time) {
      setter({ time, throwNumber });
    }
  }

  React.useEffect(() => {
    if (props.win) {
      pause();

      const winSound = new Audio("./sounds/crowd_cheer.wav");
      winSound.play();

      updateBestResult(
        props.throwNumber,
        props.bestResult[0],
        props.bestResult[1]
      );
    } else {
      reset();
    }
  }, [props.win]);

  return (
    <div>
      <span>{makeDoubleDigits(minutes)}</span>:
      <span>{makeDoubleDigits(seconds)}</span>
    </div>
  );
}
