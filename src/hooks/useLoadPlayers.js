import { useState, useEffect } from "react";
import * as Tone from "tone";

import snare from "../assets/sounds/snare.wav";
import snare2 from "../assets/sounds/snare2.wav";
import snare3 from "../assets/sounds/snare3.wav";
import snare4 from "../assets/sounds/snare4.wav";

import kick from "../assets/sounds/kick.wav";
import kick2 from "../assets/sounds/kick2.wav";
import kick3 from "../assets/sounds/kick3.wav";
import kick4 from "../assets/sounds/kick4.wav";

import hit from "../assets/sounds/hit.wav";
import hit2 from "../assets/sounds/hit2.wav";
import hit3 from "../assets/sounds/hit3.wav";
import hit4 from "../assets/sounds/hit4.wav";

import perc from "../assets/sounds/perc.wav";
import perc2 from "../assets/sounds/perc2.wav";
import perc3 from "../assets/sounds/perc3.wav";
import perc4 from "../assets/sounds/perc4.wav";

const samples = [
  snare,
  snare2,
  snare3,
  snare4,
  hit,
  hit2,
  hit3,
  hit4,
  perc,
  perc2,
  perc3,
  perc4,
  kick,
  kick2,
  kick3,
  kick4,
];

const useLoadPlayers = () => {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(true);

  //load the player and audio buffers

  useEffect(() => {
    const loadToneBuffers = async () => {
      const playerArray = [];
      samples.forEach((element) => {
        playerArray.push(new Tone.Player({ url: element }).toDestination());
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
