import React, { useState } from "react";

function SequencerCell({ timeStamp, displayTime, dispatch, soundTarget }) {
  const [isActive, setIsActive] = useState(false);
  const checkLocation = () => {
    if (
      timeStamp === "0:0:0" ||
      timeStamp === "1:0:0" ||
      timeStamp === "2:0:0" ||
      timeStamp === "3:0:0"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const clickHandler = () => {
    let updatedActiveStatus = !isActive;
    setIsActive(updatedActiveStatus);
    if (updatedActiveStatus) {
      dispatch({
        type: "add",
        payload: { timeStamp: timeStamp, soundTarget: soundTarget },
      });
    } else if (!updatedActiveStatus) {
      dispatch({
        type: "remove",
        payload: { timeStamp: timeStamp, soundTarget: soundTarget },
      });
    }
  };
  if (timeStamp === displayTime && isActive) {
    return (
      <div className="seqCell__playing__active" onClick={clickHandler}></div>
    );
  }
  if (timeStamp === displayTime && !isActive) {
    return (
      <div className="seqCell__playing__inactive" onClick={clickHandler}></div>
    );
  }
  if (timeStamp != displayTime && isActive) {
    return (
      <div className="seqCell__notPlaying__active" onClick={clickHandler}></div>
    );
  }
  if (timeStamp != displayTime && isActive) {
    return (
      <div
        className="seqCell__notPlaying__inactive"
        onClick={clickHandler}
      ></div>
    );
  }
}

export default SequencerCell;
