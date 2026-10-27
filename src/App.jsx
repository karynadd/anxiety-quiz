import { useEffect, useState } from "react";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import { content, DEFAULT_LANG } from "./data/content";
import { calculateResult } from "./utils/calculateResult";
import { preloadFonts, preloadImages } from "./utils/preloadAssets";

const TOTAL_QUESTIONS = content[DEFAULT_LANG].questions.length;
const LANG_STORAGE_KEY = "anxiety-quiz-lang";

function loadLang() {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return Object.hasOwn(content, saved) ? saved : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function App() {
  const [screen, setScreen] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultKey, setResultKey] = useState(null);
  const [lang, setLang] = useState(loadLang);
  const { config, questions, results } = content[lang];

  useEffect(() => {
    preloadFonts();
    preloadImages();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, currentIndex]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // 저장이 막힌 환경(시크릿 모드 등)에서는 이번 방문 동안만 유지된다.
    }
  }, [lang]);

  function handleToggleLang() {
    setLang((prev) => (prev === "en" ? "ko" : "en"));
  }

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
          text={config}
          onToggleLang={handleToggleLang}
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
          text={config}
          onToggleLang={handleToggleLang}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <StartScreen
        onStart={handleStart}
        text={config}
        onToggleLang={handleToggleLang}
      />
    </div>
  );
}

export default App;
