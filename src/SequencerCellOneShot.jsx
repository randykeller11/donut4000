import React, { useState } from "react";
import "./SequencerCellOneShot.css";

function SequencerCellOneShot({
  timeStamp,
  displayTime,
  dispatch,
  soundTarget,
  isMeasureEnd,
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
          type: "oneShot",
        },
      });
    } else if (!updatedActiveStatus) {
      dispatch({
        type: "remove",
        payload: { timeStamp: timeStamp, soundTarget: soundTarget },
      });
    }
  };

  return (
    <>
      {!isMeasureEnd && timeStamp === displayTime && isActive && (
        <div className="seqCell__playing__active" onClick={clickHandler}></div>
      )}
      {!isMeasureEnd && timeStamp === displayTime && !isActive && (
        <div
          className="seqCell__playing__inactive"
          onClick={clickHandler}
        ></div>
      )}
      {!isMeasureEnd && timeStamp != displayTime && isActive && (
        <div
          className="seqCell__notPlaying__active"
          onClick={clickHandler}
        ></div>
      )}
      {!isMeasureEnd && timeStamp != displayTime && !isActive && (
        <div
          className="seqCell__notPlaying__inactive"
          onClick={clickHandler}
        ></div>
      )}
      {isMeasureEnd && timeStamp === displayTime && isActive && (
        <div
          className="seqCell__ME__playing__active"
          onClick={clickHandler}
        ></div>
      )}
      {isMeasureEnd && timeStamp === displayTime && !isActive && (
        <div
          className="seqCell__ME__playing__inactive"
          onClick={clickHandler}
        ></div>
      )}
      {isMeasureEnd && timeStamp != displayTime && isActive && (
        <div
          className="seqCell__ME__notPlaying__active"
          onClick={clickHandler}
        ></div>
      )}
      {isMeasureEnd && timeStamp != displayTime && !isActive && (
        <div
          className="seqCell__ME__notPlaying__inactive"
          onClick={clickHandler}
        ></div>
      )}
    </>
  );
}

export default SequencerCellOneShot;
