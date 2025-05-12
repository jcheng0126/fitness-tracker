import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const weeklyPlan = {
  Monday: ["Jumping Jacks", "Push-ups", "Plank"],
  Tuesday: ["High Knees", "Leg Raises", "Russian Twists"],
  Wednesday: ["Burpees", "Bodyweight Squats", "Yoga"],
  Thursday: ["Mountain Climbers", "Bicycle Crunches", "Lunges"],
  Friday: ["Push-ups", "Plank", "Yoga"],
  Saturday: ["Free Choice", "Stretching"],
  Sunday: ["Rest or Yoga"]
};

const Timer = ({ seconds, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return <div className="text-xl">Timer: {timeLeft}s</div>;
};

export default function App() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const exercises = weeklyPlan[today] || [];
  const [completed, setCompleted] = useState([]);
  const [inProgress, setInProgress] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleStart = (exercise) => {
    setInProgress(exercise);
  };

  const handleComplete = (exercise) => {
    setCompleted((prev) => [...prev, exercise]);
    setInProgress(null);
  };

  useEffect(() => {
    setProgress(Math.floor((completed.length / exercises.length) * 100));
  }, [completed]);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Daily Workout Tracker
      </motion.h1>

      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-xl font-semibold">Today's Workout ({today})</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: \`\${progress}%\` }}
          ></div>
        </div>
        {exercises.map((exercise) => (
          <div
            key={exercise}
            className="flex items-center justify-between border-b pb-2"
          >
            <span>{exercise}</span>
            {completed.includes(exercise) ? (
              <span className="text-green-600">Done</span>
            ) : inProgress === exercise ? (
              <Timer seconds={30} onComplete={() => handleComplete(exercise)} />
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => handleStart(exercise)}
              >
                Start
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h2 className="text-xl font-semibold">Nutrition Tips</h2>
        <ul className="list-disc list-inside text-sm">
          <li>Drink plenty of water (6-8 glasses/day)</li>
          <li>Eat fruits, vegetables, and whole grains</li>
          <li>Avoid too much sugar or junk food</li>
          <li>Protein helps muscle recovery (e.g., eggs, yogurt, beans)</li>
        </ul>
      </div>
    </div>
  );
}
