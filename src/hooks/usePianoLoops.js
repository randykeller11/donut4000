import { useState, useEffect } from "react";
import * as Tone from "tone";

import pianoLoop1 from "../assets/sounds/pianoLoop1.wav";
import pianoLoop2 from "../assets/sounds/pianoLoop2.wav";
import pianoLoop3 from "../assets/sounds/pianoLoop3.wav";
import pianoLoop4 from "../assets/sounds/pianoLoop4.wav";

const samples = [pianoLoop1, pianoLoop2, pianoLoop3, pianoLoop4];

const useLoadPlayers = () => {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(true);

  //load the player and audio buffers

  useEffect(() => {
    const loadToneBuffers = async () => {
      const playerArray = [];
      samples.forEach((element) => {
        playerArray.push({
          bpm: 90,
          player: new Tone.Player({ url: element }).toDestination(),
        });
      });

      await Tone.loaded();
      setPlayers(playerArray);
      setLoading(false);
    };
    loadToneBuffers();
  }, []);

  //once players are loaded set originial transport schedule and set up event listeners

  //render the sequencer

  return [players, loading];
};

export default useLoadPlayers;
