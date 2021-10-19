import React, { useContext } from "react";
import SeqCellLoop1m from "./SeqCellLoop1m";
import SeqCellLoopHalfm from "./SeqCellLoopHalfm";
import SeqCellLoopQuartm from "./SeqCellLoopQuartm";

function SeqTrackLoop({
  loopLength,
  soundLocation,
  recDispatch,
  trackMap,
  mapDispatch,
}) {
  const timeStampDictionary = [
    ["0:0:0", "2:0:0"],
    ["0:0:0", "1:0:0", "2:0:0", "3:0:0"],
  ];

  return (
    <>
      {loopLength === "1/2m" &&
        timeStampDictionary[0].map((_ts, i) => (
          <SeqCellLoopHalfm
            soundLocation={soundLocation}
            loopLength={"1/2m"}
            timeStamp={_ts}
            loopPosition={i}
            recDispatch={recDispatch}
            mapDispatch={mapDispatch}
          />
        ))}
      {trackMap &&
        loopLength === "1/4m" &&
        timeStampDictionary[1].map((_ts, i) => (
          <SeqCellLoopQuartm
            soundLocation={soundLocation}
            loopLength={"1/4m"}
            timeStamp={_ts}
            loopPosition={i}
            recDispatch={recDispatch}
            isActive={trackMap.map[i]}
            mapDispatch={mapDispatch}
          />
        ))}
    </>
  );
}

export default SeqTrackLoop;
