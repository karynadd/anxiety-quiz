import {
  RETRY_BUTTON_TEXT,
  RESULT_PRETITLE,
  RESULT_TOP_LABEL,
} from "../data/config";
import { resultAssets } from "../data/assets";
import "./ResultScreen.css";

function ResultScreen({ result, resultKey, onRetry }) {
  const background = resultAssets[resultKey]?.background;

  return (
    <div
      className="screen-bg result-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <p className="result-screen__top-label">{RESULT_TOP_LABEL}</p>
      <p className="result-screen__pretitle">{RESULT_PRETITLE}</p>
      <h1 className="result-screen__title">{result.title}</h1>

      <div className="result-screen__cards">
        <div className="result-screen__card">
          <h2 className="result-screen__headline">{result.headline1}</h2>
          <p className="result-screen__paragraph">{result.body.join(" ")}</p>
        </div>

        <div className="result-screen__card">
          <h2 className="result-screen__headline">{result.headline2}</h2>
          <p className="result-screen__paragraph">{result.closing}</p>
        </div>
      </div>

      <button type="button" className="result-screen__retry" onClick={onRetry}>
        {RETRY_BUTTON_TEXT}
      </button>
    </div>
  );
}

export default ResultScreen;
