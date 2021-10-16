import React, { useState } from "react";
import "./SequencerCellLoop1m.css";
import { timeStampArray, calcLoopTimeStamps } from "./helpers";

function SequencerCellLoop1m({
  displayTime,
  dispatch,
  soundTarget,
  loopLength,
  timeStamp,
  loopPosition,
}) {
  const [isActive, setIsActive] = useState(false);

  const clickHandler = () => {
    let updatedActiveStatus = !isActive;
    setIsActive(updatedActiveStatus);
    if (updatedActiveStatus) {
      dispatch({
        type: "add",
        payload: {
          timeStamp: timeStamp,
          soundTarget: soundTarget,
          type: "loop",
        },
      });
    } else if (!updatedActiveStatus) {
      dispatch({
        type: "remove",
        payload: { timeStamp: timeStamp, soundTarget: soundTarget },
      });
    }
  };

  const timeStamps = timeStampArray;

  return (
    <>
      {timeStamps.includes(displayTime) && isActive && (
        <div
          className="seqLoopCell__playing__active"
          onClick={clickHandler}
        ></div>
      )}
      {timeStamps.includes(displayTime) && !isActive && (
        <div
          className="seqLoopCell__playing__inactive"
          onClick={clickHandler}
        ></div>
      )}
      {!timeStamps.includes(displayTime) && isActive && (
        <div
          className="seqLoopCell__notPlaying__active"
          onClick={clickHandler}
        ></div>
      )}
      {!timeStamps.includes(displayTime) && !isActive && (
        <div
          className="seqLoopCell__notPlaying__inactive"
          onClick={clickHandler}
        ></div>
      )}
    </>
  );
}

export default SequencerCellLoop1m;
