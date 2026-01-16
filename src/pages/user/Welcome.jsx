import { useNavigate } from "react-router-dom";
import { useTTS } from "../../hooks/useTTS";

function WelcomePage() {
  const nav = useNavigate();
  const { ready, speakAsync } = useTTS({ lang: "en-GB", rate: 1.0 });

  const handleStart = async () => {
    try {
      if (ready) {
        await speakAsync(
          "Welcome to Nostos. I am Botler. Please use this touchscreen to order your meal."
        );
      }
    } catch (err) {
      console.warn("TTS failed:", err);
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
