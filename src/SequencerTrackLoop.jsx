import React from "react";
import SequencerCellLoop1m from "./SequencerCellLoop1m";
import SeqCellLoopHalfm from "./SeqCellLoopHalfm";

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
      {loopLength === "1/2m" &&
        timeStampDictionary[1].map((_ts, i) => (
          <SeqCellLoopHalfm
            displayTime={displayTime}
            dispatch={dispatch}
            soundTarget={soundTarget}
            loopLength={loopLength}
            timeStamp={_ts}
            loopPosition={i}
          />
        ))}
    </div>
  );
}

export default SequencerTrackLoop;
