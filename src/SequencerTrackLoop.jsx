import React from "react";
import SequencerCellLoop from "./SequencerCellLoop";

function SequencerTrackLoop({
  dispatch,
  soundTarget,
  displayTime,
  loopLength,
}) {
  return (
    <div style={{ display: "flex" }}>
      {loopLength === "1m" && (
        <SequencerCellLoop
          displayTime={displayTime}
          dispatch={dispatch}
          soundTarget={0}
          loopLength={loopLength}
        />
      )}
    </div>
  );
}

export default SequencerTrackLoop;
