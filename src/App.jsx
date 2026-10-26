// TEMP: 4단계에서 실제 로직으로 교체
import { useMemo } from "react";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import { questions } from "./data/questions";
import { results } from "./data/results";

function readParams() {
  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen") || "start";
  const q = Number(params.get("q")) || 1;
  const key = (params.get("key") || "A").toUpperCase();
  return { screen, q, key };
}

function App() {
  const { screen, q, key } = useMemo(readParams, []);

  let content;

  if (screen === "question") {
    const question = questions.find((item) => item.id === q) ?? questions[0];
    content = (
      <QuestionScreen
        question={question}
        currentIndex={question.id}
        total={questions.length}
        onSelect={(selectedKey) =>
          console.log(`TEMP: selected ${selectedKey} for Q${question.id}`)
        }
      />
    );
  } else if (screen === "result") {
    const result = results[key] ?? results.A;
    content = (
      <ResultScreen
        result={result}
        resultKey={result.key}
        onRetry={() => console.log("TEMP: retry clicked")}
      />
    );
  } else {
    content = (
      <StartScreen onStart={() => console.log("TEMP: start clicked")} />
    );
  }

  return <div className="app">{content}</div>;
}

export default App;
