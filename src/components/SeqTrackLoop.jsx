import React, { useContext } from "react";
import SeqCellLoop1m from "./SeqCellLoop1m";
import SeqCellLoopHalfm from "./SeqCellLoopHalfm";
import { seqContext } from "../pages/Donut";

function SeqTrackLoop({ loopLength, soundLocation, presetId, recDispatch }) {
  const { displayTime } = useContext(seqContext);
  const timeStampDictionary = [
    "0:0:0",
    ["0:0:0", "2:0:0"],
    ["0:0:0", "1:0:0", "2:0:0", "3:0:0"],
  ];
  return (
    <>
      {loopLength === "1/2m" &&
        timeStampDictionary[1].map((_ts, i) => (
          <SeqCellLoopHalfm
            soundLocation={soundLocation}
            loopLength={"1/2m"}
            timeStamp={_ts}
            loopPosition={i}
            recDispatch={recDispatch}
          />
        ))}
    </>
  );
}

export default SeqTrackLoop;
