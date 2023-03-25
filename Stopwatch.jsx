import React from "react";
import { useStopwatch } from "react-timer-hook";
import PropTypes from "prop-types";
import crowdCheer from "./sounds/crowd_cheer.wav";

export default function Stopwatch({ win, throwNumber, bestResult }) {
  const [bestResultState, setBestResultState] = bestResult;
  const { seconds, minutes, pause, reset } = useStopwatch({
    autoStart: true,
  });

  function makeDoubleDigits(number) {
    let twoDigitNumber;
    if (number < 10) {
      twoDigitNumber = `0${number}`;
    }
    return twoDigitNumber;
  }

  function updateBestResult(numberOfThows, oldResult, setter) {
    const time = seconds + minutes * 60;
    if (time < oldResult.time) {
      setter({ time, numberOfThows });
    }
  }

  React.useEffect(() => {
    if (win) {
      pause();

      const winSound = new Audio(crowdCheer);
      winSound.play();

      updateBestResult(throwNumber, bestResultState, setBestResultState);
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
  bestResult: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        bestResultState: PropTypes.shape({
          time: PropTypes.number.isRequired,
          throwNumber: PropTypes.number.isRequired,
        }),
        setBestResultState: PropTypes.func.isRequired,
      }),
      PropTypes.func.isRequired,
    ])
  ).isRequired,
};
