import React, { useState, useContext, useEffect } from "react";
import "./SeqCellLoopHalfm.css";
import { timeStampArray, calcLoopTimeStamps } from "../helpers";
import { seqContext } from "../pages/Donut";

function SeqCellLoopHalfm({
  player,
  soundLocation,
  presetId,
  loopLength,
  timeStamp,
  loopPosition,
}) {
  const {
    bpm,
    displayTime,
    seqMapState,
    seqMapDispatch,
    seqRecDispatch,
  } = useContext(seqContext);
  const [isActive, setIsActive] = useState(false);

  const clickHandler = () => {
    let updatedActiveStatus = !isActive;
    setIsActive(updatedActiveStatus);
    if (updatedActiveStatus) {
      seqRecDispatch({
        type: "add",
        payload: {
          presetId: presetId,
          soundLocation: soundLocation,
          timeStamp: timeStamp,
        },
      });
    } else if (!updatedActiveStatus) {
      seqRecDispatch({
        type: "remove",
        payload: {
          presetId: presetId,
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

  useEffect(() => {
    if (seqMapState[presetId][soundLocation]) {
      player.start();
      seqMapDispatch({
        type: "deactivate",
        payload: { presetId: presetId, soundLocation: soundLocation },
      });
    }
  }, [seqMapState[presetId][soundLocation]]);

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
