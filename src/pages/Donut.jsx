import React, { useState, useEffect, useReducer } from "react";
import * as Tone from "tone";
import useLoadPlayers from "../hooks/useLoadPlayers";
import useKeyPress from "../hooks/useKeyPress";
import SeqTransport from "../components/SeqTransport";
import "./Donut.css";
import usePianoLoops from "../hooks/usePianoLoops";
import PianoLoop from "../presets/bank1/PianoLoop";
import { initSeqMapState, seqMapReducer } from "../reducers/seqMapReducer";

import { seqRecReducer } from "../reducers/seqRecReducer";

export const seqContext = React.createContext();

function Donut() {
  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = useKeyPress(" ");
  const [currentBeat, setCurrentBeat] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [bpm, setBpm] = useState(90);
  const [pianoLoops, pianoLoopsLoading] = usePianoLoops();

  const [seqRecState, seqRecDispatch] = useReducer(seqRecReducer, []);

  const [seqMapState, seqMapDispatch] = useReducer(
    seqMapReducer,
    initSeqMapState
  );

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
    seqRecState.forEach((recording) => {
      if (recording.timeStamp === currentBeat) {
        seqMapDispatch({
          type: "activate",
          payload: {
            presetId: recording.presetId,
            soundLocation: recording.soundLocation,
          },
        });
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

  useEffect(() => {
    if (pianoLoops) {
      pianoLoops.forEach((loop) => {
        loop.player.playbackRate = Number(
          (Tone.Transport.bpm.value / loop.bpm).toFixed(2)
        );
      });
    }
  }, [Tone.Transport.bpm.value]);

  return (
    <div>
      <h1>Welcome to the 🍩 Donut 5000</h1>
      <SeqTransport bpm={bpm} setBpm={setBpm} />
      <div className="sequencer">
        <seqContext.Provider
          value={{
            bpm,
            displayTime,
            currentBeat,
            seqMapState,
            seqMapDispatch,
            seqRecDispatch,
          }}
        >
          <PianoLoop currentBeat={currentBeat} />
          <PianoLoop currentBeat={currentBeat} />
        </seqContext.Provider>
      </div>

      <h1>display time:{displayTime}</h1>
      <h1>current beat: {currentBeat}</h1>
    </div>
  );
}

export default Donut;
