import { useState, useEffect } from "react";
import * as Tone from "tone";

function useDynamicPlayers(samples) {
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
}

export default useDynamicPlayers;
