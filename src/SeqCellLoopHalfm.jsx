import React, { useState } from "react";
import "./SeqCellLoopHalfm.css";
import { timeStampArray, calcLoopTimeStamps } from "./helpers";

function SeqCellLoopHalfm({
  displayTime,
  dispatch,
  soundTarget,
  timeStamp,
  loopPosition,
}) {
  const [isActive, setIsActive] = useState(false);
  const loopLength = "1/2m";

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

  const timeStamps = calcLoopTimeStamps(
    timeStampArray,
    loopLength,
    loopPosition
  );
  return (
    <>
      {timeStamps.includes(displayTime) && isActive && (
        <div
          className="seqLoopCell__half__playing__active"
          onClick={clickHandler}
        ></div>
      )}
      {timeStamps.includes(displayTime) && !isActive && (
        <div
          className="seqLoopCell__half__playing__inactive"
          onClick={clickHandler}
        ></div>
      )}
      {!timeStamps.includes(displayTime) && isActive && (
        <div
          className="seqLoopCell__half__notPlaying__active"
          onClick={clickHandler}
        ></div>
      )}
      {!timeStamps.includes(displayTime) && !isActive && (
        <div
          className="seqLoopCell__half__notPlaying__inactive"
          onClick={clickHandler}
        ></div>
      )}
    </>
  );
}

export default SeqCellLoopHalfm;
