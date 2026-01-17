import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const nav = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/welcome.mp3");
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
    <div className="flex flex-col justify-center h-screen bg-blue-50 text-gray-900 px-6 font-inter">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Welcome to Nostos
        </h1>

        <p className="text-lg md:text-xl mb-10 leading-relaxed">
          I am Botler! Please use this Screen to Order your Meal.
        </p>

        <button
          onClick={handleStart}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
