import React from "react";
import SequencerCellLoop1m from "./SequencerCellLoop1m";

function SequencerTrackLoop({
  dispatch,
  soundTarget,
  displayTime,
  loopLength,
}) {
  const timeStampDictionary = [
    "0:0:0",
    ["0:0:0", "2:0:0"],
    ["0:0:0", "1:0:0", "2:0:0", "3:0:0"],
  ];
  return (
    <div style={{ display: "flex" }}>
      {loopLength === "1m" && (
        <SequencerCellLoop1m
          displayTime={displayTime}
          dispatch={dispatch}
          soundTarget={0}
          loopLength={loopLength}
          timeStamp={timeStampDictionary[0]}
          loopPosition={0}
        />
      )}
    </div>
  );
}

export default SequencerTrackLoop;
