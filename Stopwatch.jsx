import React from "react";
import { useStopwatch } from "react-timer-hook";
import PropTypes from "prop-types";
import crowdCheer from "./sounds/crowd_cheer.wav";

export default function Stopwatch({ win, throwNumber, setBestResult }) {
  const { seconds, minutes, pause, reset } = useStopwatch({
    autoStart: true,
  });

  function makeDoubleDigits(number) {
    let twoDigitNumber;
    if (number < 10) {
      twoDigitNumber = `0${number}`;
    } else {
      twoDigitNumber = number;
    }
    return twoDigitNumber;
  }

  React.useEffect(() => {
    if (win) {
      pause();

      const winSound = new Audio(crowdCheer);
      winSound.play();

      setBestResult((results) => {
        const time = seconds + minutes * 60;
        if (results.time > time) {
          return { time, throwNumber };
        }
        return results;
      });
    } else {
      reset();
    }
  }, [win]);

  return (
    <div>
      <span>{makeDoubleDigits(minutes)}</span>:
      <span>{makeDoubleDigits(seconds)}</span>
    </div>
  );
}

Stopwatch.propTypes = {
  win: PropTypes.bool.isRequired,
  throwNumber: PropTypes.number.isRequired,
  setBestResult: PropTypes.func.isRequired,
};
