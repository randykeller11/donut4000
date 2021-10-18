import React, { useEffect, useReducer } from "react";
import useDynamicPlayers from "../../hooks/useDynamicPlayers";
import drumLoop1 from "../../assets/sounds/drumLoop1.wav";
import drumLoop2 from "../../assets/sounds/drumLoop2.wav";
import drumLoop3 from "../../assets/sounds/drumLoop3.wav";
import drumLoop4 from "../../assets/sounds/drumLoop4.wav";
import "./DrumKit.css";
import { seqRecReducer } from "../../reducers/seqRecReducer";
import SeqTrackLoop from "../../components/SeqTrackLoop";

const samples = [drumLoop1, drumLoop2, drumLoop3, drumLoop4];

function DrumKit({ currentBeat }) {
  const [players, loading] = useDynamicPlayers(samples);
  const [recordings, recDispatch] = useReducer(seqRecReducer, []);
  useEffect(() => {
    recordings.forEach((recording) => {
      if (recording.timeStamp === currentBeat) {
        players[recording.soundLocation].start();
      }
    });
  }, [currentBeat]);

  return (
    <div className="preset">
      {!loading &&
        players.map((player, i) => (
          <div className="presetTrack">
            <h5>{`drumLoop${i + 1}`}</h5>
            <div className="presetTrack__seq">
              <SeqTrackLoop
                loopLength={"1/4m"}
                soundLocation={i}
                presetId={0}
                recDispatch={recDispatch}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default DrumKit;
