import React from "react";
import * as Tone from "tone";

function SequencerTransport({ bpm, setBpm }) {
  return (
    <div>
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
          Tone.Transport.pause();
        }}
      >
        pause
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
    </div>
  );
}

export default SequencerTransport;
