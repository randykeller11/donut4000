import React from "react";
import { timeStampArray } from "./helpers";
import SequencerCellOneShot from "./SequencerCellOneShot";

function SequencerTrackOneShot({ displayTime, dispatch, soundTarget, name }) {
  const checkIfMeasureEnd = (_ts) => {
    if (_ts === "0:0:0") {
      return true;
    } else if (_ts === "1:0:0") {
      return true;
    } else if (_ts === "2:0:0") {
      return true;
    } else if (_ts === "3:0:0") {
      return true;
    } else return false;
  };
  return (
    <div style={{ display: "flex" }}>
      {timeStampArray.map((timeStamp) => {
        if (checkIfMeasureEnd(timeStamp)) {
          return (
            <SequencerCellOneShot
              timeStamp={timeStamp}
              displayTime={displayTime}
              dispatch={dispatch}
              soundTarget={soundTarget}
              isMeasureEnd={true}
            />
          );
        } else {
          return (
            <SequencerCellOneShot
              timeStamp={timeStamp}
              displayTime={displayTime}
              dispatch={dispatch}
              soundTarget={soundTarget}
              isMeasureEnd={false}
            />
          );
        }
      })}
    </div>
  );
}

export default SequencerTrackOneShot;
