import React, { useState } from "react";
import "./SequencerCellLoop.css";
import { timeStampArray } from "./helpers";

function SequencerCellLoop({ displayTime, dispatch, soundTarget, loopLength }) {
  const [isActive, setIsActive] = useState(false);

  const clickHandler = () => {
    let updatedActiveStatus = !isActive;
    setIsActive(updatedActiveStatus);
    if (updatedActiveStatus) {
      dispatch({
        type: "add",
        payload: {
          timeStamp: "0:0:0",
          soundTarget: soundTarget,
          type: "loop",
        },
      });
    } else if (!updatedActiveStatus) {
      dispatch({
        type: "remove",
        payload: { timeStamp: "0:0:0", soundTarget: soundTarget },
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

export default SequencerCellLoop;
