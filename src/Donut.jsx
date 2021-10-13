import React, { useState, useEffect, useReducer } from "react";
import * as Tone from "tone";
import useLoadPlayers from "./hooks/useLoadPlayers";
import useKeyPress from "./hooks/useKeyPress";
import SequencerCell from "./SequencerCell";
import { timeStampArray } from "./helpers";
import { initialState, sequencerReducer } from "./reducers/sequencerReducer";

function Donut() {
  const [players, loading] = useLoadPlayers();
  const [targetPlayer, setTargetPlayer] = useState(0);
  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = useKeyPress("a");
  const [currentBeat, setCurrentBeat] = useState("0:0:0");
  const [displayTime, setDisplayTime] = useState("0:0:0");
  const [bpm, setBpm] = useState(80);
  const [soundTarget, setSoundTarget] = useState(0);

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
    Tone.Transport.swing = 0.5;
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

  const buildMap = () => {
    return timeStampArray.map((timeStamp, index) => (
      <SequencerCell
        timeStamp={timeStamp}
        displayTime={displayTime}
        dispatch={dispatch}
        soundTarget={soundTarget}
      />
    ));
  };
  return (
    <div>
      <h1>Welcome to the 🍩 Donut 5000</h1>
      <button
        onClick={() => {
          Tone.start();
        }}
      >
        Tone Start
      </button>
      <button
        onClick={() => {
          Tone.Transport.start();
        }}
      >
        play
      </button>
      <button
        onClick={() => {
          Tone.Transport.stop();
        }}
      >
        stop
      </button>
      <div style={{ display: "flex" }}>
        <h3>BPM</h3>
        <h3
          onClick={() => {
            setBpm(bpm - 1);
          }}
        >
          ⬅️
        </h3>
        <h3>{bpm}</h3>
        <h3
          onClick={() => {
            setBpm(bpm + 1);
          }}
        >
          ➡️
        </h3>
      </div>
      <div style={{ display: "flex" }}>
        <h3>Sound Target</h3>
        <h3
          onClick={() => {
            setSoundTarget(soundTarget - 1);
          }}
        >
          ⬅️
        </h3>
        <h3>{soundTarget}</h3>
        <h3
          onClick={() => {
            setSoundTarget(soundTarget + 1);
          }}
        >
          ➡️
        </h3>
      </div>

      <div style={{ display: "flex" }}>{buildMap()}</div>
      <h1>display time:{displayTime}</h1>
      <h1>current beat: {currentBeat}</h1>
    </div>
  );
}

export default Donut;
