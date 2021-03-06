import React, { useEffect, useReducer } from "react";
import pianoLoop1 from "../../assets/sounds/pianoLoop1.wav";
import pianoLoop2 from "../../assets/sounds/pianoLoop2.wav";
import pianoLoop3 from "../../assets/sounds/pianoLoop3.wav";
import pianoLoop4 from "../../assets/sounds/pianoLoop4.wav";
import useDynamicPlayers from "../../hooks/useDynamicPlayers";
import SeqTrackLoop from "../../components/SeqTrackLoop";
import "./PianoLoop.css";
import { seqRecReducer } from "../../reducers/seqRecReducer";

const samples = [pianoLoop1, pianoLoop2, pianoLoop3, pianoLoop4];

function PianoLoop({ currentBeat }) {
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
            <h5>{`pianoLoop${i + 1}`}</h5>
            <div className="presetTrack__seq">
              <SeqTrackLoop
                loopLength={"1/2m"}
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

export default PianoLoop;
