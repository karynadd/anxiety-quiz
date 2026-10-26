import { useEffect, useState } from "react";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import { questions } from "./data/questions";
import { results } from "./data/results";
import { calculateResult } from "./utils/calculateResult";
import { preloadFonts, preloadImages } from "./utils/preloadAssets";

const TOTAL_QUESTIONS = questions.length;

function App() {
  const [screen, setScreen] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultKey, setResultKey] = useState(null);

  useEffect(() => {
    preloadFonts();
    preloadImages();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, currentIndex]);

  function handleStart() {
    setAnswers([]);
    setCurrentIndex(0);
    setScreen("question");
  }

  function handleSelect(key) {
    const nextAnswers = [...answers, key];
    setAnswers(nextAnswers);

    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setResultKey(calculateResult(nextAnswers));
      setScreen("result");
    }
  }

  function handleRetry() {
    setAnswers([]);
    setCurrentIndex(0);
    setResultKey(null);
    setScreen("start");
  }

  if (screen === "question") {
    const question = questions[currentIndex];
    return (
      <div className="app">
        <QuestionScreen
          key={currentIndex}
          question={question}
          currentIndex={currentIndex}
          total={TOTAL_QUESTIONS}
          onSelect={handleSelect}
        />
      </div>
    );
  }

  if (screen === "result") {
    const result = results[resultKey];
    return (
      <div className="app">
        <ResultScreen
          result={result}
          resultKey={resultKey}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <StartScreen onStart={handleStart} />
    </div>
  );
}

export default App;
