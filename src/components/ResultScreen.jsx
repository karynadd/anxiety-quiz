import { RETRY_BUTTON_TEXT } from "../data/config";
import { resultAssets } from "../data/assets";
import "./ResultScreen.css";

function ResultScreen({ result, resultKey, onRetry }) {
  const background = resultAssets[resultKey]?.background;

  return (
    <div
      className="screen-bg result-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="result-screen__content">
        <h1 className="result-screen__title">{result.title}</h1>
        <h2 className="result-screen__headline">{result.headline1}</h2>
        {result.body.map((paragraph) => (
          <p key={paragraph} className="result-screen__paragraph">
            {paragraph}
          </p>
        ))}
        <h2 className="result-screen__headline">{result.headline2}</h2>
        <p className="result-screen__closing">{result.closing}</p>
      </div>

      <button type="button" className="result-screen__retry" onClick={onRetry}>
        {RETRY_BUTTON_TEXT}
      </button>
    </div>
  );
}

export default ResultScreen;
