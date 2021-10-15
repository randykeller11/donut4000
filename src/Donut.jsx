import React, { useState, useEffect, useReducer } from "react";
import * as Tone from "tone";
import useLoadPlayers from "./hooks/useLoadPlayers";
import useKeyPress from "./hooks/useKeyPress";
import SequencerTrackOneShot from "./SequencerTrackOneShot";
import SequencerTransport from "./SequencerTransport";
import { sequencerMap } from "./helpers";
import "./Donut.css";
import useDynamicPlayers from "./hooks/useDynamicPlayers";
import SequencerTrackLoop from "./SequencerTrackLoop";

import { initialState, sequencerReducer } from "./reducers/sequencerReducer";

function Donut() {
  const [players, loading] = useLoadPlayers();
  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = useKeyPress(" ");
  const [currentBeat, setCurrentBeat] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [bpm, setBpm] = useState(90);
  const [dynamicPlayer, dynamicPlayerLoading] = useDynamicPlayers();

  const [sequencerState, dispatch] = useReducer(sequencerReducer, initialState);

  const quantizeTransportPosition = (transportValue) => {
    const position = transportValue.split(":");
    const lastDigit = position[2].split(".");
    const quantizedPosition = [position[0], position[1], lastDigit[0]].join(
      ":"
    );
    return quantizedPosition;
  };

  useEffect(() => {
    Tone.Transport.scheduleRepeat((time) => {
      setCurrentBeat(quantizeTransportPosition(Tone.Transport.position));
      Tone.Draw.schedule(() => {
        //do drawing or DOM manipulation here
        setDisplayTime(quantizeTransportPosition(Tone.Transport.position));
      }, time);
    }, "16n");

    Tone.Transport.setLoopPoints(0, "4m");
    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 90;
    Tone.Transport.swing = 0.3;
    Tone.Transport.swingSubdivision = "16n";
  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    sequencerState.forEach((recording) => {
      if (recording.timeStamp === currentBeat) {
        if (recording.type === "oneShot") {
          players[recording.soundTarget].start();
        } else if (recording.type === "loop") {
          dynamicPlayer.start();
        }
      }
    });
  }, [currentBeat]);

  useEffect(() => {
    if (keyPressedDown) {
      if (Tone.Transport.state === "started") {
        Tone.Transport.stop();
      } else {
        Tone.Transport.start();
      }
    }
  }, [keyPressedDown]);

  useEffect(() => {
    if (Tone.Transport.state != "started") {
      setCurrentBeat(null);
      setDisplayTime(null);
    }
  }, [Tone.Transport.state]);

  return (
    <div>
      <h1>Welcome to the 🍩 Donut 5000</h1>
      <SequencerTransport bpm={bpm} setBpm={setBpm} />
      <div className="sequencer">
        {sequencerMap.map((name, index) => (
          <SequencerTrackOneShot
            displayTime={displayTime}
            dispatch={dispatch}
            soundTarget={index}
            name={name}
          />
        ))}
        {!dynamicPlayerLoading && (
          <SequencerTrackLoop
            dispatch={dispatch}
            soundTarget={0}
            displayTime={displayTime}
            loopLength={"1m"}
          />
        )}
      </div>

      <h1>display time:{displayTime}</h1>
      <h1>current beat: {currentBeat}</h1>
    </div>
  );
}

export default Donut;
