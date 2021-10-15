import { useState, useEffect } from "react";
import * as Tone from "tone";
import pianoLoop from "../assets/sounds/pianoLoop.wav";

function useDynamicPlayers() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const importSound = () => {
      try {
        setPlayer(new Tone.Player({ url: pianoLoop }).toDestination());
      } catch (error) {
        console.log(error);
      }
    };
    importSound();
    const checkLoading = async () => {
      await Tone.loaded();
      setLoading(false);
    };
    checkLoading();
  }, []);
  return [player, loading];
}

export default useDynamicPlayers;
