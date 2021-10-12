import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import snare from "./assets/sounds/snare.wav";
import useKeyPress from "./useKeyPress";

function Test() {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentBeat, setCurrentBeat] = useState("0:0:0");
  const [soundTargets, setSoundTargets] = useState([]);

  const quantizeTransportPosition = (transportValue) => {
    const position = transportValue.split(":");
    const lastDigit = position[2].split(".");
    const quantizedPosition = [position[0], position[1], lastDigit[0]].join(
      ":"
    );
    return quantizedPosition;
  };

  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = useKeyPress("a");

  useEffect(() => {
    const loadSound = async () => {
      const player = new Tone.Player({
        url: snare,
      }).toDestination();

      await Tone.loaded();
      setSound(player);
      setSoundLoaded(true);
    };
    loadSound();
    Tone.Transport.scheduleRepeat((time) => {
      setCurrentBeat(quantizeTransportPosition(Tone.Transport.position));
    }, "16n");
    Tone.Transport.setLoopPoints(0, "8m");
    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 80;
  }, []);

  useEffect(() => {
    if (keyPressedDown) {
      console.log("I clicked during", currentBeat);
      setSoundTargets([...soundTargets, currentBeat]);
    }
  }, [keyPressedDown]);

  useEffect(() => {
    soundTargets.forEach((target) => {
      if (target === currentBeat) {
        sound.start();
      }
    });
  }, [currentBeat]);

  return (
    <div>
      {soundLoaded ? (
        <div>
          <button
            onClick={() => {
              Tone.start();
            }}
          >
            start
          </button>
          <button
            onClick={() => {
              Tone.Transport.start("+0.5");
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
          <h1>{currentBeat}</h1>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
}

export default Test;
