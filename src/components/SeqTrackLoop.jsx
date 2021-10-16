import React, { useContext } from "react";
import SeqCellLoop1m from "./SeqCellLoop1m";
import SeqCellLoopHalfm from "./SeqCellLoopHalfm";
import { seqContext } from "../pages/Donut";

function SeqTrackLoop({ loopLength, player, soundLocation, presetId }) {
  const {
    bpm,
    displayTime,
    currentBeat,
    seqMapState,
    seqMapDispatch,
    seqRecDispatch,
  } = useContext(seqContext);
  const timeStampDictionary = [
    "0:0:0",
    ["0:0:0", "2:0:0"],
    ["0:0:0", "1:0:0", "2:0:0", "3:0:0"],
  ];
  return (
    <>
      {loopLength === "1m" && (
        <SeqCellLoop1m
          displayTime={displayTime}
          recDispatch={seqRecDispatch}
          mapDispatch={seqMapDispatch}
          soundTarget={0}
          loopLength={loopLength}
          timeStamp={timeStampDictionary[0]}
          loopPosition={0}
        />
      )}
      {loopLength === "1/2m" &&
        timeStampDictionary[1].map((_ts, i) => (
          <SeqCellLoopHalfm
            player={player}
            soundLocation={soundLocation}
            presetId={presetId}
            loopLength={"1/2m"}
            timeStamp={_ts}
            loopPosition={i}
          />
        ))}
    </>
  );
}

export default SeqTrackLoop;
