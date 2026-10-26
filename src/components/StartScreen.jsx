import {
  APP_TITLE,
  APP_SUBTITLE,
  START_BUTTON_TEXT,
  START_FOOTER_LINES,
} from "../data/config";
import { introAssets } from "../data/assets";
import "./StartScreen.css";

function StartScreen({ onStart }) {
  return (
    <div
      className="screen-bg start-screen"
      style={{ backgroundImage: `url(${introAssets.background})` }}
    >
      <div className="start-screen__center">
        <h1 className="start-screen__title">{APP_TITLE}</h1>
        <p className="start-screen__subtitle">{APP_SUBTITLE}</p>
        <button
          type="button"
          className="start-screen__button"
          onClick={onStart}
        >
          {START_BUTTON_TEXT}
        </button>
      </div>

      <p className="start-footer">
        {START_FOOTER_LINES.map((line, i) => (
          <span key={i}>
            {line}
            {i < START_FOOTER_LINES.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
}

export default StartScreen;
