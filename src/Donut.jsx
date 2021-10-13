import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import useLoadPlayers from "./hooks/useLoadPlayers";
import useKeyPress from "./hooks/useKeyPress";
import SequencerCell from "./SequencerCell";
import { timeStampArray } from "./helpers";

function Donut() {
  const [players, loading] = useLoadPlayers();
  const [targetPlayer, setTargetPlayer] = useState(0);
  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = useKeyPress("a");
  const [currentBeat, setCurrentBeat] = useState("0:0:0");
  const [displayTime, setDisplayTime] = useState("0:0:0");

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
  }, []);

  const buildMap = () => {
    return timeStampArray.map((timeStamp, index) => (
      <SequencerCell timeStamp={timeStamp} displayTime={displayTime} />
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
      <div style={{ display: "flex" }}>{buildMap()}</div>
      <h1>display time:{displayTime}</h1>
      <h1>current beat: {currentBeat}</h1>
    </div>
  );
}

export default Donut;
