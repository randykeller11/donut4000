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
  isActive,
  mapDispatch,
}) {
  const { displayTime } = useContext(seqContext);

  const clickHandler = () => {
    let updatedActiveStatus = !isActive;
    mapDispatch({
      type: "activateLoop",
      payload: { soundLocation: soundLocation, measureIndex: loopPosition },
    });
    if (updatedActiveStatus) {
      recDispatch({
        type: "addLoop",
        payload: {
          soundLocation: soundLocation,
          timeStamp: timeStamp,
        },
      });
    } else if (!updatedActiveStatus) {
      mapDispatch({
        type: "deactivateLoop",
        payload: { soundLocation: soundLocation, measureIndex: loopPosition },
      });
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
