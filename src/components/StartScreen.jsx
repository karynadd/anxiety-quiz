import { Fragment } from "react";
import LanguageToggle from "./LanguageToggle";
import { introAssets } from "../data/assets";
import "./StartScreen.css";

function StartScreen({ onStart, text, onToggleLang }) {
  const {
    APP_TITLE,
    APP_SUBTITLE,
    START_BUTTON_TEXT,
    START_FOOTER_LINES,
  } = text;

  return (
    <div
      className="screen-bg start-screen"
      style={{ backgroundImage: `url(${introAssets.background})` }}
    >
      <LanguageToggle
        className="lang-toggle--corner"
        label={text.LANG_TOGGLE_TEXT}
        ariaLabel={text.LANG_TOGGLE_ARIA}
        onToggle={onToggleLang}
      />

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
          <Fragment key={i}>
            {line}
            {i < START_FOOTER_LINES.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    </div>
  );
}

export default StartScreen;
