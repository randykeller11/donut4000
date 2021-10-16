import React, { useEffect } from "react";
import pianoLoop1 from "../../assets/sounds/pianoLoop1.wav";
import pianoLoop2 from "../../assets/sounds/pianoLoop2.wav";
import pianoLoop3 from "../../assets/sounds/pianoLoop3.wav";
import pianoLoop4 from "../../assets/sounds/pianoLoop4.wav";
import useDynamicPlayers from "../../hooks/useDynamicPlayers";
import SeqTrackLoop from "../../components/SeqTrackLoop";
import "./PianoLoop.css";

const samples = [pianoLoop1, pianoLoop2, pianoLoop3, pianoLoop4];

function PianoLoop() {
  const [players, loading] = useDynamicPlayers(samples);
  return (
    <div className="preset">
      {!loading &&
        players.map((player, i) => (
          <div className="presetTrack">
            <h5>{`pianoLoop${i}`}</h5>
            <div className="presetTrack__seq">
              <SeqTrackLoop
                loopLength={"1/2m"}
                player={player}
                soundLocation={i}
                presetId={0}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default PianoLoop;
