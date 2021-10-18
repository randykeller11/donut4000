import React, { useState, useContext, useEffect } from "react";
import "./SeqCellLoopQuartm.css";
import { timeStampArray, calcLoopTimeStamps } from "../helpers";
import { seqContext } from "../pages/Donut";

function SeqCellLoopQuartm({
  soundLocation,
  loopLength,
  timeStamp,
  loopPosition,
  recDispatch,
}) {
  const { displayTime } = useContext(seqContext);
  const [isActive, setIsActive] = useState(false);

  const clickHandler = () => {
    let updatedActiveStatus = !isActive;
    setIsActive(updatedActiveStatus);
    if (updatedActiveStatus) {
      recDispatch({
        type: "add",
        payload: {
          soundLocation: soundLocation,
          timeStamp: timeStamp,
        },
      });
    } else if (!updatedActiveStatus) {
      recDispatch({
        type: "remove",
        payload: {
          soundLocation: soundLocation,
          timeStamp: timeStamp,
        },
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
          className="seqLoopCell__quart__playing__active"
          onClick={clickHandler}
        ></div>
      )}
      {timeStamps.includes(displayTime) && !isActive && (
        <div
          className="seqLoopCell__quart__playing__inactive"
          onClick={clickHandler}
        ></div>
      )}
      {!timeStamps.includes(displayTime) && isActive && (
        <div
          className="seqLoopCell__quart__notPlaying__active"
          onClick={clickHandler}
        ></div>
      )}
      {!timeStamps.includes(displayTime) && !isActive && (
        <div
          className="seqLoopCell__quart__notPlaying__inactive"
          onClick={clickHandler}
        ></div>
      )}
    </>
  );
}

export default SeqCellLoopQuartm;
