import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const nav = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/abc.mp3");
    audioRef.current.preload = "auto";
  }, []);

  const handleStart = async () => {
    try {
      const audio = audioRef.current;
      if (!audio) throw new Error("Audio not initialized");

      audio.currentTime = 0;
      await audio.play();

      await new Promise((resolve) => {
        audio.onended = resolve;
        audio.onerror = resolve;
      });
    } catch (err) {
      console.warn("Audio play failed:", err);
    }

    nav("/menu");
  };

  return (
    <button onClick={handleStart}>Start</button>
  );
}

export default WelcomePage;
