import React, { useState, useEffect, useReducer } from "react";
import * as Tone from "tone";
import useLoadPlayers from "./hooks/useLoadPlayers";
import useKeyPress from "./hooks/useKeyPress";
import SequencerTrack from "./SequencerTrack";
import SequencerTransport from "./SequencerTransport";
import { sequencerMap } from "./helpers";
import "./Donut.css";

import { initialState, sequencerReducer } from "./reducers/sequencerReducer";

function Donut() {
  const [players, loading] = useLoadPlayers();
  const [targetPlayer, setTargetPlayer] = useState(0);
  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = useKeyPress(" ");
  const [currentBeat, setCurrentBeat] = useState("0:0:0");
  const [displayTime, setDisplayTime] = useState("0:0:0");
  const [bpm, setBpm] = useState(80);

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
    Tone.Transport.bpm.value = 80;
    Tone.Transport.swing = 0.3;
    Tone.Transport.swingSubdivision = "16n";
  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    sequencerState.forEach((recording) => {
      if (recording.timeStamp === currentBeat) {
        players[recording.soundTarget].start();
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

  return (
    <div>
      <h1>Welcome to the 🍩 Donut 5000</h1>
      <SequencerTransport bpm={bpm} setBpm={setBpm} />
      <div className="sequencer">
        {sequencerMap.map((name, index) => (
          <SequencerTrack
            displayTime={displayTime}
            dispatch={dispatch}
            soundTarget={index}
            name={name}
          />
        ))}
      </div>

      <h1>display time:{displayTime}</h1>
      <h1>current beat: {currentBeat}</h1>
    </div>
  );
}

export default Donut;
