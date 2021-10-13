import React from "react";
import { timeStampArray } from "./helpers";
import SequencerCell from "./SequencerCell";

function SequencerTrack({ displayTime, dispatch, soundTarget, name }) {
  return (
    <div style={{ display: "flex" }}>
      {timeStampArray.map((timeStamp) => (
        <SequencerCell
          timeStamp={timeStamp}
          displayTime={displayTime}
          dispatch={dispatch}
          soundTarget={soundTarget}
        />
      ))}
      <h4>{name}</h4>
    </div>
  );
}

export default SequencerTrack;
